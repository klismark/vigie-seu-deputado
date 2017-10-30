define(["jquery","request","main","annyang"],
function () {
    return {
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
                    'aumentar letra': view.accessibility.upFontSize,
                    'diminuir letra': view.accessibility.lowFontSize,
                    'aumentar fonte': view.accessibility.upFontSize,
                    'diminuir fonte': view.accessibility.lowFontSize,
                    'aumentar tamanho da fonte': view.accessibility.upFontSize,
                    'diminuir tamanho da fonte': view.accessibility.lowFontSize,
                    'aumentar tamanho da letra': view.accessibility.upFontSize,
                    'diminuir tamanho da letra': view.accessibility.lowFontSize,
                    'aumentar contraste': view.accessibility.enableContrast,
                    'diminuir contraste': view.accessibility.disableContrast,
                    'baixar contraste': view.accessibility.disableContrast,
                    'alto contraste': view.accessibility.enableContrast,
                    'baixo contraste': view.accessibility.disableContrast
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
            
            $("#btn-search").trigger('click');
        },
        /**
         * 
         * @returns {undefined}
         */
        changeStatusContrast:function(){
            var contrast = JSON.parse(localStorage.getItem("contrast"));
            var view = require('view');
            console.log(contrast);
            if (contrast) {
                view.accessibility.disableContrast();
            }else{
                view.accessibility.enableContrast();
            }
        }
    };
});