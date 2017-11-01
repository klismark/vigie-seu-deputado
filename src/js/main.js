define(
    ["jquery","actions","request","view","vue","firebase"],
    function main() {
        
        //Firebase
        var config = {
            apiKey: "AIzaSyAkQi903UKoLi5jriQrkO8EwSZdfD8bfd4",
            authDomain: "vigieseudeputado.firebaseapp.com",
            databaseURL: "https://vigieseudeputado.firebaseio.com",
            projectId: "vigieseudeputado",
            storageBucket: "vigieseudeputado.appspot.com",
            messagingSenderId: "221200913136"
        };
        firebase.initializeApp(config);


        var actions = require('actions');
        var view = require('view');
           
        //Atualiza os status dos objetos ARIA
        view.accessibility.changeStatusWAIARIA();

        //Acessibilidade
        //Verifica o tamanho da fonte
        view.accessibility.checkFontSize();
        //Verifica o contraste
        view.accessibility.checkContrast();
        //Ações da barra de acessibilidade

        $("#btn-speech-recognition").click(actions.changeStatusSpeechRecognition);
        $("#btn-contrast").click(actions.changeStatusContrast);
        $('#btn-up-font').click(view.accessibility.upFontSize);
        $('#btn-low-font').click(view.accessibility.lowFontSize);


        if(document.querySelector("#home")){  
            //Acessibilidade
            //Configura os comandos gerais do Annyang
            actions.configAnnyangHome();

            view.buildHome();
        }else if(document.querySelector("#congressman")){
            //var hash = location.hash.substring(1,location.hash.length);
            actions.configAnnyangCongressman();
            var id = JSON.parse(localStorage.getItem("congressman"));
            view.buildCongressman(id);
        }else{
            actions.configAnnyangAccessibility();
        }
        
        //Verifica se o comando de voz está ativado
        actions.verifySpeechRecognition();
        
    }
);