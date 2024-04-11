require("dotenv").config();
const cors = require("cors");
const express = require("express");
const connectDB = require("./connectDB")
const Plant = require("./models/Plants")
const multer = require("multer")

const app = express();
const PORT = process.env.PORT || 3000;

connectDB()
app.use(cors(
    {
        origin:'*'
    }
));
app.use(express.urlencoded( { extended: true } ))
app.use(express.json());
app.use(express.static("uploads"))

app.get("/api/plants", async (req, res) => {
    try {
        const category = req.query.category;
        //console.log(category)

        const filter = {};
        if(category) {
            filter.category = category;
        }

        const data = await Plant.find(filter)
        res.json(data)
    } catch (error) {
        res.status(500).json({error: 'Error catch Plants'})
    }
})


app.get("/api/plants/:slug", async (req, res) => {
    try {
        const slugParam = req.params.slug
        //console.log(slugParam)
        const data = await Plant.findOne({ slug: slugParam})
        res.json(data)
    } catch (error) {
        res.status(500).json({error: 'Error catch Plants'})
    }
})

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniqueSuffix + "-" + file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })

app.put("/api/plants/add", upload.single("thumbnail") ,async (req, res) => {
    try {
        console.log(req.body)
        console.log(req.file)

        const newPlant = new Plant({
            name: req.body.name,
            slug: req.body.slug,
            waterLevel: req.body.waterLevel,
            sunLevel: req.body.sunLevel,
            humidityLevel: req.body.humidityLevel,
            description: req.body.description,
            category: req.body.category,
            thumbnail: req.file.filename,
        })
        await Plant.create(newPlant)
        res.json('Data submitted')
    } catch (error) {
        res.status(500).json({error: 'Error catch Plants'})
    }
})


app.put("/api/plants", upload.single("thumbnail") ,async (req, res) => {
    try {
        const plantID = req.body.plantID
        const updatePlant = {
            name: req.body.name,
            slug: req.body.slug,
            waterLevel: req.body.waterLevel,
            sunLevel: req.body.sunLevel,
            humidityLevel: req.body.humidityLevel,
            description: req.body.description,
            category: req.body.category,
        }

        if(req.file) {
            updatePlant.thumbnail = req.file.filename
        }

        await Plant.findByIdAndUpdate(plantID, updatePlant)
        res.json('Data submitted')
    } catch (error) {
        res.status(500).json({error: 'Error catch Plants'})
    }
})

app.delete("/api/plants/:id", async (req, res) => {
     const plantID = req.params.id
     
     try {
        await Plant.deleteOne({_id: plantID})
        res.json("Sad to see you go!" + req.body.plantID)
     } catch (error) {
        res.json(error)
     }
})

app.get("*", (req, res) => {
    res.sendStatus("404")
})


app.listen(PORT, () => {
    console.log(`Server is running on Port: ${PORT}`)
})