
var config = {
    apiKey: "AIzaSyAkQi903UKoLi5jriQrkO8EwSZdfD8bfd4",
    authDomain: "vigieseudeputado.firebaseapp.com",
    databaseURL: "https://vigieseudeputado.firebaseio.com",
    projectId: "vigieseudeputado",
    storageBucket: "vigieseudeputado.appspot.com",
    messagingSenderId: "221200913136"
  };
firebase.initializeApp(config);
/*
var congressmen = [];
firebase.database().ref('deputados').once('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var childKey = childSnapshot.key;
      var childData = childSnapshot.val();
      setTimeout(function(){
          upload(childData.urlFoto);
      },200);
    });
});*/

upload("http://www.camara.leg.br/internet/deputado/bandep/178957.jpg");

function upload(file){
    firebase.storage().ref().child('images/mountains.jpg').put(file);
}