function lcs(before, after) {
    if (before.length === 0 || after.length === 0)
        return [];
    const positions = new Map();
    for (let i = 0; i < after.length; i++) {
        const val = after[i];
        const arr = positions.get(val);
        if (arr) {
            arr.push(i);
        }
        else {
            positions.set(val, [i]);
        }
    }
    const sequence = [];
    for (let i = 0; i < before.length; i++) {
        const posList = positions.get(before[i]);
        if (posList) {
            for (let i = posList.length - 1; i >= 0; i--) {
                sequence.push(posList[i]);
            }
        }
    }
    if (sequence.length === 0)
        return [];
    const predecessors = new Array(sequence.length).fill(-1);
    const tailIndices = [];
    for (let i = 0; i < sequence.length; i++) {
        const x = sequence[i];
        let left = 0;
        let right = tailIndices.length;
        while (left < right) {
            const mid = (left + right) >> 1;
            if (sequence[tailIndices[mid]] < x) {
                left = mid + 1;
            }
            else {
                right = mid;
            }
        }
        if (left > 0) {
            predecessors[i] = tailIndices[left - 1];
        }
        if (left === tailIndices.length) {
            tailIndices.push(i);
        }
        else {
            tailIndices[left] = i;
        }
    }
    const lisIndices = [];
    let k = tailIndices.length > 0 ? tailIndices[tailIndices.length - 1] : -1;
    while (k >= 0) {
        lisIndices.push(sequence[k]);
        k = predecessors[k];
    }
    lisIndices.reverse();
    return lisIndices.map(i => after[i]);
}

export { lcs };
