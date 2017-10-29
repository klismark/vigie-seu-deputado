
var lastPage = 1;
var page = 1;
var expenses = [];
var congressmen = [];
var index = 0;
var ano = "2017";

var config = {
    apiKey: "AIzaSyAkQi903UKoLi5jriQrkO8EwSZdfD8bfd4",
    authDomain: "vigieseudeputado.firebaseapp.com",
    databaseURL: "https://vigieseudeputado.firebaseio.com",
    projectId: "vigieseudeputado",
    storageBucket: "vigieseudeputado.appspot.com",
    messagingSenderId: "221200913136"
  };
firebase.initializeApp(config);


//firebase.database().ref('despesas').remove();

firebase.database().ref('deputados').once('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();
        congressmen.push(childData);
    });
    getExpenses(congressmen[0].id,1,result);
});


function getExpenses(id,pag,onSuccess,onLoading,onError){
    page = pag;
    $.ajax({
        url: "https://dadosabertos.camara.leg.br/api/v2/deputados/"+id+"/despesas",
        dataType: 'json',
        data: "idLegislatura=55&ano="+ano+"&pagina="+pag+"&itens=100",
        type: 'GET',
        beforeSend:function(){
            if(typeof onLoading === "function"){
                onLoading();    
            }
        },
        success: function (data){               
            if(typeof onSuccess === "function"){
                onSuccess(id,data);    
            }
        },
        error: function (xhr, er) {
            if(typeof onError === "function"){
                onError(xhr);    
            }
        }
    });
}

var result = function(id,data){

    if(page == 1 && data.links.length >= 4){
        var linkLast = data.links[3].href;
        lastPage = linkLast.substring(linkLast.indexOf("pagina=")+7,linkLast.indexOf("&itens"));
    }
    console.log(page+" - "+lastPage);
    expenses = expenses.concat(data.dados);
    
    if(page < lastPage){
        setTimeout(function(){
            getExpenses(id,(++page),result);
        },50);
    }

    if(page == lastPage){
        console.log("------------");
        insert(id,expenses);
    }
};



var total = 0;
function insert(id,despesas){
    firebase.database().ref('despesas/' + id + "/"+ano).set(despesas);
    
    var total = 0;
    for(var i = 0,max = despesas.length;i<max;i++){
        total += (parseFloat(despesas[i].valorDocumento) - parseFloat(despesas[i].valorGlosa));
    }
    firebase.database().ref('deputados/' + id + "/despesas/"+ano+"/total").set(total);
    index++;
    console.log(index);
    if((index) < congressmen.length){
        page = 1;
        lastPage = 1;
        expenses = [];
        total = 0;
        getExpenses(congressmen[index].id,1,result);
    }
}

