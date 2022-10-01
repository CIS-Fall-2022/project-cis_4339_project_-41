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
    orgdata.createdAt;
    orgdata.updatedAt;
    orgdata.createdAt instanceof Date;
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


module.exports = router;