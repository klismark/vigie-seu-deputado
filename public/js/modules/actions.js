define(["jquery","bootstrap","request"],function(){return{openAccessibility:function(){$(".menu-accessibility").animate({top:0}),$(this).hide(),$(this).attr("aria-hidden",!0)},closeAccessibility:function(){$(".menu-accessibility").animate({top:"-100%"}),$("#btn-open-accessibility").show(),$("#btn-open-accessibility").attr("aria-hidden",!1)},openLoadingMain:function(){var a=$("#content-loading");$("#modal-loading").modal({backdrop:"static",keyboard:!1}),a.addClass("alert alert-info"),a.html('<i class="fa fa-2x fa-spin fa-cog"></i><br> carregando...')},closeLoadingMain:function(){$("#modal-loading").modal("hide")},openAllCongressmen:function(){var a=require("request"),b=require("actions");b.openLoadingMain(),a.getAllCongressmen(function(a){b.closeLoadingMain();var c=require("view"),d=$("#content-list-congressmen");c.listAllCongressmen(d,a,function(){$("#modal-list-congressmen").on("shown.bs.modal",function(a){$("body").addClass("modal-open")}),$("#modal-list-congressmen").modal("show")})},function(a){b.closeLoadingMain();var c=$("#content-loading");c.removeClass("alert-success alert-warning alert-info"),c.addClass("alert alert-danger text-center"),c.html('<i class="fa fa-2x fa-warning"></i><br>Erro desconhecido, tente novamente.<br><button type="button" class="btn btn-primary" data-dismiss="modal">OK</button>'),$("#modal-loading").modal("show")})}}});