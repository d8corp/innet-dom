import { Context, useContext } from '@innet/jsx';

const paramsContext = new Context();
function useParams() {
    const params = useContext(paramsContext);
    if (!params) {
        throw Error('useParams must be used in Router');
    }
    return params;
}

export { paramsContext, useParams };
