const express = require("express")
const path = require("path")
const fs = require("fs")
const uuid = require("uuid")

const restaurantData = require("./utility/restaurant-data")
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
    const restaurants = restaurantData.getRestaurants()
    const newRestaurant = req.body
    newRestaurant.id = uuid.v7()

    restaurants.push(newRestaurant)
    restaurantData.writeRestaurants(restaurants)

    res.redirect("/confirm")
})

app.get("/restaurants", function (req, res) {
    const restaurants = restaurantData.getRestaurants()

    res.render("restaurants", {
        numRestaurants: restaurants.length,
        restaurants: restaurants
    })
})

app.get("/restaurants/:id", function (req, res) {
    const restaurants = restaurantData.getRestaurants()
    const restaurantId = req.params.id

    for (const restaurant of restaurants) {
        if (restaurantId === restaurant.id) {
            return res.render("restaurant-details", { restaurant: restaurant })
        }
    }

    res.status(404).render("404")
})

app.use(function (req, res) {
    res.status(404).render("404")
})

app.use(function (error, req, res, next) {
    res.status(500).render("500")
})

app.listen(3000)
