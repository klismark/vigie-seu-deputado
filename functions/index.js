
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const https = require('https');
//const request = require('request');
admin.initializeApp(functions.config().firebase);


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {




    /*
    axios.get('https://vigieseudeputado.firebaseio.com/deputados/101309.json?shallow=true')
    .then(resp => {
        console.log(resp.data.url);
        console.log(resp.data.explanation);
        response.send(JSON.parse(resp.data));
    })
    .catch(error => {
        console.log(error);
    });*/

    https.get('https://dadosabertos.camara.leg.br/api/v2/deputados?pagina=1&itens=100&idLegislatura=55', (resp) => {
        let data = '';
        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
          data += chunk;
        });
        resp.on('end', () => {
            response.send(JSON.parse(data));
        });
      }).on("error", (err) => {
        console.log("Error: " + err.message);
      });

    /*
    request('https://vigieseudeputado.firebaseio.com/deputados/101309.json?shallow=true&print=pretty', { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }
        console.log(body.url);
        console.log(body.explanation);
        response.send("Hello from Firebase!");
    });*/
});



 
