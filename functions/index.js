
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const axios = require('axios');
//const request = require('request');
admin.initializeApp(functions.config().firebase);


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.dataCongressmen = functions.https.onRequest((request, response) => {
    admin.database().ref('deputados').once('value', function(snapshot) {
        var congressmen = [];
        snapshot.forEach(function(childSnapshot) {
            var childKey = childSnapshot.key;      
            congressmen.push(childKey);
        });
        response.send(JSON.parse(congressmen));
    }).catch(error => {
        console.log(error);
    });
});