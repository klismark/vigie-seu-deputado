define(["jquery"],function(a){return{buildListAllCongressmen:function(b,c){if(0==b.length)return void this.buildAlertWarning("#box-all-congressmen","Nenhum deputado encontrado.");for(var d='<div class="panel panel-default"><div class="panel-body"><div class="row">',e=0,f=b.length;e<f;e++)d+='<div class="col-lg-4 col-md-6 col-sm-6" id="congressmen-'+b[e].id+'">',d+='<div class="thumbnail" itemscope itemtype="http://schema.org/Person">',d+='<img src="'+b[e].photo+'" class="photo-list-congressmen" alt="Foto do deputado '+b[e].name+'">',d+='<div class="caption info-list-congressmen">',d+='<h3 itemprop="name">'+b[e].name+"</h3>",d+='<p class="text-info-list-congressmen">',d+='<span itemprop="affiliation"><i  aria-hidden="true" class="fa fa-flag"></i> '+b[e].party+" - "+b[e].uf+"</span><br>",d+='<span itemprop="email"><i  aria-hidden="true" class="fa fa-envelope-o"></i> '+b[e].email+"</span>",d+="</p>",d+='<a href="deputado/'+b[e].reference+'" itemprop="url" class="btn-view-congressman btn btn-small btn-success" ><i class="fa fa-info-circle" aria-hidden="true"></i> Ver Detalhes</a>',d+="</div>",d+="</div>",d+="</div>";d+="</div></div></div>",a("#box-all-congressmen").html(d),"function"==typeof c&&c()},buildLoading:function(b,c){""!=c&&void 0!=c||(c="Carregando dados..."),a(b).html('<p class="alert alert-info text-center"><i class="fa fa-2x fa-pulse fa-spin fa-spinner"></i><br>'+c+"</p>")},buildAlertDanger:function(b,c){""!=c&&void 0!=c||(c="Houve um erro inesperado, tente recarregar a página novamente."),a(b).html('<p class="alert alert-danger text-center"><i class="fa fa-2x fa-times-circle"></i><br>'+c+"</p>")},buildAlertWarning:function(b,c){""!=c&&void 0!=c||(c="Houve um erro inesperado, tente recarregar a página novamente."),a(b).html('<p class="alert alert-warning text-center"><i class="fa fa-2x fa-warning"></i><br>'+c+"</p>")},changeStatusWAIARIA:function(){var b=a(window).width();b<768?a("#menu-accessibility").attr("aria-hidden",!0):b>=768&&b<992?a("#menu-accessibility").attr("aria-hidden",!1):b>=992&&b<1200?a("#menu-accessibility").attr("aria-hidden",!1):b>=1200&&a("#menu-accessibility").attr("aria-hidden",!1)}}});