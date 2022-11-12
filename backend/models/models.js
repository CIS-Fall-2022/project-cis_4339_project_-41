const uuid = require('uuid');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//collection for intakeData
let primaryDataSchema = new Schema({
    _id: { type: String, default: uuid.v1 },
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    phoneNumber: {
        type: Array,
        required: true
    },
    address: {
        line1: {
            type: String
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
        },
        county: {
            type: String,
        },
        zip: {
            type: String,
        }
    },
    orgID: {
        type: String
    },
}, {
    collection: 'primaryData',
    timestamps: true
});

//collection for eventData
let eventDataSchema = new Schema({
    _id: { type: String, default: uuid.v1 },
    eventName: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        required: true
    },
    address: {
        line1: {
            type: String
        },
        city: {
            type: String,
        },
        county: {
            type: String,
        },
        zip: {
            type: String,
        }
    },
    description: {
        type: String,
    },
    attendees: [{
        type: String
    }],
    orgID: {
        type: String
    },
}, {
    collection: 'eventData'
});

//collection for orgData
let orgDataSchema = new Schema({
    _id: { type: String, default: uuid.v1 },
    orgName: {
        type: String,
        require: true
    },
    description: {
        type: String,
    },
}, {
    collection: 'orgData'
});

// create models from mongoose schemas
const primarydata = mongoose.model('primaryData', primaryDataSchema);
const eventdata = mongoose.model('eventData', eventDataSchema);
const orgdata = mongoose.model('orgData', orgDataSchema);

// package the models in an object to export 
module.exports = { primarydata, eventdata, orgdata }
