const restaurantData = require("../utility/restaurant-data")
const uuid = require("uuid")
const express = require("express")
const router = express.Router()

router.post("/recommend", function (req, res) {
    const restaurants = restaurantData.getRestaurants()
    const newRestaurant = req.body
    newRestaurant.id = uuid.v7()

    restaurants.push(newRestaurant)
    restaurantData.writeRestaurants(restaurants)

    res.redirect("/confirm")
})

router.get("/restaurants", function (req, res) {
    const restaurants = restaurantData.getRestaurants()

    let order = req.query.order
    let nextOrder = "desc"

    if (order !== "asc" && order !== "desc") {
        order = "asc"
    }

    if (order === "asc") {
        nextOrder = "desc"
    } else {
        nextOrder = "asc"
    }

    restaurants.sort(function (resA, resB) {
        if (order === "asc" && resA.name > resB.name ||
            order === "desc" && resA.name < resB.name) {
            return 1
        }
        return -1
    })

    res.render("restaurants", {
        numRestaurants: restaurants.length,
        restaurants: restaurants,
        nextOrder: nextOrder
    })
})

router.get("/restaurants/:id", function (req, res) {
    const restaurants = restaurantData.getRestaurants()
    const restaurantId = req.params.id

    for (const restaurant of restaurants) {
        if (restaurantId === restaurant.id) {
            return res.render("restaurant-details", { restaurant: restaurant })
        }
    }

    res.status(404).render("404")
})

router.get("/recommend", function (req, res) {
    res.render("recommend")
})

router.get("/confirm", function (req, res) {
    res.render("confirm")
})

module.exports = router