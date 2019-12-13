let apartment = {
    bedroom: {
        area: 20,
        bed: {
            type: 'twin-bed',
            price: 100
        }
    }
};

function getObjectKey(obj) {
    let objResult = []
    for (keys in obj) {
        if (typeof obj[keys] == "object") {
            objResult.push(keys)
            objResult = objResult.concat(getObjectKey(obj[keys]))
        } else {
            objResult.push(keys);
        }
    }
    return objResult;
}
console.log(getObjectKey(apartment));