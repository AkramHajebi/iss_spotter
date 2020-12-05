// index.js
const { fetchMyIP } = require('./iss');
const { fetchCoordsByIP } = require('./iss');
const { fetchISSFlyOverTimes } = require('./iss');
const { nextISSTimesForMyLocation } = require('./iss');


const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};





nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  //console.log(passTimes);
  printPassTimes(passTimes);
});


/* 

let  coords = { latitude: '49.27670', longitude: '-123.13000' };

 fetchISSFlyOverTimes(coords, (error, outputCoords) => {
   if (error) {
     console.log("It didn't work!" , error);
     return;
   }
   console.log('It worked! Returned Coords:' , outputCoords);
 });



fetchCoordsByIP ('72.137.118.217', (error, Coords) => {
   if (error) {
     console.log("It didn't work!" , error);
     return;
   }

   console.log('It worked! Returned Coords:' , Coords);
 });



fetchMyIP((error, ip) => {
   if (error) {
      console.log("It didn't work!" , error);
      return;
   }

   console.log('It worked! Returned IP:' , ip);
});
 */