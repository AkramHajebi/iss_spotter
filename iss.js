const request = require('request');

//let ip = '72.137.118.217';


const nextISSTimesForMyLocation = function(callback) {

  fetchMyIP((error,ip) => {
    if (error) {
      return callback(error, null);
    }
    
    fetchCoordsByIP(ip, (error, loc) => {
      if (error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes(loc, (error, nextPasses) => {
        if (error) {
          return callback(error, null);
        }

        callback(null, nextPasses);

      });
    });
  });
};


let url = 'https://api.ipify.org?format=json';  // for  fetchMyIP function
const fetchMyIP = function(callback) {
  
  request(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const data = JSON.parse(body);
    
    callback(error, data.ip);   // data is
  });

};




const fetchCoordsByIP = function(ip, callback) {
  
    request(`https://ipvigilante.com/json/${ip}`, (error, response, body) => {
    
      if (error) {
        //callback(error, null);    //for original code
        return;
      }
      // if non-200 status, assume server error
      if (response.statusCode !== 200) {
        const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
        //callback(Error(msg), null);   //for original code
        return;
      }
  
      //console.log(data);
      const { latitude, longitude } = JSON.parse(body).data;  //for original code
    
      let latitude = "49.27670";    // for the case which website does't work
      let longitude = "-122.08380";  // for the case which website does't work 
      callback(null, { latitude, longitude });

    });      
};
     




 //let  coords = { latitude: '49.27670', longitude: '-123.13000' };

 const fetchISSFlyOverTimes = function(coords, callback) {
   // use request to fetch IP address from JSON API
   request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
   //console.log(`https://ipvigilante.com/json/${'8.8.8.8'}`);
     if (error) {
       callback(error, null);
//       //console.log(error)
       return;
     }
//     // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
       callback(Error(msg), null);
      return;
    }

    
     let data = JSON.parse(body);
    //console.log(data.response);

    //const { latitude, longitude } = JSON.parse(body).data;

    callback(null, data.response);
  });

};


// module.exports = { nextISSTimesForMyLocation };
// module.exports = { fetchISSFlyOverTimes };
//module.exports = { fetchCoordsByIP };
//module.exports = { fetchMyIP }

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation};

