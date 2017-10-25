define(function () {
    return {
        /**
         * 
         * @param {function} onSuccess
         * @param {function} onError
         * @returns {undefined}
         */
        getAllCongressmen: function(onSuccess,onLoading,onError){
            $.ajax({
                url: "congressmen.json",
                dataType: 'json',
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
        },
        /**
         * 
         * @param {string} param
         * @param {function} onSuccess
         * @param {function} onLoading
         * @param {function} onError
         * @returns {undefined}
         */
        loadCongressmen:function(param,onSuccess,onLoading,onError){
            $.ajax({
                url: "https://dadosabertos.camara.leg.br/api/v2/deputados",
                dataType: 'json',
                data:param?jQuery.param(param):"",
                type: 'GET',
                beforeSend:function(){
                    if(typeof onLoading === "function"){
                        onLoading();    
                    }
                },
                success: function (data,textStatus){               
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
            $.ajax({
                url: "https://dadosabertos.camara.leg.br/api/v2/deputados/"+id,
                dataType: 'json',
                type: 'GET',
                beforeSend:function(){
                    if(typeof onLoading === "function"){
                        onLoading();    
                    }
                },
                success: function (data,textStatus){               
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
            $.ajax({
                url: "https://dadosabertos.camara.leg.br/api/v2/deputados/"+id+"/despesas",
                dataType: 'json',
                data:param?jQuery.param(param):"",
                type: 'GET',
                beforeSend:function(){
                    if(typeof onLoading === "function"){
                        onLoading();    
                    }
                },
                success: function (data,textStatus){               
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
    };
});