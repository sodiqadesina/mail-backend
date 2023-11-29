const mongoose = require('mongoose');
const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add a name"],
        unique: [true, "name already in use"],
        trim: true
    },
    description: {
        type: String,
        trim: true,
    },

},
{
  timestamps: true,
});


module.exports = mongoose.model('Category', CategorySchema)