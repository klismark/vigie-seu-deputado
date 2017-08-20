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
                url: "http://allsimple.com.br/deputados/congressmen.json",
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
        }
    };
});