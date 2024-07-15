const express = require("express")
const app = express()

app.use(express.urlencoded({"extended": false}))

app.get("/", function (req, res) {
    res.sendFile
})

app.listen(3000)
