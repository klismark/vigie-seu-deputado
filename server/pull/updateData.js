var config = {
    apiKey: "AIzaSyAkQi903UKoLi5jriQrkO8EwSZdfD8bfd4",
    authDomain: "vigieseudeputado.firebaseapp.com",
    databaseURL: "https://vigieseudeputado.firebaseio.com",
    projectId: "vigieseudeputado",
    storageBucket: "vigieseudeputado.appspot.com",
    messagingSenderId: "221200913136"
  };
firebase.initializeApp(config);

firebase.database().ref('deputados').once('value', function(snapshot) {
    var congressmen = [];
    snapshot.forEach(function(childSnapshot) {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();
        congressmen.push(childData);
    });
    updateRanking2017(congressmen);
    updateRanking(congressmen);
});

function updateRanking2017(congressmen){
        var congressmenRanking2017 = congressmen.sort(function(a,b){
            if (a.despesas[2017].total > b.despesas[2017].total) {
                return -1;
              }
              if (a.despesas[2017].total < b.despesas[2017].total) {
                return 1;
              }
              return 0;
        });
        console.log("RANKING 2017");
        console.log(congressmenRanking2017);

        for(var i = 0,max = congressmenRanking2017.length;i<max;i++){
            firebase.database().ref('deputados/' + congressmenRanking2017[i].id + "/despesas/2017/posicao").set((i+1));

            var totalGeral = congressmenRanking2017[i].despesas[2015].total + congressmenRanking2017[i].despesas[2016].total + congressmenRanking2017[i].despesas[2017].total;
            firebase.database().ref('deputados/' + congressmenRanking2017[i].id + "/despesas/total").set(totalGeral);
        }
}


function updateRanking(congressmen){
    var congressmenRanking = congressmen.sort(function(a,b){
        if (a.despesas.total > b.despesas.total) {
            return -1;
            }
            if (a.despesas.total < b.despesas.total) {
            return 1;
            }
            return 0;
    });
    console.log("RANKING GERAL");
    console.log(congressmenRanking);


    for(var i = 0,max = congressmenRanking.length;i<max;i++){
        firebase.database().ref('deputados/' + congressmenRanking[i].id + "/despesas/posicaoMandato55").set((i+1));
    }
}