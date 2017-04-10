define(
    ["jquery","actions","request","view"],
    function main() {
        var actions = require('actions');
        var request = require('request');
        allCongressmen = [];
        
        
        //Ações para o menu de acessibilidade
        $("#btn-open-accessibility").click(actions.openAccessibility);
        $("#btn-close-accessibility").click(actions.closeAccessibility);
        
        //Abre o modal de carregamento
        actions.openLoadingMain();
        
        //Lista os partidos no(s) select(s) de partidos.
        request.getParties(function(result){
            var view = require('view');
            allCongressmen = result;
            view.buildComboParties(".select-party",result,function(){
                var actions = require('actions');
                //Esconde o modal de carregamento
                actions.closeLoadingMain();
            });
        });
        
        //Ação do link "Todos os Deputados
        $("#link-all-congressmen").click(actions.openAllCongressmen);
        $("#filter-uf-list").change(actions.filterCongressmenByUF);
    }
);