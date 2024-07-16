const express = require("express")
const path = require("path")
const fs = require("fs")
const app = express()

// Template enabling done through ejs
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")

app.use(express.static("public")) // "Publicizes" styles and scripts
app.use(express.urlencoded({ extended: false }))


// Renders through ejs
app.get("/about", function (req, res) {
    res.render("about")
})

app.get("/confirm", function (req, res) {
    res.render("confirm")
})

app.get("/", function (req, res) {
    res.render("index")
})

app.get("/recommend", function (req, res) {
    res.render("recommend")
})

app.post("/recommend", function (req, res) {
    const pathName = path.join(__dirname, "data", "restaurants.json")
    const restaurant = req.body

    const fileData = fs.readFileSync(pathName)
    const storedRestaurants = JSON.parse(fileData)
    storedRestaurants.push(restaurant)

    fs.writeFileSync(pathName, JSON.stringify(storedRestaurants))

    res.redirect("/confirm")
})

app.get("/restaurants", function (req, res) {
    const pathName = path.join(__dirname, "data", "restaurants.json")
    const fileData = fs.readFileSync(pathName)
    const storedRestaurants = JSON.parse(fileData)

    res.render("restaurants", {
        numRestaurants: storedRestaurants.length,
        restaurants: storedRestaurants
    })
})

app.get("/restaurants/:id", function (req, res) {
    const restaurantId = req.params.id
    res.render("restaurant-details", { rid: restaurantId })
})

app.listen(3000)
