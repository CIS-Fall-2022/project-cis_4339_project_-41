const express = require("express"); 
const router = express.Router(); 

//importing data model schemas
let { orgdata } = require("../models/models"); 

//GET all entries
router.get("/", (req, res, next) => { 
    orgdata.find( 
        (error, data) => {
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }
    ).sort({ 'updatedAt': -1 }).limit(10);
});

//POST
router.post("/", (req, res, next) => { 
    orgdata.create( 
        req.body,
        (error, data) => { 
            if (error) {
                return next(error);
            } else {
                res.json(data); 
            }
        }
    );
});

//PUT update (make sure req body doesn't have the id)
router.put("/:id", (req, res, next) => { 
    orgdata.findOneAndUpdate( 
        { _id: req.params.id }, 
        req.body,
        (error, data) => {
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }
    );
});

// DELETE
router.delete('/:id', (req, res, next) => {
    orgdata.findOneAndRemove({ _id: req.params.id }, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg
                : data
            });
        }
    });
});

//GET entries based on search query
//Ex: '...?orgName=Food&searchBy=name' 
router.get("/search/", (req, res, next) => { 
    let dbQuery = "";
    if (req.query["searchBy"] === 'name') {
        dbQuery = { orgName: { $regex: `^${req.query["orgName"]}`, $options: "i" } }
    };
    orgdata.find( 
        dbQuery, 
        (error, data) => { 
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }
    );
});

//GET single entry by ID
router.get("/id/:id", (req, res, next) => { 
    orgdata.find({ _id: req.params.id }, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

module.exports = router;
