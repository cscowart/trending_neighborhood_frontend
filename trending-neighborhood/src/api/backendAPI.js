const url = "http://127.0.0.1:8000/"
const findNeighborhood = (neighborhoodObject) => {
fetch(`${url}user_submit`, {
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