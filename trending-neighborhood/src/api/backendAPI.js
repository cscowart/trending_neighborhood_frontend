const url = "http://127.0.0.1:8000/"

const findNeighborhood = (neighborhoodObject) => {
  return (fetch(`${url}user_submit`, {
  headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
  },
  method: 'POST',
  body: JSON.stringify(neighborhoodObject)
  }))
    .then(resonse => resonse.json())
    .then(data => JSON.parse(data))
    .catch((error) => {
    console.log('Error:', error);
    })
}

const getDefaultNeighborhood = (city) => {
  return (fetch(`${url}default_view/${city}`))
    .then(resonse => resonse.json())
    .then(data => JSON.parse(data))
    .catch((error) => {
    console.log('Error:', error);
    })
}


export default {
  findNeighborhood,
  getDefaultNeighborhood,
}