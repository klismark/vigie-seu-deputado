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
        
        //Gráficos
        view.buildCharts();
        
    }
);