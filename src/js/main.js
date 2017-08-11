define(
    ["jquery","actions","request","view"],
    function main() {
        var actions = require('actions');
        var view = require('view');
           
        
        //Atualiza os status dos objetos ARIA
        view.changeStatusWAIARIA();

        //Acessibilidade
        actions.configAnnyangHome();
        actions.verifySpeechRecognition();
        view.checkFontSize();
        view.checkContrast();
        $("#btn-speech-recognition").click(actions.changeStatusSpeechRecognition);
        $("#btn-contrast").click(actions.changeStatusContrast);
        $('#btn-up-font').click(view.upFontSize);
        $('#btn-low-font').click(view.lowFontSize);

        if(document.querySelector("#home")){       
            //Lista os partidos no(s) select(s) de partidos.
            actions.listAllCongressmen();
            
            //Ação do link "Todos os Deputados
            $("#form-filter-congressmen").submit(actions.filterCongressmen);
            $("#text-search").keyup(actions.filterCongressmen);
            console.log("aaa");
        }else{
            console.log("bbb");
            //Gráficos
            view.buildCharts();
        }
        
        
    }
);