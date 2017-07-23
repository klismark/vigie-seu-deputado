define(["jquery","bootstrap","request","main"],
function () {
    return {
        /**
         * 
         * @returns {undefined}
         */
        openAccessibility: function(){
            $(".menu-accessibility").animate({
                "top":0
            });
            $(this).hide();
            $("#btn-open-accessibility").attr("aria-expanded",false);
            $(".item-menu-accessibility").attr("aria-expanded",true);
            $("#btn-close-accessibility").attr("aria-expanded",true);
        },
        /**
         * 
         * @returns {undefined}
         */
        closeAccessibility: function(){
            $(".menu-accessibility").animate({
                "top":"-100%"
            });
            $("#btn-open-accessibility").show();
            $("#btn-open-accessibility").attr("aria-expanded",true);
            $(".item-menu-accessibility").attr("aria-expanded",false);
            $("#btn-close-accessibility").attr("aria-expanded",false);
        },
        /**
         * 
         * @returns {undefined}
         */
        openLoadingMain: function(){
            var $box = $("#content-loading");
            $('#modal-loading').modal({backdrop: 'static', keyboard: false});
            $box.addClass("alert alert-info");
            $box.html('<i class="fa fa-2x fa-spin fa-cog"></i><br> carregando...');
        },
        /**
         * 
         * @returns {undefined}
         */
        closeLoadingMain: function(){
            $('#modal-loading').modal("hide");
        },
        /**
         * 
         * @returns {undefined}
         */
        openAllCongressmen: function(){
            var request = require('request');
            var actions = require('actions');
            actions.openLoadingMain();
            request.getAllCongressmen(
                function(result){//Caso a requisição seja concluída com sucesso
                    
                    actions.closeLoadingMain();  
                    var view = require('view');
                    var $box = $("#content-list-congressmen");
                    view.listAllCongressmen($box,result.congressmen,function(){      
                        localStorage.setItem("allCongressmen", JSON.stringify(result.congressmen));
                        $('#modal-list-congressmen').on('shown.bs.modal', function (e) {
                            $("body").addClass("modal-open");
                        });
                        //Abre o modal
                        $('#modal-list-congressmen').modal('show');
                    });
                },
                function(xhr){//Caso a requisição seja concluída com erros
                    actions.closeLoadingMain();  
                    var $box = $("#content-loading");
                    $box.removeClass("alert-success alert-warning alert-info");
                    $box.addClass("alert alert-danger text-center");
                    $box.html('<i class="fa fa-2x fa-warning"></i><br>Erro desconhecido, tente novamente.<br><button type="button" class="btn btn-primary" data-dismiss="modal">OK</button>');                    
                    $('#modal-loading').modal('show');
                }
            );
        },
        /**
         * 
         * @returns {undefined}
         */
        filterCongressmen: function(){
            var ufSelected = $("#filter-uf-list option:selected").val();
            var partySelected = $("#filter-party-list option:selected").val();
            var allCongressmen = JSON.parse(localStorage.getItem("allCongressmen"));
            if(ufSelected === "0" && partySelected !== "0"){
                allCongressmen = allCongressmen.filter(function(item){
                    if(item.siglaPartido !== partySelected){
                        return false;
                    }
                    return true;
                });
            }else if(ufSelected !== "0" && partySelected === "0"){
                allCongressmen = allCongressmen.filter(function(item){
                    if(item.siglaUf !== ufSelected){
                        return false;
                    }
                    return true;
                });
            }else if(ufSelected !== "0" && partySelected !== "0"){
                allCongressmen = allCongressmen.filter(function(item){
                    if(item.siglaUf !== ufSelected || item.siglaPartido !== partySelected){
                        return false;
                    }
                    return true;
                });
            }  
            
            var view = require('view');         
            var $box = $("#content-list-congressmen");  
            if(allCongressmen.length === 0){
                view.showAlertDanger($box,"Nenhum deputado encontrado.")
                return;
            }
            view.listAllCongressmen($box,allCongressmen);         
        }
    };
});