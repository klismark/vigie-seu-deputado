define(["jquery","bootstrap","request","main","annyang"],
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
        },
        /**
         * 
         * @returns {undefined}
         */
        enableSpeechRecognition:function(){
            if (annyang) {
                console.log("Comando de voz ativo");
                annyang.start();
                localStorage.setItem("speechRecognition",JSON.stringify(true));
                $(".box-status-speech-recognition").addClass("active");
                $("#btn-speech-recognition").html("1 - Desativar comando de voz");
                $("#btn-speech-recognition").unbind("click");
                $("#btn-speech-recognition").click(this.disableSpeechRecognition);
            }
        },
        /**
         * 
         * @returns {undefined}
         */
        disableSpeechRecognition:function(){
            if (annyang) {
                console.log("Comando de voz desativado");
                annyang.abort();
                localStorage.setItem("speechRecognition",JSON.stringify(false));
                $(".box-status-speech-recognition").removeClass("active");
                $("#btn-speech-recognition").html("1 - Ativar comando de voz");
                $("#btn-speech-recognition").unbind("click");
                $("#btn-speech-recognition").click(this.enableSpeechRecognition);
            }
        },
        /**
         * 
         * @returns {undefined}
         */
        verifySpeechRecognition:function(){
            var speechRecognition = JSON.parse(localStorage.getItem("speechRecognition"));
            if (speechRecognition) {
                this.enableSpeechRecognition();
            }else{
                this.disableSpeechRecognition();
            }
        }
    };
});