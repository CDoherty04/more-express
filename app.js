const express = require("express")
const path = require("path")
const app = express()

app.use(express.urlencoded({ "extended": false }))


app.get("/about", function (req, res) {
    const pathName = path.join(__dirname, "views", "about.html")
    res.sendFile(pathName)
})

app.get("/confirm", function (req, res) {
    const pathName = path.join(__dirname, "views", "confirm.html")
    res.sendFile(pathName)
})

app.get("/", function (req, res) {
    const pathName = path.join(__dirname, "views", "index.html")
    res.sendFile(pathName)
})

app.get("/recommend", function (req, res) {
    const pathName = path.join(__dirname, "views", "recommend.html")
    res.sendFile(pathName)
})

app.get("/restaurants", function (req, res) {
    const pathName = path.join(__dirname, "views", "restaurants.html")
    res.sendFile(pathName)
})


app.listen(3000)
