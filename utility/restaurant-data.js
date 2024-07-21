const fs = require("fs")
const path = require("path")

const pathName = path.join(__dirname, "..", "data", "restaurants.json")
console.log(pathName)

function writeRestaurants(restaurants) {
    fs.writeFileSync(pathName, JSON.stringify(restaurants))
}

function getRestaurants() {
    const fileData = fs.readFileSync(pathName)
    return JSON.parse(fileData)
}

module.exports = {
    getRestaurants: getRestaurants,
    writeRestaurants: writeRestaurants
}