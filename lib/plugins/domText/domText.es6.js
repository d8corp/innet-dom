import innet from 'innet';

function domText() {
    return (text, next, handler) => innet(document.createTextNode(text), handler);
}

export { domText };
