//grabs the distance between two sets of coordinates

const GetDistance = (lat1, lon1, lat2, lon2) => {
  
let R = 6371000; // meters -- to convert to miles / 1609
let φ1 = lat1*Math.PI/180;
let φ2 = lat2*Math.PI/180;
let Δφ = (lat2-lat1)*Math.PI/180;
let Δλ = (lon2-lon1)*Math.PI/180;
let a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
Math.cos(φ1) * Math.cos(φ2) *
Math.sin(Δλ/2) * Math.sin(Δλ/2);
let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
let distance = parseInt(R * c);
return distance
}

export default GetDistance;