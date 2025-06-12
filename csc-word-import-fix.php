<?php
/**
 * Plugin Name: CSC Word Import Fix
 * Description: Adds a toolbar button to correct the converted HTML for Gutenberg blocks.
 * Version: 1.0
 */

add_action('enqueue_block_editor_assets', function () {
    wp_enqueue_script(
        'csc-word-import-fix',
        plugin_dir_url(__FILE__) . 'js/csc-word-import-fix.js',
        ['wp-blocks', 'wp-element', 'wp-editor', 'wp-data', 'wp-plugins', 'wp-edit-post'],
        null,
        true
    );
});
