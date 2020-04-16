const url = "http://127.0.0.1:8000/"
// const url = "http://up-n-up.herokuapp.com/api/

const findNeighborhood = (neighborhoodObject) => {
  return(fetch(`${url}user_submit`, {
  headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
  },
  method: 'POST',
  body: JSON.stringify(neighborhoodObject)
  }))
    .then(response => response.json())
    .then(data => data)
    .catch((error) => {
    console.log('Error:', error);
    })
}

const getDefaultNeighborhoods = (city) => {
    console.log(city)
  return (fetch(`${url}default_view/${city}`))
    .then(resonse => resonse.json())
    .then(data => data)
    .catch((error) => {
    console.log('Error:', error);
    })
}

const getCityEvents = (city) => {
  // console.log(city)
  return (fetch(`${url}events/${city}`)) //Change
    .then(resonse => resonse.json())
    .then(data => data)
    .catch((error) => {
    console.log('Error:', error);
    })
}

// async function searchEvents(city, textToSearchFor) {
//   console.log(textToSearchFor)
//   let response = await fetch(`${url}events/${city}?filter={"where":{"eventName":{"ilike":"${textToSearchFor}"}}}`)
//   let data = await response.json()
//   return data
// }


export default {
  findNeighborhood,
  getDefaultNeighborhoods,
  getCityEvents,
  // searchEvents,
}