define(
    ["jquery","actions","request","view"],
    function main() {
        var actions = require('actions');
        var view = require('view');
           
        //Atualiza os status dos objetos ARIA
        view.changeStatusWAIARIA();
        
        //Lista os partidos no(s) select(s) de partidos.
        actions.listAllCongressmen();
        
        //Ação do link "Todos os Deputados
        $("#form-filter-congressmen").submit(actions.filterCongressmen);
        $("#text-search").keyup(actions.filterCongressmen);

        //Acessibilidade
        actions.verifySpeechRecognition();
        
    }
);