'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function dif(values1, values2) {
    var maxLength = 0;
    var result;
    for (var i = 0; i < values1.length; i++) {
        var currentResult = [];
        var ii = i;
        for (var j = 0; j < values2.length; j++) {
            var value1 = values1[ii];
            if (value1 === values2[j]) {
                currentResult.push(value1);
                if (ii + 2 > values1.length)
                    break;
                ii++;
            }
        }
        if (currentResult.length > maxLength) {
            maxLength = currentResult.length;
            result = currentResult;
        }
    }
    return result;
}

exports.dif = dif;
