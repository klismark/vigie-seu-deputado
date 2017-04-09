define(function () {
    return {
        /**
         * 
         * @param {function} onSuccess
         * @param {function} onError
         * @returns {undefined}
         */
        getParties: function(onSuccess,onError){
            $.ajax({
                url: "getPartidos",
                dataType: 'json',
                type: 'GET',
                success: function (data){               
                    if(typeof onSuccess === "function"){
                        onSuccess(data);    
                    }
                },
                error: function (xhr, er) {
                    if(typeof onError === "function"){
                        onError(data);    
                    }
                }
            });
        },

        /**
         * 
         * @param {function} onSuccess
         * @param {function} onError
         * @returns {undefined}
         */
        getAllCongressmen: function(onSuccess,onError){
            $.ajax({
                url: "getDeputados",
                dataType: 'json',
                type: 'GET',
                success: function (data){               
                    if(typeof onSuccess === "function"){
                        onSuccess(data);    
                    }
                },
                error: function (xhr, er) {
                    if(typeof onError === "function"){
                        onError(data);    
                    }
                }
            });
        }
    };
});