const axios = require('axios');

async function fetchAllPlanets() {
  const response = await axios.get('http://swapi.dev/api/planets/');
  const allPlanets = [];
  for (let i = 1; i <= response.data.count; i++) {
    const planetResponse = await axios.get(`http://swapi.dev/api/planets/${i}/`);
    allPlanets.push(planetResponse.data);
  }
  return allPlanets;
}

module.exports = { fetchAllPlanets };
