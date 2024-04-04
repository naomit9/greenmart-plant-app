const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PlantSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        //required: true,
    },
    description: {
        type: String,
        //required: true,
    },
    thumbnail: {
        type: String,
        //required: true,
    },
    category: {
        type: Array,
        //required: true,
    },
    waterLevel: {
        type: Number,
        //required: true,
    },
    sunLevel: {
        type: Number,
        //required: true,
    },
    humidityLevel: {
        type: Number,
        //required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
})

module.exports = mongoose.model("Plant", PlantSchema)
