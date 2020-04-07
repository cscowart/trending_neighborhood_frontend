const url = `http://127.0.0.1:8000`

const findNeighborhood = (neighborhoodObject) => {
  let response = fetch(`${url}`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(neighborhoodObject)
  })
  return response
    // .then(response => response.JSON)
    // .then(data => console.log(data))
}


export default {
  findNeighborhood,
}