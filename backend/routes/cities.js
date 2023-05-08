const router = require('express').Router();
const City = require('../models/City');

// Get all favorite cities
router.route('/').get(async (req, res) => {
    try {
        const cities = await City.find();
        res.json(cities);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add a new favorite city
router.route('/add').post(async (req, res) => {
    const name = req.body.name;
    const country = req.body.country;

    const newCity = new City({ name, country });

    try {
        await newCity.save();
        res.json({ message: 'City added to favorites!' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
