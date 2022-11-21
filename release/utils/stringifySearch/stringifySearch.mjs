import qs from 'qs';

function stringifySearch(search, options) {
    return qs.stringify(search, Object.assign({ encoder: str => typeof str === 'string'
            ? str.replaceAll('+', '%2b').replaceAll(' ', '+')
            : str }, options));
}

export { stringifySearch };
