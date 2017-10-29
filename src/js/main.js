define(
    ["jquery","actions","request","view","vue","firebase"],
    function main() {
        var actions = require('actions');
        var view = require('view');
           
        
        //Atualiza os status dos objetos ARIA
        view.accessibility.changeStatusWAIARIA();

        //Acessibilidade
        //Configura os comandos gerais do Annyang
        actions.configAnnyangHome();
        //Verifica se o comando de voz está ativado
        actions.verifySpeechRecognition();
        //Verifica o tamanho da fonte
        view.accessibility.checkFontSize();
        //Verifica o contraste
        view.accessibility.checkContrast();
        //Ações da barra de acessibilidade

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

        $("#btn-speech-recognition").click(actions.changeStatusSpeechRecognition);
        $("#btn-contrast").click(actions.changeStatusContrast);
        $('#btn-up-font').click(view.upFontSize);
        $('#btn-low-font').click(view.lowFontSize);


        if(document.querySelector("#home")){       
            view.buildHome();
        }else{
            var hash = location.hash.substring(1,location.hash.length);
            view.buildCongressman(hash);
        }
        
        
    }
);