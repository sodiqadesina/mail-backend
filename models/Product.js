const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug)
const ProductSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
      },
    name: {
        type: String,
        required: [true, "Please add a name"],
        unique: [true, "name already in use"],
        trim: true
    },
    slug :{ 
        type: String, 
        slug: "name" 
    },
    description: {
        type: String,
        trim: true,
    },
    size: {
        type: String,
        trim: true
    },
    price: {
        type: Number,
        required: [true, "Please add a price"],
        trim: true
    },
    mainImage: {
        type: String,
        required: [true, "Please add an image"],
        // unique: [true, "name already in use"],
        trim: true
    },
    otherImages: [{
        type: String,
        trim: true
    }],
    quantities: {
        type: Number,
        required: [true, "Please add a quanties"],
        min: [0, "quantities Minimum Value is 1"],
        trim: true,
        default: 1
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Category',
      },

},
{
  timestamps: true,
});


module.exports = mongoose.model('Product', ProductSchema)
