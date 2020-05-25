//express is the framework we're going to use to handle requests
const express = require('express');

//retrieve the router project from express
var router = express.Router();

//add a get route to the router.
router.get("/", (req, res) => {
    setTimeout(() => {
        res.send({
            message: "Thanks for waiting"
        });
    }, 1000);
});

//add a post route to the router.
router.post("/", (req, res) => {
    setTimeout(() => {
        res.send({
            message: "Thanks for waiting POST request"
        });
    }, 1000);
});

// "return" the router
module.exports = router;