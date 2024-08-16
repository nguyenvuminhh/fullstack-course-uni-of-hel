const configIdObject = (object) => {
    return {...object._doc, id: object._doc._id.toString()}
}

const configIdArray = (array) => {
    return array.map(a => configIdObject(a))
}

module.exports = { configIdArray, configIdObject }