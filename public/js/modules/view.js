define(["jquery"],function(a){return{listAllCongressmen:function(a,b,c){for(var d='<ul class="list-group">',e=0,f=b.length;e<f;e++)d+='<li class="list-group-item">',d+='<img src="'+b[e].photo+'" alt="Foto do(a) parlamentar '+b[e].parliamentaryName+'" width="114" height="152" class="photo-item-list pull-left"/>',d+='<div class="info-item-deputado">',d+='<h3 class="list-group-item-heading">'+b[e].parliamentaryName+"</h3>",d+="<dl>",d+='<dt><i class="fa fa-flag" aria-hidden="true"></i> Partido:</dt>',d+="<dd> "+b[e].party+" - "+b[e].uf+"</dd>",d+='<dt><i class="fa fa-phone" aria-hidden="true"></i> Telefone:</dt>',d+="<dd> "+b[e].phone+"</dd>",d+="</dl>",d+='<button class="btn-view-details-deputado btn btn-sm btn-primary pull-right"><i class="fa fa-info-circle" aria-hidden="true"></i> Ver Detalhes</button>',d+="</div>",d+="</li>";d+="</ul>",a.html(d),"function"==typeof c&&c()},buildComboParties:function(b,c,d){for(var e='<option value="0">Todos</option>',f=0,g=c.length;f<g;f++)e+='<option value="'+c[f].acronym+'">'+c[f].acronym+"</option>";a(b).html(e),"function"==typeof d&&d()}}});