define(["jquery"],
function ( $ ) {
    return {
        /**
         * 
         * @param {[congressman]} congressmen
         * @param {function} callback
         * @returns {undefined}
         */
        buildListAllCongressmen: function(congressmen,callback){
            if(congressmen.length == 0){
                this.buildAlertWarning("#box-all-congressmen","Nenhum deputado encontrado.");
                return;
            }
            var html = '<div class="panel panel-default"><div class="panel-body"><div class="row">';
            for(var i = 0,max = congressmen.length;i<max;i++){
                html += '<div class="col-lg-4 col-md-6 col-sm-6" id="congressmen-'+congressmen[i].id+'">';
                html += '<div class="thumbnail" itemscope itemtype="http://schema.org/Person">';
                html += '<img src="'+congressmen[i].photo+'" class="photo-list-congressmen" alt="Foto do deputado '+congressmen[i].name+'">';
                html += '<div class="caption info-list-congressmen">';
                html += '<h3 itemprop="name">'+congressmen[i].name+'</h3>';
                html += '<p class="text-info-list-congressmen">';
                html += '<span itemprop="affiliation"><i  aria-hidden="true" class="fa fa-flag"></i> '+congressmen[i].party+' - '+congressmen[i].uf+'</span><br>';
                html += '<span itemprop="email"><i  aria-hidden="true" class="fa fa-envelope-o"></i> '+congressmen[i].email+'</span>';
                html += '</p>';
                html += '<a href="deputado/'+congressmen[i].reference+'" itemprop="url" class="btn-view-congressman btn btn-small btn-success" ><i class="fa fa-info-circle" aria-hidden="true"></i> Ver Detalhes</a>';
                html += '</div>';
                html += '</div>';
                html += '</div>';
            }
            html += '</div></div></div>';
            $("#box-all-congressmen").html(html);
            if(typeof callback === "function"){
                callback();    
            }
        },
        /**
         * 
         * @param {String} box
         * @param {String} msg
         * @returns {undefined}
         */
        buildLoading: function(box,msg){
            if(msg == "" || msg == undefined){
                msg = "Carregando dados...";
            }
            $(box).html('<p class="alert alert-info text-center"><i class="fa fa-2x fa-pulse fa-spin fa-spinner"></i><br>'+msg+'</p>');
        },
        /**
         * 
         * @param {String} box
         * @param {String} msg
         * @returns {undefined}
         */
        buildAlertDanger: function(box,msg){
            if(msg == "" || msg == undefined){
                msg = "Houve um erro inesperado, tente recarregar a página novamente.";
            }
            $(box).html('<p class="alert alert-danger text-center"><i class="fa fa-2x fa-times-circle"></i><br>'+msg+'</p>');
        },
        /**
         * 
         * @param {String} box
         * @param {String} msg
         * @returns {undefined}
         */
        buildAlertWarning: function(box,msg){
            if(msg == "" || msg == undefined){
                msg = "Houve um erro inesperado, tente recarregar a página novamente.";
            }
            $(box).html('<p class="alert alert-warning text-center"><i class="fa fa-2x fa-warning"></i><br>'+msg+'</p>');
        },
        /**
         * 
         * @returns {undefined}
         */
        changeStatusWAIARIA: function(){
            var w = $( window ).width();
            
            if(w < 768){//MOBILE
                $("#menu-accessibility").attr("aria-hidden",true);
                
            }else if(w >= 768 && w < 992){//TABLET
                $("#menu-accessibility").attr("aria-hidden",false);
                
            }else if(w >= 992 && w < 1200){//LARGER
                $("#menu-accessibility").attr("aria-hidden",false);
                
            }else if(w >= 1200){//X-LARGER
                $("#menu-accessibility").attr("aria-hidden",false);
            }
            
        }
    };
});