let city = "brisbane";
let country = "australia";

async function addMarker(recipe) {
  let location = [];
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${city}+${country}&key=AIzaSyCgqJcHOB-YQyrsN2T4fpGbAy29DJZY3Gc`
  );
  console.log(response);
  console.log(response[0]);
}
