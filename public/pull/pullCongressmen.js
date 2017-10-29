
var lastPage = 1;
var page = 1;
var congressmen = [];
var config = {
    apiKey: "AIzaSyAkQi903UKoLi5jriQrkO8EwSZdfD8bfd4",
    authDomain: "vigieseudeputado.firebaseapp.com",
    databaseURL: "https://vigieseudeputado.firebaseio.com",
    projectId: "vigieseudeputado",
    storageBucket: "vigieseudeputado.appspot.com",
    messagingSenderId: "221200913136"
  };
firebase.initializeApp(config);


function getCongressmen(pag,onSuccess,onLoading,onError){
    page = pag;
    $.ajax({
        url: "https://dadosabertos.camara.leg.br/api/v2/deputados",
        dataType: 'json',
        data: "pagina="+pag+"&itens=100",
        type: 'GET',
        beforeSend:function(){
            if(typeof onLoading === "function"){
                onLoading();    
            }
        },
        success: function (data){               
            if(typeof onSuccess === "function"){
                onSuccess(data);    
            }
        },
        error: function (xhr, er) {
            if(typeof onError === "function"){
                onError(xhr);    
            }
        }
    });
}

var result = function(data){
    if(page == 1){
        var linkLast = data.links[3].href;
        lastPage = linkLast.substring(linkLast.indexOf("?pagina=")+8,linkLast.indexOf("&itens"));
    }
    console.log(page+" - "+lastPage);
    congressmen = congressmen.concat(data.dados);
    
    if(page < lastPage){
        setTimeout(function(){
            getCongressmen((++page),result);
        },1000);
    }

    if(page == lastPage){
        console.log(congressmen);
        for(var i = 0,max = congressmen.length;i<max;i++){
            insert(congressmen[i]);
        }
    }
};
getCongressmen(1,result);



function insert(deputado){
    firebase.database().ref('deputados/' + deputado.id).set(deputado);
}