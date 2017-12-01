define(["firebase"],
function () {
    var module = {
        /**
         * 
         * @param {function} onSuccess
         * @param {function} onError
         * @returns {undefined}
         */
        loadAllCongressmen: function(onSuccess,onLoading,onError){
            if(typeof onLoading === "function"){
                onLoading();    
            }
            firebase.database().ref('deputados/55').orderByChild("ultimoStatus/nomeEleitoral").once('value', function(snapshot) {
                var congressmen = [];
                snapshot.forEach(function(childSnapshot) {
                  var childKey = childSnapshot.key;      
                    var childData = childSnapshot.val();
                    congressmen.push(childData);
                });
                if(typeof onSuccess === "function"){
                    onSuccess(congressmen);    
                }
            });
        },
        /**
         * 
         * @param {int} id
         * @param {function} onSuccess
         * @param {function} onLoading
         * @param {function} onError
         * @returns {undefined}
         */
        loadCongressmanDetails:function(id,onSuccess,onLoading,onError){
            if(typeof onLoading === "function"){
                onLoading();    
            }
            firebase.database().ref('deputados/55/'+id).once('value').then(function(snapshot) {
                var congressman = snapshot.val();
                if(typeof onSuccess === "function"){
                    onSuccess(congressman);    
                }
            });
        },
        /**
         * 
         * @param {int} id
         * @param {object} param
         * @param {function} onSuccess
         * @param {function} onLoading
         * @param {function} onError
         * @returns {undefined}
         */
        loadCongressmanOutgoing:function(id,param,onSuccess,onLoading,onError){
            if(typeof onLoading === "function"){
                onLoading();    
            }
            firebase.database().ref('despesas/55/'+id+'/'+param.ano).orderByChild("mes").equalTo(param.mes+"").once('value', function(snapshot) {
                var expenses = [];
                snapshot.forEach(function(childSnapshot) {
                  var childKey = childSnapshot.key;      
                    var childData = childSnapshot.val();
                    expenses.push(childData);
                });
                if(typeof onSuccess === "function"){
                    onSuccess(expenses);    
                }
            });
        }
    };
    return module;
});