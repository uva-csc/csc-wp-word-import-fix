
const { select, subscribe, dispatch } = wp.data;

console.log("csc word import fix hhh");

const doIt = (e) => {
    console.log("doing it 4 u!");
    const iframe = jQuery('.block-editor-iframe__scale-container iframe');
    console.log(iframe);
    iframe.addClass('greyed-out');
    let content;
    const unsubscribe = subscribe(() => {
        content = select('core/editor').getEditedPostAttribute('content');
        //console.log("content in subscribe", content);
        if (content) {
            unsubscribe();
            console.log('Updating content');
            content = content.replace('<!-- wp:paragraph -->\n' +
                '<p></p>\n' +
                '<!-- /wp:paragraph -->', '');
            content += '<!-- wp:paragraph --><p>Newly 2 added HTML content</p><!-- /wp:paragraph -->';
            dispatch('core/editor').editPost({
                content: content,
            });
            console.log("removing grey");
            iframe.removeClass('greyed-out');
        }
    });
}

const doItnew = () => {
    console.log("doing it 4 u!");
    const iframe = jQuery('.block-editor-iframe__scale-container iframe');
    iframe.addClass('greyed-out');

    const { select, dispatch, subscribe } = wp.data;

    const unsubscribe = subscribe(() => {
        const isReady = select('core/editor').isSavingPost() === false &&
            select('core/editor').isEditedPostDirty() !== undefined;

        const content = select('core/editor').getEditedPostAttribute('content');

        if (isReady && content !== null) {
            console.log('Editor is ready, updating content');
            unsubscribe();

            let updatedContent = content.replace(
                '<!-- wp:paragraph -->\n<p></p>\n<!-- /wp:paragraph -->',
                ''
            );
            updatedContent += '<!-- wp:paragraph --><p>Added HTML content</p><!-- /wp:paragraph -->';

            dispatch('core/editor').editPost({ content: updatedContent });

            iframe.removeClass('greyed-out');
        }
    });
};


setTimeout(() => {
    const header = document.querySelector('.edit-post-header');
    console.log("got the header again 3", header);
    const settingsdiv = jQuery('.editor-header__settings');
    console.log(settingsdiv);
    settingsdiv.prepend('<button type="button" aria-pressed="false" ' +
        'class="components-button is-compact has-icon" onclick="doIt()">' +
        '<img src="/wp-content/plugins/simple-plugin-test/wrench.svg" title="Fix it" alt="Wrench icon" />' +
        '</button>');
}, 1000);

/*

const unsubscribe = subscribe(() => {
    let content = select('core/editor').getEditedPostAttribute('content');
    if (content) {
        console.log('Post content loaded NEW~:', content);
        unsubscribe(); // Only run once
        setTimeout(() => {
            const header = document.querySelector('.edit-post-header');
            console.log("header", header);
            const settingsdiv = jQuery('.editor-header__settings');
            console.log(settingsdiv);
            settingsdiv.prepend('<button type="button" aria-pressed="false" ' +
                'class="components-button is-compact has-icon" onclick="doIt()">' +
                '<img src="/wp-content/plugins/simple-plugin-test/wrench.svg" title="Fix it" alt="Wrench icon" />' +
                '</button>')
            /!*
            if (header && !header.querySelector('.my-custom-fix-button')) {
                const button = document.createElement('button');
                button.className = 'components-button is-secondary my-custom-fix-button';
                button.innerText = 'Fix';
                button.style.marginLeft = '8px';
                button.onclick = () => alert('Fix button clicked!');
                header.appendChild(button);
            }*!/
        }, 1000);
    }
});*/
