const url = "https://en.wikipedia.org/api/rest_v1/page/summary/"


const findNeighborhoodInfo = (neighborhoodInfoObject) => {
  fetch(`${url}page/`, {
    headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(neighborhoodObject)
    })
    .then(data => data.json())
    .then(data => data)
    .then(data => console.log(data))
    .catch((error) => {
    console.log('Error:', error);
    })
}

export default {
  findNeighborhood,
}