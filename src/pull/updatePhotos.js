
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
//saveFile("http://www.camara.leg.br/internet/deputado/bandep/178957.jpg","178957.jpg");
//upload("http://www.camara.leg.br/internet/deputado/bandep/178957.jpg");

//Listen for file selection
var fileButton = document.querySelector("#upload");
fileButton.addEventListener('change', function(e){ 
    //Get files
    for (var i = 0; i < e.target.files.length; i++) {
        var imageFile = e.target.files[i];

        uploadImageAsPromise(imageFile);
    }
});

//Handle waiting to upload each file using promise
function uploadImageAsPromise (imageFile) {
    return new Promise(function (resolve, reject) {
        var storageRef = firebase.storage().ref("deputados/"+imageFile.name);

        //Upload file
        var task = storageRef.put(imageFile);

        //Update progress bar
        task.on('state_changed',
            function progress(snapshot){
                var percentage = snapshot.bytesTransferred / snapshot.totalBytes * 100;
                var uploader = document.querySelector("#uploader");
                uploader.value = percentage;
            },
            function error(err){

            },
            function complete(){
                var downloadURL = task.snapshot.downloadURL;
                var id = imageFile.name.split(".");

                console.log(id[0]);
                console.log(downloadURL);
                update(id[0],downloadURL);
            }
        );
    });
}

function update(id,url){
    firebase.database().ref('deputados/'+id+"/ultimoStatus/urlFoto").set(url);
}