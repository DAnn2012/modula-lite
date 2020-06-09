<?php
$issues = array(
    'fix'     => array(
        esc_html__( 'Importing Envira Galleries image size, custom dimensions and gutter.', 'modula-best-grid-gallery' ),
        esc_html__( 'Extensions menu entry always last.', 'modula-best-grid-gallery' ),
        esc_html__( 'Social icons are now disabled by default when creating a new gallery.', 'modula-best-grid-gallery' ),
    ),
    'feature' => array(
	    esc_html__( 'Added autosuggest URL to image URL field.', 'modula-best-grid-gallery' ),
	    esc_html__( 'Added share via Email.', 'modula-best-grid-gallery' ),
	    esc_html__( 'Added "Save gallery"/"Update gallery" shortcut CTRL/CMD + S', 'modula-best-grid-gallery' ),
    )
);
?>
<div id="modula-about-page" class="row modula-about-row">
    <div class="modula-about__container">
        <div class="modula-about-header">
            <div class="modula-about-heading">
                <h1><?php esc_html_e( 'Modula', 'modula-best-grid-gallery' ) ?> <span><?php echo MODULA_LITE_VERSION; ?></span></h1>
            </div>
            <div class="modula-about__header-text">
                <p><?php esc_html_e('Modula is the most powerful, user-friendly WordPress gallery plugin. Add galleries, masonry grids and more in a few clicks.','modula-best-grid-gallery'); ?></p>
            </div>
        </div>
        <div class="modula-about-content">
            <?php if (!empty($issues)) { ?>

                <h2><?php printf(esc_html__('Version %s addressed %s bugs and implemented %s features.', 'modula-best-grid-gallery'), MODULA_LITE_VERSION, count( $issues['fix']) ,count($issues['feature'])); ?></h2>
                <ul class="modula-about-list">
                    <?php
                    foreach ($issues as $key => $iss) {
                        foreach ($iss as $is) {
                            echo "<li class='$key'>$is</li>";
                        }
                    }
                    ?>
                </ul>

            <?php } ?>
        </div>
    </div>
</div>
