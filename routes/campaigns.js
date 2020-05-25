const express = require('express');

//pg-promise is a postgres library that uses javascript promises
const pgp = require('pg-promise')();
//We have to set ssl usage to true for Heroku to accept our connection
pgp.pg.defaults.ssl = true;

const db = require('../utilities/sqlconn.js');
var router = express.Router();

const bodyParser = require("body-parser");
//This allows parsing of the body of POST requests, that are encoded in JSON
router.use(bodyParser.json());

router.post("/add", (req, res) => {
    // Parameters for the campaigns
    let campaignobject = req.body['CampaignObject'];
    let memberid = req.body['memberid'];

    if (campaignobject && memberid) {
        db.none("INSERT INTO campaigns (campaignname, memberid) VALUES ($1, $2)",
            [campaignname, memberid])
            .then(() => {
                //We successfully added the campaign, let the user know
                res.send({
                    success: true
                });
            }).catch((err) => {
            //log the error
            console.log(err);
            res.send({
                success: false,
                error: err
            });
        });
    } else {
        res.send({
            success: false,
            input: req.body,
            error: "Missing required information"
        });
    }
});

router.get("/get", (req, res) => {
    let memberId = req.query['memberid'];
    db.manyOrNone('SELECT campaignobject FROM campaigns WHERE memberid=$1',
        [memberId])
        //If successful, run function passed into .then()
        .then((data) => {
            res.send({
                success: true,
                names: data
            });
        }).catch((error) => {
        console.log(error);
        res.send({
            success: false,
            error: error
        })
    });
});

module.exports = router;