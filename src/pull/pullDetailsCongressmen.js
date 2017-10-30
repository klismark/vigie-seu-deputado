var config = {
    apiKey: "AIzaSyAkQi903UKoLi5jriQrkO8EwSZdfD8bfd4",
    authDomain: "vigieseudeputado.firebaseapp.com",
    databaseURL: "https://vigieseudeputado.firebaseio.com",
    projectId: "vigieseudeputado",
    storageBucket: "vigieseudeputado.appspot.com",
    messagingSenderId: "221200913136"
  };
firebase.initializeApp(config);

var congressmen = [];
firebase.database().ref('deputados').once('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var childKey = childSnapshot.key;
      setTimeout(function(){
          getDetails(childKey,insert);
      },200);
    });
});

function insert(deputado){
    console.log(deputado);
    firebase.database().ref('deputados/' + deputado.id).set(deputado);
}

function getDetails(id,onSuccess,onLoading,onError){
    $.ajax({
        url: "https://dadosabertos.camara.leg.br/api/v2/deputados/"+id,
        dataType: 'json',
        type: 'GET',
        beforeSend:function(){
            if(typeof onLoading === "function"){
                onLoading();    
            }
        },
        success: function (data){               
            if(typeof onSuccess === "function"){
                onSuccess(data.dados);    
            }
        },
        error: function (xhr, er) {
            if(typeof onError === "function"){
                onError(xhr);    
            }
        }
    });
}