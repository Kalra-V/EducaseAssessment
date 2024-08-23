const express = require('express')
const mysql = require('mysql2')
const bodyParser = require('body-parser')
require('dotenv').config()

const dbHost = process.env.DB_HOST
const dbUser = process.env.DB_USER
const dbPass = process.env.DB_PASS
const dbName = process.env.DB_NAME
const port = process.env.PORT || 5000

const app = express()

app.use(bodyParser.json())

const pool = mysql.createPool( {
    host: dbHost,
    user: dbUser,
    password: dbPass,
    database: dbName
})

//TESTING GET METHOD TO CHECK IF THE APP IS WORKING
app.get('', (req,res) => {
    res.send("Express working");

})

app.post('/addSchool', (req, res) => {
    const { name,address,latitude,longitude } = req.body

    if(!name || !address || typeof latitude !== 'number' || typeof longitude !== 'number') {
        return res.status(400).send('All fields are required and must be of correct data types.')
    }

    const query = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)'
    pool.query(query, [name, address, latitude, longitude], (err, results) => {
        if(err) {
            return res.status(500).send('Failed to add the school.')
        }
        res.status(201).send('School added successfully')
    })
})

app.get('/addSchool', (req, res) => {
    res.send("This endpoint is working correctly.")
})

app.get('/listSchools', (req, res) => {
    const { latitude, longitude } = req.query;

    if (typeof parseFloat(latitude) !== 'number' || typeof parseFloat(longitude) !== 'number') {
        return res.status(400).send('Valid latitude and longitude are required.');
    }

    // Fetch all schools from the database
    const query = 'SELECT id, name, address, latitude, longitude FROM schools';
    pool.query(query, (err, results) => {
        if (err) {
            return res.status(500).send('Failed to retrieve schools.');
        }

        // Calculate distance and sort
        const userLat = parseFloat(latitude);
        const userLon = parseFloat(longitude);

        results.forEach(school => {
            const schoolLat = school.latitude;
            const schoolLon = school.longitude;

            const distance = calculateDistance(userLat, userLon, schoolLat, schoolLon);
            school.distance = distance;
        });

        // Sort by distance
        results.sort((a, b) => a.distance - b.distance);

        res.status(200).json(results);
    });
});

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180);
}

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});