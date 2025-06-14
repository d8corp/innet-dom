import { Cache } from 'watch-state';
import '../useParams/index.es6.js';
import { useParams } from '../useParams/useParams.es6.js';

function useParam(name) {
    const params = useParams();
    return new Cache(() => params.value[name]);
}

export { useParam };
