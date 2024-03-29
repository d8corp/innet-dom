'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function getHTML(element, showComments) {
    if (element instanceof DocumentFragment) {
        let result = '';
        element.childNodes.forEach(node => {
            result += getHTML(node, showComments);
        });
        return result;
    }
    if (element instanceof Text) {
        return element.nodeValue;
    }
    if (element instanceof HTMLElement) {
        const html = element.outerHTML;
        return showComments ? html : html.replace(/(?=<!--)([\s\S]*?)-->/g, '');
    }
    if (element instanceof Comment) {
        return showComments ? `<!--${element.textContent}-->` : '';
    }
    return element;
}

exports.getHTML = getHTML;
