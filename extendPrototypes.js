const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

module.exports = () => {
    String.prototype.toObjectId = function() {
        return ObjectId(this.toString());
    };
    ObjectId.prototype.toObjectId = function() {
        return this;
    };
};