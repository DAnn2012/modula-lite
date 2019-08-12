<?php
// Exit if accessed directly.
if (!defined('ABSPATH')) {
    exit;
}

class Modula_Widget extends WP_Widget {

    /**
     * Modula_Widget constructor.
     */
    function __construct() {
        parent::__construct(

        // Base ID of widget
            'modula_gallery_widget',

            // Widget name
            __('Modula Gallery', 'modula-best-grid-gallery'),

            // Widget description
            array('description' => __('Modula Gallery Widget.', 'modula-best-grid-gallery'),)
        );
    }

    /**
     * @param array $args
     * @param array $instance
     *
     * Widget Front End
     */
    public function widget($args, $instance) {
        $title = apply_filters('widget_title', $instance['title']);
        // before and after widget arguments are defined by themes
        echo $args['before_widget'];
        if (!empty($title))
            echo $args['before_title'] . $title . $args['after_title'];
        // This is where you run the code and display the output
        echo do_shortcode('[modula id="' . $instance['modula_widget_gallery_select'] . '"]');
        echo $args['after_widget'];
    }

    /**
     * @param array $instance
     * @return string|void
     *
     * Widget options
     */
    public function form($instance) {

        // get Modula Galleries
        $galleries = Modula_Helper::get_galleries();

        if (isset($instance['title'])) {
            $title = $instance['title'];
        } else {
            $title = __('Widget Title', 'wpb_widget_domain');
        }

        // Widget admin form
        ?>
        <p xmlns="http://www.w3.org/1999/html">
            <!-- Widget Title -->
            <label for="<?php echo esc_attr($this->get_field_id('title')); ?>"><?php _e('Title:'); ?></label>
            <input class="widefat" id="<?php echo esc_attr($this->get_field_id('title')); ?>"
                   name="<?php echo esc_attr($this->get_field_name('title')); ?>" type="text"
                   value="<?php echo esc_attr($title); ?>"/>

            <!-- Modula Gallery select option -->
            <label for="<?php echo esc_attr($this->get_field_id('modula_widget_gallery_select')); ?>"><?php esc_html_e('Select a Modula Gallery:', 'modula-best-grid-gallery'); ?></label>
            <select class="widefat" id="modula_widget_gallery_select"
                    name="<?php echo esc_attr($this->get_field_name('modula_widget_gallery_select')); ?>">
                <?php
                foreach ($galleries as $gallery_id => $gallery_title) {
                    echo '<option value="' . esc_attr($gallery_id) . '" ' . selected($gallery_id, $instance['modula_widget_gallery_select'], true) . ' >' . esc_html($gallery_title) . '</option>';
                }
                ?>
            </select>
        </p>
        <?php
    }

    /**
     * @param array $new_instance
     * @param array $old_instance
     * @return array
     *
     * Widget Update
     */
    public function update($new_instance, $old_instance) {

        $instance                                 = array();
        $instance['title']                        = (!empty($new_instance['title'])) ? strip_tags($new_instance['title']) : '';
        $instance['modula_widget_gallery_select'] = (!empty($new_instance['modula_widget_gallery_select'])) ? strip_tags($new_instance['modula_widget_gallery_select']) : '';

        return $instance;
    }
}

