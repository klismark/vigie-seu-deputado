define(["jquery"],
function ( $ ) {
    return {
        /**
         * 
         * @param {DOMElement} $box
         * @param {[congressman]} congressmen
         * @param {function} callback
         * @returns {undefined}
         */
        listAllCongressmen: function($box,congressmen,callback){
            var html = '<ul class="list-group" id="list-all-congressmen">';
            for(var i = 0,max = congressmen.length;i<max;i++){
                html += '<li class="list-group-item"  data-party="'+congressmen[i].party+'" data-uf="'+congressmen[i].uf+'">';
                html += '<img src="'+congressmen[i].photo+'" alt="Foto do(a) parlamentar '+congressmen[i].parliamentaryName+'" width="114" height="152" class="photo-item-list pull-left"/>';
                html += '<div class="info-item-deputado">';
                html += '<h3 class="list-group-item-heading">'+congressmen[i].parliamentaryName+'</h3>';
                html += '<dl>';
                html += '<dt><i class="fa fa-flag" aria-hidden="true"></i> Partido:</dt>';
                html += '<dd> '+congressmen[i].party+' - '+congressmen[i].uf+'</dd>';
                html += '<dt><i class="fa fa-phone" aria-hidden="true"></i> Telefone:</dt>';
                html += '<dd> '+congressmen[i].phone+'</dd>';
                html += '</dl>';
                html += '<button class="btn-view-details-deputado btn btn-sm btn-primary pull-right"><i class="fa fa-info-circle" aria-hidden="true"></i> Ver Detalhes</button>';
                html += '</div>';
                html += '</li>';

            }
            html += '</ul>';
            $box.html(html);
            if(typeof callback === "function"){
                callback();    
            }
        },
        /**
         * 
         * @param {String} classBox
         * @param {[Party]} parties
         * @param {function} callback
         * @returns {undefined}
         */
        buildComboParties: function(classBox,parties,callback){
            var html = '<option value="0">Todos</option>';
            for(var i = 0,max = parties.length;i<max;i++){
                html += '<option value="'+parties[i].acronym+'">'+parties[i].acronym+'</option>';      
            }
            $(classBox).html(html);   
            if(typeof callback === "function"){
                callback();    
            }
        }
    };
});