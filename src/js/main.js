define(
    ["jquery","actions","request","view"],
    function main() {
        var actions = require('actions');
        var request = require('request');
        var view = require('view');
        
        
        //Ações para o menu de acessibilidade
        $("#btn-open-accessibility").click(actions.openAccessibility);
        $("#btn-close-accessibility").click(actions.closeAccessibility);
        view.changeStatusWAIARIA();
        
        
    }
);