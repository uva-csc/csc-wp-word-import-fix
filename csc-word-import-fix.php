<?php
/**
 * Plugin Name: CSC Word Import Fix
 * Description: Adds a toolbar button to correct the converted HTML for Gutenberg blocks.
 * Version: 1.0
 */

function csc_word_import_fix_enqueue_editor_script( $hook ) {
    // Run only on post editing screens
    if ( in_array( $hook, [ 'post.php', 'post-new.php' ], true ) ) {
        // Import JS for plugin
        wp_enqueue_script(
            'csc-word-import-fix',
            plugin_dir_url(__FILE__) . 'js/csc-word-import-fix.js',
            ['wp-blocks', 'wp-element', 'wp-editor', 'wp-data', 'wp-plugins', 'wp-edit-post', 'jquery'],
            null,
            true
        );
        // Import CSS for plugin
        wp_enqueue_style(
            'csc-word-import-fix-css',
            plugin_dir_url( __FILE__ ) . 'csc-word-import-fix.css',
            [],
            '1.0'
        );
    }
}
add_action( 'admin_enqueue_scripts', 'csc_word_import_fix_enqueue_editor_script' );
