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
            $(this).attr("aria-hidden",true);
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
            $("#btn-open-accessibility").attr("aria-hidden",false);
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
                    view.listAllCongressmen($box,result,function(){      
                        $('#modal-list-congressmen').on('shown.bs.modal', function (e) {
                            $("body").addClass("modal-open");
                        });
                        //Abre o modal
                        $('#modal-list-congressmen').modal('show' );                       
                        
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
        filterCongressmenByUF: function(){
            var ufSelected = $("#filter-uf-list option:selected").val();
            var main = require('main');
            console.log(main);
            //$("#list-all-congressmen li[data-uf='"+ufSelected+"']").attr("data-uf",ufSelected);
        }
    };
});