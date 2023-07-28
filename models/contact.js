const mongoose = require('mongoose');

const contactschema = new mongoose.Schema({
    name : {
        type : String,
        require : true

    },
    phone : {
        type: String,
        require : true
    }
});

const Contact = mongoose.model('Contact', contactschema);

module.exports= Contact;
