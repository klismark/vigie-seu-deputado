define(["jquery"],
function ( $ ) {
    return {
        /**
         * 
         * @param {DOMElement} $box
         * @param {[HTML]} data
         * @param {function} callback
         * @returns {undefined}
         */
        listAllCongressmen: function($box,data,callback){
            $box.html(data);
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
                html += '<option value="'+parties[i].sigla+'">'+parties[i].sigla+'</option>';      
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