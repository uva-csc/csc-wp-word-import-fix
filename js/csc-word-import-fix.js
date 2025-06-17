
const { select, subscribe, dispatch } = wp.data;

function updateNoteBlocks(blocks) {
    blocks.forEach((block) => {
        // List items
        if (block.name === 'core/list-item') {
            const oldcontent = block.attributes.content.toString();
            if (oldcontent) {
                let newContent = oldcontent.replace(/<br>|<\/?p>/g, '').replace(/\s{2,}/, ' ');
                const match = newContent.match(/href="#(post-\d+-endnote-ref-\d+)"/);
                if(match) {
                    newContent = '<span id="' + match[1].replace('-ref-', '-') + '">' + newContent + '</span>';
                }
                dispatch('core/editor').updateBlockAttributes(block.clientId, {
                    content: newContent
                });
            }
        }

        // Recursively handle nested blocks
        if (block.innerBlocks && block.innerBlocks.length > 0) {
            updateNoteBlocks(block.innerBlocks);
        }
    });
}

const doIt = (e) => {
    const iframe = jQuery('.block-editor-iframe__scale-container iframe');
    //console.log(iframe);
    iframe.addClass('greyed-out');
    const unsubscribe = subscribe(() => {
        const blocks = select('core/editor').getBlocks();
        if (blocks) {
            unsubscribe();
            if (blocks.length === 1 && blocks[0]?.name === 'core/freeform') {
                dispatch('core/notices').createNotice(
                    'warning', // One of: 'info', 'success', 'warning', 'error'
                    'The current post has not been converted to blocks. Please press "Convert to Blocks" in order to apply the custom Journal fixes',
                    {
                        isDismissible: true,
                        type: 'default', // or 'default'
                    }
                );
            } else {
                updateNoteBlocks(blocks);
            }
        }
        iframe.removeClass('greyed-out');
    });
}

setTimeout(() => {
    // Add fix it icon
    const settingsdiv = jQuery('.editor-header__settings');
    settingsdiv.prepend('<button type="button" aria-pressed="false" ' +
        'class="components-button is-compact has-icon" onclick="doIt()">' +
        '<img src="/wp-content/plugins/csc-word-import-fix/wrench.svg" title="Fix it" alt="Wrench icon" />' +
        '</button>');
}, 1000);
