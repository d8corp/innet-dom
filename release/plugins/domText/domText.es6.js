import innet, { useApp, useHandler } from 'innet';

function domText() {
    return () => {
        innet(document.createTextNode(useApp()), useHandler());
    };
}

export { domText };
