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
        },
        /**
         * 
         * @param {DOMElement} $box
         * @param {String} msg
         * @returns {undefined}
         */
        showAlertDanger: function($box,msg){
            $box.html('<p class="alert alert-danger text-center"><i class="fa fa-2x fa-warning"></i><br>'+msg+'</p>');
        },
        /**
         * 
         * @returns {undefined}
         */
        changeStatusWAIARIA: function(){
            var w = $( window ).width();
            
            if(w < 768){//MOBILE
                $("#menu-accessibility").attr("aria-haspopup",true);
                $("#btn-open-accessibility").attr("aria-expanded",true);
                $(".item-menu-accessibility").attr("aria-expanded",false);
                
            }else if(w >= 768 && w < 992){//TABLET
                $("#menu-accessibility").attr("aria-haspopup",false);
                $("#btn-open-accessibility").attr("aria-expanded",false);
                $(".item-menu-accessibility").attr("aria-expanded",true);
                
            }else if(w >= 992 && w < 1200){//LARGER
                $("#menu-accessibility").attr("aria-haspopup",false);
                $("#btn-open-accessibility").attr("aria-expanded",false);
                $(".item-menu-accessibility").attr("aria-expanded",true);
                
            }else if(w >= 1200){//X-LARGER
                $("#menu-accessibility").attr("aria-haspopup",false);
                $("#btn-open-accessibility").attr("aria-expanded",false);
                $(".item-menu-accessibility").attr("aria-expanded",true);
            }
            
        }
    };
});