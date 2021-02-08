<?php

function modula_generate_image_links( $item_data, $item, $settings ){

	if( ! apply_filters( 'modula_resize_images', true, $settings ) ){
		return $item_data;
	}

	$gallery_type      = isset( $settings['type'] ) ? $settings['type'] : 'creative-gallery';
	$allowed_galleries = array( 'creative-gallery', 'custom-grid', 'grid' );

	if ( !in_array( $gallery_type, $allowed_galleries ) ){
		return $item_data;
	}

	// If the image is not resized we will try to resized it now
	// This is safe to call every time, as resize_image() will check if the image already exists, preventing thumbnails from being generated every single time.
	$resizer = new Modula_Image();

	if ( 'custom' == $settings['grid_image_size'] ){
		$grid_sizes = array(
				'width'  => $settings['grid_image_dimensions']['width'],
				'height' => $settings['grid_image_dimensions']['height']
		);
	} else {
		$grid_sizes = $settings['grid_image_size'];
	}

	$sizes = $resizer->get_image_size( $item['id'], $gallery_type, $grid_sizes, $settings );

	$crop                                  = false;

	if ( 'custom' == $settings['grid_image_size'] ){
		$crop = boolval( boolval( $settings['grid_image_crop'] ) );
	}

	$resized    = $resizer->resize_image( $sizes['url'], $sizes['width'], $sizes['height'], $crop );
	$image_info = false;
	// Let's check if resize gives us both URL and image info
	// Also, if resized_url is available, image_info should be available
	if ( isset( $resized['resized_url'] ) ){
		$image_url  = $resized['resized_url'];
		$image_info = $resized['image_info'];
	} else {
		$image_url = $resized;
	}

	// If we couldn't resize the image we will return the full image.
	if ( is_wp_error( $image_url ) ){
		$image_url = $sizes['url'];
	}

	$item_data['img_attributes']['width']  = $sizes['width'];
	$item_data['img_attributes']['height'] = $sizes['height'];
	$item_data['image_full']               = $sizes['url'];
	$item_data['image_url']                = ( isset( $sizes['thumb_url'] ) ) ? $sizes['thumb_url'] : $image_url;
	// If thumb_url exists it means we are in predefined sizes
	$item_data['img_attributes']['src']      = ( isset( $sizes['thumb_url'] ) ) ? $sizes['thumb_url'] : $image_url;
	$item_data['img_attributes']['data-src'] = ( isset( $sizes['thumb_url'] ) ) ? $sizes['thumb_url'] : $image_url;
	$item_data['image_info'] = $image_info;

	return $item_data;
}

function modula_check_lightboxes_and_links( $item_data, $item, $settings ) {

	// Create link attributes like : title/rel
	$item_data['link_attributes']['href'] = '#';

	if(class_exists('\Elementor\Plugin')){
		$item_data['link_attributes']['data-elementor-open-lightbox'] = 'no';
	}

	$caption = "";

	if ( isset( $item['description'] ) && '' != $item['description'] ) {

		$caption = $item['description'];
	} else {
		$caption = wp_get_attachment_caption( $item['id'] );
	}

	$item_data['img_attributes']['data-caption'] = $caption;

	if ( '' == $settings['lightbox'] || 'no-link' == $settings['lightbox'] ) {

		return $item_data;
	}

	if ( 'attachment-page' == $settings['lightbox'] ) {

		$item_data['link_attributes']['class'][] = 'modula-simple-link';
		$item_data['item_classes'][] = 'modula-simple-link';

		if ( '' != $item['link'] ) {

			$item_data['link_attributes']['href'] = $item['link'];
			if ( isset( $item['target'] ) && '1' == $item['target'] ) {

				$item_data['link_attributes']['target'] = '_blank';
			}

		} else {

			$item_data['link_attributes']['href'] = get_attachment_link( $item['id'] );
		}

	} else if ( 'direct' == $settings['lightbox'] ) {

		$item_data['link_attributes']['href'] = $item_data['image_full'];
		$item_data['link_attributes']['class'][] = 'modula-simple-link';
		$item_data['item_classes'][] = 'modula-simple-link';

	} else {

		$item_data['link_attributes']['href']          = $item_data['image_full'];
		$item_data['link_attributes']['rel']           = $settings['gallery_id'];
		$item_data['link_attributes']['data-caption']  = $caption;

	}


	return $item_data;
}

function modula_check_hover_effect( $item_data, $item, $settings ){

	$hover_effect_elements = Modula_Helper::hover_effects_elements( $settings['effect'] );

	if ( ! $hover_effect_elements['title'] ) {
		$item_data['hide_title'] = true;
	}

	if ( ! $hover_effect_elements['description'] ) {
		$item_data['hide_description'] = true;
	}

	if ( ! $hover_effect_elements['social'] ) {
		$item_data['hide_socials'] = true;
	}

	if ( 'none' != $settings['effect'] ) {
		$item_data['item_classes'][] = 'effect-' . $settings['effect'];
	}

	return $item_data;
}

