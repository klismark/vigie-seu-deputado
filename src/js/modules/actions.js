define(["jquery","request","main","annyang"],
function () {
    var module = {
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
                console.log("annyang ok");
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
        configAnnyangCongressman:function(){
            if(annyang){
                console.log("annyang ok");
                annyang.setLanguage("pt-BR");
                var view = require('view');

                var commands = {
                    'ir para *tag': this.goingTo,
                    'mostrar *periodo': this.searchVoiceExpenses,
                    'gastos *periodo': this.searchVoiceExpenses,
                    'pesquisar *periodo': this.searchVoiceExpenses,
                    'detalhar *periodo': this.searchVoiceExpenses,
                    'encontrar *periodo': this.searchVoiceExpenses,
                    'mostrar gastos de *periodo': this.searchVoiceExpenses,
                    'pesquisar gastos de *periodo': this.searchVoiceExpenses,
                    'detalhar gastos de *periodo': this.searchVoiceExpenses,
                    'encontrar gastos de *periodo': this.searchVoiceExpenses,
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
        searchVoiceExpenses: function(periodo){
            var month = module.searchMonthOnVoice(periodo);
            var year = module.searchYearOnVoice(periodo);
            console.log(month+"/"+year);
            if(month == 0 || year == 0){
                return false;
            }
            $('#select-month').val(month+"/"+year).trigger('change');
            location.href="#gastos";
            var view = require('view');
            view.vue.selectMonth();
        },
        searchYearOnVoice: function(text){
            switch(true){
                case (text.indexOf("2015") != -1):
                    return 2015;
                case (text.indexOf("2016") != -1):
                    return 2016;
                case (text.indexOf("2017") != -1):
                    return 2017;
                default:
                    return 0;
            }
        },
        searchMonthOnVoice: function(text){
            switch(true){
                case (text.indexOf("janeiro") != -1):
                    return 1;
                case (text.indexOf("fevereiro") != -1):
                    return 2;
                case (text.indexOf("março") != -1):
                    return 3;
                case (text.indexOf("abril") != -1):
                    return 4;
                case (text.indexOf("maio") != -1):
                    return 5;
                case (text.indexOf("junho") != -1):
                    return 6;
                case (text.indexOf("julho") != -1):
                    return 7;
                case (text.indexOf("agosto") != -1):
                    return 8;
                case (text.indexOf("setembro") != -1):
                    return 9;
                case (text.indexOf("outubro") != -1):
                    return 10;
                case (text.indexOf("novembro") != -1):
                    return 11;
                case (text.indexOf("dezembro") != -1):
                    return 12;
                default:
                    return 0;
            }
        },
        /**
         * 
         * @returns {undefined}
         */
        changeStatusContrast:function(){
            console.log('asdad');
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
    return module;
});