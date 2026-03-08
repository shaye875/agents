export function isInformation(keys, user) {
    let count = 0
    for (let key of keys) {
        for (let keyUser in user) {
            if (key.toLowerCase() === keyUser.toLowerCase()) {
                count++
                if (key !== keyUser) {
                    user[key] = user[keyUser]
                    delete user[keyUser]
                }
            }
        }
    }
    if (count === keys.length) {
        return true
    }
    return false
}

export function isTypes(objKeys, user) {
    let count = 0
    for (let key in objKeys) {
        if (typeof (objKeys[key]) === typeof (user[key])) {
            count++
        }
    }
    if (count === Object.keys(objKeys).length) {
        return true
    }
    return false
}