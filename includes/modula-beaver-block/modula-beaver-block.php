<?php
// Exit if accessed directly.
if (!defined('ABSPATH')) {
    exit;
}

class Modula_Beaver_Block extends FLBuilderModule {

    public function __construct() {
        parent::__construct(array(
            'name'        => __('Modula Block', 'modula-best-grid-gallery'),
            'description' => __('A totally awesome module!', 'modula-best-grid-gallery'),
            'category'    => __('Modula', 'modula-best-grid-gallery'),
            'dir'         => MODULA_PATH . 'includes/modula-beaver-block/',
            'url'         => MODULA_URL . 'includes/modula-beaver-block/',
        ));
    }
}

FLBuilder::register_module('Modula_Beaver_Block', array(
    'modula_gallery' => array(
        'title'    => __('Modula Gallery', 'modula-best-grid-gallery'),
        'sections' => array(
            'modula_gallery_section' => array(
                'title'  => __('Select the Modula Gallery you want', 'modula-best-grid-gallery'),
                'fields' => array(
                    'modula_gallery_select' => array(
                        'type'    => 'select',
                        'label'   => __('Select Modula Gallery', 'modula-best-grid-gallery'),
                        'default' => 'none',
                        'options' => Modula_Helper::get_galleries()
                    )
                )
            )
        )
    )
));

