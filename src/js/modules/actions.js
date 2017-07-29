define(["jquery","bootstrap","request","main"],
function () {
    return {
        /**
         * 
         * @returns {undefined}
         */
        listAllCongressmen: function(){
            var onSuccess = function(congressmen){
                var view = require('view');
                localStorage.setItem('congressmen', JSON.stringify(congressmen));
                view.buildListAllCongressmen(congressmen);
            };
            var onLoading = function(){
                var view = require('view');
                view.buildLoading("#box-all-congressmen");
            };
            var onError = function(error){
                var view = require('view');
                view.buildAlertDanger("#box-all-congressmen");
            };
            var request = require('request');
            request.getAllCongressmen(onSuccess,onLoading,onError);
        },
        /**
         * 
         * @returns {undefined}
         */
        filterCongressmen: function(){
            //Alerta de carregamento
            var view = require('view');
            view.buildLoading("#box-all-congressmen");

            //Filtra os dados
            var congressmen = JSON.parse(localStorage.getItem('congressmen'));
            var textSearch = $("#text-search").val().toLocaleLowerCase();
            
            congressmen = congressmen.filter(function(congressman){
                if(congressman.name.toLocaleLowerCase().includes(textSearch)){
                    return true;
                }else if(congressman.uf.toLocaleLowerCase() == textSearch){
                    return true;
                }else if(congressman.party.toLocaleLowerCase() == textSearch){
                    return true;
                }
                return false;
            });

            //Lista os deputados
            view.buildListAllCongressmen(congressmen);
        }
    };
});