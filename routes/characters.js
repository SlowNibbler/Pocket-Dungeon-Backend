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
    // Parameters for the characters
    let CharacterName = req.body['charactername'];
    let CharacterClass = req.body['characterclass'];
    let CharacterRace = req.body['characterrace'];
    let CharacterLevel = req.body['characterlevel'];
    let Strength = req.body['strength'];
    let Dexterity = req.body['dexterity'];
    let Constitution = req.body['constitution'];
    let Intelligence = req.body['intelligence'];
    let Wisdom = req.body['wisdom'];
    let Charisma = req.body['charisma'];
    let MemberID = req.body['memberid'];


    if (CharacterName && CharacterClass && CharacterRace && CharacterLevel && Strength && Dexterity && Constitution && Intelligence && Wisdom && Charisma && MemberID) {
        db.none("INSERT INTO characters (charactername, characterclass, characterrace, characterlevel, strength, dexterity, constitution, intelligence, wisdom, charisma, memberid) " +
            "VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)",
            [CharacterName, CharacterClass, CharacterRace, CharacterLevel, Strength, Dexterity, Constitution, Intelligence, Wisdom, Charisma, MemberID])
            .then(() => {
                //We successfully added the character, let the user know
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
    db.manyOrNone('SELECT * FROM characters WHERE memberid=$1', [memberId])
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