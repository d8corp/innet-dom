import innet from 'innet';
import { handler } from '../../handler/handler.es6.js';
import { setParent } from '../../utils/setParent/setParent.es6.js';
import 'watch-state';

function render(app, handler$1 = handler) {
    const parent = document.createDocumentFragment();
    const childrenHandler = Object.create(handler$1);
    setParent(childrenHandler, parent);
    innet(app, childrenHandler);
    return parent;
}

export { render };
