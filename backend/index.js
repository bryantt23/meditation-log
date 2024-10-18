require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3000

app.use(cors())

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));

const meditationSchema = new mongoose.Schema({
    id: String,
    youTubeUrl: String,
    finishTime: Number,
    description: String,
    length: Number
})

const Meditation = mongoose.model('Meditation', meditationSchema)

app.get('/meditations', async (req, res) => {
    try {
        const meditations = await Meditation.find({})
        res.json(meditations)
    } catch (error) {
        console.error('Error retrieving meditations:', error);
        res.status(500).send('Error retrieving meditations');
    }
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})
