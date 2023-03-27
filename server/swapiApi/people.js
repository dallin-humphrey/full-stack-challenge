const axios = require('axios');

async function fetchAllPeople() {
  let people = [];
  let page = 1;
  while (true) {
    const response = await axios.get(`http://swapi.dev/api/people/?page=${page}`);
    people = [...people, ...response.data.results];
    if (!response.data.next) break;
    page++;
  }
  return people;
}

module.exports = { fetchAllPeople };