function modula_check_custom_grid( $item_data, $item, $settings ) {

    if ( 'custom-grid' != $settings['type'] ) {
		return $item_data;
	}

	$item_data['item_attributes']['data-width'] = $item['width'];
	$item_data['item_attributes']['data-height'] = $item['height'];

	return $item_data;

}

function modula_enable_lazy_load( $item_data, $item, $settings ){

	if ( '1' != $settings[ 'lazy_load' ] && apply_filters( 'modula_lazyload_compatibility_item', true ) ) {
		return $item_data;
	}

	if ( 'grid' == $settings['type'] && 'automatic' == $settings['grid_type'] ) {

		// Fix for lazyload scripts when working with Automatic Grid
		if ( !apply_filters( 'modula_lazyload_compatibility_item', true ) ) {
			$item_data[ 'img_classes' ][] = 'lazyloaded';
		}

		return $item_data;
	}

	if ( isset( $item_data['img_classes'] ) && is_array( $item_data['img_classes'] ) ) {
		$item_data['img_classes'][] = 'lazyload';
	}

	if ( isset( $item_data['img_attributes']['src'] ) && apply_filters( 'modula_lazyload_compatibility_item', true ) ) {
		unset( $item_data['img_attributes']['src'] );
	}

	$item_data['img_attributes']['data-source'] = 'modula';

	return $item_data;
}

function modula_add_align_classes( $template_data ){

	if ( '' != $template_data['settings']['align'] ) {
		$template_data['gallery_container']['class'][] = 'align' . $template_data['settings']['align'];
	}

	return $template_data;
}

function modula_show_schemaorg( $settings ){
	global $wp;

	$current_url = home_url(add_query_arg(array(), $wp->request));

	?>

	<script type="application/ld+json">
	{
		"@context": "http://schema.org",
		"@type"   : "ImageGallery",
		"id"      : "<?php echo esc_url($current_url); ?>",
		"url"     : "<?php echo esc_url($current_url); ?>"
	}

    </script>

	<?php

}

function modula_edit_gallery( $settings ) {

	$troubleshooting_options = get_option( 'modula_troubleshooting_option', array() );
	$troubleshooting_options = wp_parse_args( $troubleshooting_options, array( 'disable_edit' => false ) );

	if ( $troubleshooting_options['disable_edit'] ) {
		return;
	}

	$gallery_id = absint( explode('jtg-', $settings['gallery_id'] )[1] );
	edit_post_link( __('Edit gallery','modula-best-grid-gallery'), '', '', $gallery_id, 'post-edit-link' );
}

function modula_add_gallery_class( $template_data ){

	if ( 'custom-grid' == $template_data['settings']['type'] ) {
		$template_data['gallery_container']['class'][] = 'modula-custom-grid';
	}else if ( 'grid' == $template_data['settings']['type'] ) {
		$template_data['gallery_container']['class'][] = 'modula-columns';
	}
	else if ( 'creative-gallery' == $template_data['settings']['type'] ) {
		$template_data['gallery_container']['class'][] = 'modula-creative-gallery';
	}
	
	return $template_data;

}

function modula_add_scripts( $scripts, $settings ){

	$needed_scripts = array();

	if ( '1' == $settings[ 'lazy_load' ] && apply_filters( 'modula_lazyload_compatibility_script', true, $settings ) ) {
		$needed_scripts[] = 'modula-lazysizes';
	}

	if ( 'grid' == $settings['type'] && 'automatic' == $settings['grid_type'] ) {
		$needed_scripts[] = 'modula-grid-justified-gallery';
	}else{
		$needed_scripts[] = 'modula-isotope';
		$needed_scripts[] = 'modula-isotope-packery';
	}

	if ( 'fancybox' == $settings['lightbox'] ) {
		$needed_scripts[] = 'modula-fancybox';
	}


	return array_merge( $needed_scripts, $scripts );
}

/**Add the powered by text and link
 *
 * @param $settings
 * @moved here since 2.4.2
 */
function powered_by_modula( $settings ) {
	if( !isset($settings['powered_by']) ||  0 == $settings['powered_by'] ) {
		return;
	}

	$affiliate = get_option( 'modula_affiliate', array() );
	$affiliate = wp_parse_args( $affiliate, array( 'link' => 'https://wp-modula.com', 'text' => 'Powered by' ) );

	$html = '<div class="modula-powered">';
	$html .= '<p>' .  esc_html( $affiliate['text'] );
	$html .= '<span>';
	$html .= '<a href=' . esc_url( $affiliate['link'] ) . ' target="_blank" rel="noopener noreferrer"> Modula </a>';
	$html .= '</span>';
	$html .= '</p>';
	$html .= '</div>';

	echo $html;

}
