

exports.displayAireports = (req,res) => {const axios = require('axios');

axios.get('https://api.preprod.airportmobility.rem4u.com/airportslist')
  .then(response => {
    var aireports=JSON.stringify(response.data);
    var airList=JSON.parse(aireports);
    var a=JSON.stringify(airList.data);
    var b=JSON.parse(a);
    var array = [];
    for(var i in b)
    {
      array.push([b[i].name,b[i].id_str]);
    }
    return res.status(response.status).send (
      array
       )
      
  })
  .catch(error => {
    console.log(error);
  });
}