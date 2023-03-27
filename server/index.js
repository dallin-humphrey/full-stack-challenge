const express = require('express');
const cors = require('cors');
const { fetchAllPeople } = require('./swapiApi/people.js');
const { fetchAllPlanets } = require('./swapiApi/planets.js');

const PORT = process.env.PORT || 4000;
const app = express();

app.use(cors());

app.get('/api/people', async (req, res) => {
  try {
    const people = await fetchAllPeople();
    res.json(people);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching people');
  }
});

app.get('/api/planets', async (req, res) => {
  try {
    const planets = await fetchAllPlanets();
    res.json(planets);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching planets');
  }
});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
