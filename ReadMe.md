# CSC Word to WP Import Fix

A WP plugin to fix the code for a Word docx imported into WP, especially endnote links.

## Description

When one uses Mammoth .docx converter, it creates classic html in the WP editor. After this is converted to
Gutenburg blocks, the ID attributes for the endnotes are not there and there is too much space. This plugin adds 
a Clean up button to the editor to fix this and other markup irregularities.

## Features

- Fixes missing IDs on endnotes
- Removes empty <p> elements and extraneous <br>s.

## Installation

1. Upload the plugin files to the `/wp-content/plugins/csc-word-import-fix` directory, or install the plugin through the WordPress admin panel.
2. Activate the plugin through the ‘Plugins’ screen in WordPress.

## Usage

To use this module:

1. Create a new Article
2. Use the UI at the bottom of the screen to upload and import a Word .docx file
3. Click on the article body. It will show an option to Convert to Block. Click that button.
4. Then click the "Clean up" button
