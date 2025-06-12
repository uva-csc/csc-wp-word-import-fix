const { createElement } = wp.element;
const { PluginToolbarButton } = wp.editPost;
const { registerPlugin } = wp.plugins;
const { select, dispatch } = wp.data;
const { parse } = wp.blocks;

const FixBlockHtmlButton = () => {
    const fixBlockHtml = () => {
        const rawHTML = select('core/editor').getEditedPostContent();
        console.log("Raw html is: \n", rawHTML);
        const newBlocks = rawHTML; // parse(rawHTML); // Converts HTML to Gutenberg blocks
        dispatch('core/block-editor').resetBlocks(newBlocks); // Replace existing blocks
    };

    return createElement(
        PluginToolbarButton,
        {
            icon: 'editor-code',
            label: 'Convert HTML to Blocks',
            onClick: fixBlockHtml
        }
    );
};
console.log(wp.editPost);
if (wp.editPost && wp.editPost.PluginToolbarButton) {
    console.log('PluginToolbarButton is:', PluginToolbarButton);
    registerPlugin('csc-word-import-fix-plugin', {
        render: FixBlockHtmlButton,
        icon: 'editor-code'
    });
}
