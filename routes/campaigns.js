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

router.post("/", (req, res) => {
    // Parameters for the campaigns
    let campaignname = req.body['campaignname'];
    let campaignnotes = req.body['campaignnotes'];
    let memberid = req.body['memberid'];

    if (campaignname && campaignnotes && memberid) {
        db.none("INSERT INTO campaigns (campaignname, campaignnotes, memberid) VALUES ($1, $2, $3)",
            [campaignname, campaignnotes, memberid])
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

router.get("/", (req, res) => {
    let memberId = req.query['memberid'];
    db.manyOrNone('SELECT campaignid, campaignname, campaignnotes FROM campaigns WHERE memberid=$1',
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