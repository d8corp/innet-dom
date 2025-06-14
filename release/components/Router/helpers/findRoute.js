'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function setParams(rootPath, pathParams, result) {
    for (let i = 0; i < pathParams.length; i++) {
        const key = pathParams[i];
        if (!key)
            continue;
        result[key] = rootPath[i];
    }
}
function findRoute(routing, path, params, permissions, index = 0) {
    var _a;
    if (path.length === index) {
        if (permissions.size && routing.indexList) {
            for (const item of routing.indexList) {
                if (item.permissions.isSubsetOf(permissions)) {
                    setParams(path, item.params, params);
                    return item;
                }
            }
        }
        if (routing.index) {
            setParams(path, routing.index.params, params);
            return routing.index;
        }
        if (permissions.size && routing.restList) {
            for (const item of routing.restList) {
                if (item.permissions.isSubsetOf(permissions)) {
                    setParams(path, item.params, params);
                    return item;
                }
            }
        }
        if (routing.rest) {
            setParams(path, routing.rest.params, params);
            return routing.rest;
        }
        return undefined;
    }
    const key = path[index];
    const strictRouting = (_a = routing.strict) === null || _a === void 0 ? void 0 : _a[key];
    const nextIndex = index + 1;
    if (strictRouting) {
        const result = findRoute(strictRouting, path, params, permissions, nextIndex);
        if (result) {
            return result;
        }
    }
    if (routing.children) {
        const result = findRoute(routing.children, path, params, permissions, nextIndex);
        if (result)
            return result;
    }
    if (routing.rest) {
        setParams(path, routing.rest.params, params);
        return routing.rest;
    }
}

exports.findRoute = findRoute;
