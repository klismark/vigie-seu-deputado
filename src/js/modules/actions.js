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
        changeStatusSpeechRecognition:function(){
            if (annyang) {
                var speechRecognition = JSON.parse(localStorage.getItem("speechRecognition"));
                if(speechRecognition){
                    console.log("Comando de voz desativado");
                    annyang.abort();
                    localStorage.setItem("speechRecognition",JSON.stringify(false));
                    $(".box-status-speech-recognition").removeClass("active");
                    $("#btn-speech-recognition").html("1 - Ativar comando de voz");
                }else{
                    console.log("Comando de voz ativo");
                    annyang.start();
                    localStorage.setItem("speechRecognition",JSON.stringify(true));
                    $(".box-status-speech-recognition").addClass("active");
                    $("#btn-speech-recognition").html("1 - Desativar comando de voz");
                }
            }else{
                console.log("Comando de voz desativado (annyang desativado)");
                localStorage.setItem("speechRecognition",JSON.stringify(false));
                $(".box-status-speech-recognition").removeClass("active");
                $("#btn-speech-recognition").html("1 - Ativar comando de voz");
            }
        },
        /**
         * 
         * @returns {undefined}
         */
        verifySpeechRecognition:function(){
            if(annyang){
                var speechRecognition = JSON.parse(localStorage.getItem("speechRecognition"));
                if (speechRecognition) {
                    console.log("Comando de voz ativo");
                    annyang.start();
                    localStorage.setItem("speechRecognition",JSON.stringify(true));
                    $(".box-status-speech-recognition").addClass("active");
                    $("#btn-speech-recognition").html("1 - Desativar comando de voz");
                }else{
                    console.log("Comando de voz desativado");
                    annyang.abort();
                    localStorage.setItem("speechRecognition",JSON.stringify(false));
                    $(".box-status-speech-recognition").removeClass("active");
                    $("#btn-speech-recognition").html("1 - Ativar comando de voz");
                }
            }else{
                $("#btn-speech-recognition").hide();
            }
        },
        /**
         * 
         * @returns {undefined}
         */
        configAnnyangHome:function(){
            if(annyang){
                console.log("ok");
                annyang.setLanguage("pt-BR");
                var view = require('view');

                var commands = {
                    'ir para *tag': this.goingTo,
                    'pesquisar *congressman': this.searchVoiceCongressmen,
                    'encontre *congressman': this.searchVoiceCongressmen,
                    'detalhar *congressman': this.searchVoiceCongressmen,
                    'encontrar *congressman': this.searchVoiceCongressmen,
                    'encontrar todos os deputados': this.searchVoiceCongressmen,
                    'mostrar todos os deputados': this.searchVoiceCongressmen,
                    'exibir todos os deputados': this.searchVoiceCongressmen,
                    'desativar comando de voz': this.changeStatusSpeechRecognition,
                    'aumentar letra': view.upFontSize,
                    'diminuir letra': view.lowFontSize,
                    'aumentar fonte': view.upFontSize,
                    'diminuir fonte': view.lowFontSize,
                    'aumentar tamanho da fonte': view.upFontSize,
                    'diminuir tamanho da fonte': view.lowFontSize,
                    'aumentar tamanho da letra': view.upFontSize,
                    'diminuir tamanho da letra': view.lowFontSize,
                    'aumentar contraste': view.enableContrast,
                    'diminuir contraste': view.disableContrast,
                    'baixar contraste': view.disableContrast,
                    'alto contraste': view.enableContrast,
                    'baixo contraste': view.disableContrast
                };
                annyang.addCommands(commands);
            }
        },
        /**
         * 
         * @returns {undefined}
         */
        goingTo: function(text){
            console.log(text);
            if(text == "conteúdo"){
                location.href="#conteudo";
            }else if(text == "busca"){
                location.href="#busca";
            }
        },
        /**
         * 
         * @returns {undefined}
         */
        searchVoiceCongressmen: function(congressman){
            console.log(congressman);
            location.href="#busca";
            $("#text-search").val(congressman);
            var actions = require('actions');
            actions.filterCongressmen();
        },
        /**
         * 
         * @returns {undefined}
         */
        changeStatusContrast:function(){
            var contrast = JSON.parse(localStorage.getItem("contrast"));
            var view = require('view');
            if (contrast) {
                view.disableContrast();
            }else{
                view.enableContrast();
            }
        }
    };
});