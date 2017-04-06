/**MENU DE ACESSIBILIDADE*/
$("#btn-open-accessibility").click(function(){
    $(".menu-accessibility").animate({
        "top":0
    });
    $(this).hide();
    $(this).attr("aria-hidden",true);
});
$("#btn-close-accessibility").click(function(){
    $(".menu-accessibility").animate({
        "top":"-100%"
    });
    $("#btn-open-accessibility").show();
    $("#btn-open-accessibility").attr("aria-hidden",false);
});

/*BOTÃO DO MICROFONE*/
var microActive = false;
$("#btn-microphone").click(function(){
    if(microActive){
        if(annyang){
            annyang.abort();
        }
        $(this).removeClass("active");
    }else{
        if (annyang) {
            var srch = function(search){
                $("#field-search-home").val(search);
            }
            var commands = {
            'procurar por *search':      srch,
            'buscar por *search':      srch,
            'procurar *search':      srch,
            'buscar *search':      srch,
            'encontrar *search':      srch,
            '*search':      srch,
            };

            annyang.debug();
            annyang.addCommands(commands);
            annyang.setLanguage('pt-BR');
            annyang.start();
        }else{
            $(".icon-microphone").hide();
        }
        $(this).addClass("active");
    }
    microActive = !microActive;
});

var partidos = [];

$(document).ready(function(){
    getPartidos(printListPartidos);
});
$("#link-all-deputados").click(getDeputados);




/**
 * 
 * @param {type} $box
 * @param {type} deputados
 * @returns {undefined}
 */
function printListPartidos(partidos){
    var html = '<option value="0">Todos</option>';
    for(var i = 0,max = partidos.length;i<max;i++){
        html += '<option value="'+partidos[i].acronym+'">'+partidos[i].acronym+'</option>';      
    }
    $(".select-party").html(html);
    $('#modal-loading').modal("hide");
}


/**
 * 
 * @param {type} $box
 * @param {type} deputados
 * @returns {undefined}
 */
function printListDeputados($box,deputados){
    var html = '<ul class="list-group">';
    for(var i = 0,max = deputados.length;i<max;i++){
        html += '<li class="list-group-item">';
        html += '<img src="'+deputados[i].photo+'" alt="Foto do(a) parlamentar '+deputados[i].parliamentaryName+'" width="114" height="152" class="photo-item-list pull-left"/>';
        html += '<div class="info-item-deputado">';
        html += '<h3 class="list-group-item-heading">'+deputados[i].parliamentaryName+'</h3>';
        html += '<dl>';
        html += '<dt><i class="fa fa-flag" aria-hidden="true"></i> Partido:</dt>';
        html += '<dd> '+deputados[i].party+' - '+deputados[i].uf+'</dd>';
        html += '<dt><i class="fa fa-phone" aria-hidden="true"></i> Telefone:</dt>';
        html += '<dd> '+deputados[i].phone+'</dd>';
        html += '</dl>';
        html += '<button class="btn-view-details-deputado btn btn-sm btn-primary pull-right"><i class="fa fa-info-circle" aria-hidden="true"></i> Ver Detalhes</button>';
        html += '</div>';
        html += '</li>';
        
    }
    html += '</ul>';
    $box.html(html);
    $(".box-filter-all-deputados").show();
}

/**
 * 
 * @param {type} callback
 * @returns {undefined}
 */
function getPartidos(callback){
    var $box = $("#content-loading");
    $('#modal-loading').modal({backdrop: 'static', keyboard: false});
    $box.addClass("alert alert-info");
    $box.html('<i class="fa fa-2x fa-spin fa-soccer-ball-o"></i><br> carregando...');
    
    $.ajax({
        url: "getPartidos",
        dataType: 'json',
        type: 'GET',
        beforeSend: function () {
            $box.removeClass("alert-success alert-warning alert-danger");
            $box.addClass("alert alert-info text-center");
            $box.html('<i class="fa fa-2x fa-spin fa-pulse fa-spinner"></i><br> carregando...');
        },
        success: function (data, textStatus){
            $box.removeAttr("class");
            callback(data);
        },
        error: function (xhr, er) {
            $box.removeClass("alert-success alert-warning alert-info");
            $box.addClass("alert alert-danger text-center");
            $box.html('<i class="fa fa-2x fa-warning"></i><br>Erro desconhecido, tente novamente.<br><button type="button" class="btn btn-primary" data-dismiss="modal">OK</button>');
        }
    });
}

/**
 * 
 * @returns {undefined}
 */
function getDeputados(){
    $('#modal-list-deputados').modal('show');
    var $box = $("#content-list-deputados");
    $(".box-filter-all-deputados").hide();
    $.ajax({
        url: "getDeputados",
        dataType: 'json',
        type: 'GET',
        beforeSend: function () {
            $box.removeClass("alert-success alert-warning alert-danger");
            $box.addClass("alert alert-info text-center");
            $box.html('<i class="fa fa-2x fa-spin fa-pulse fa-spinner"></i><br> carregando...');
        },
        success: function (data, textStatus){
            $box.removeAttr("class");
            console.log(data);
            printListDeputados($box,data);
        },
        error: function (xhr, er) {
            $box.removeClass("alert-success alert-warning alert-info");
            $box.addClass("alert alert-danger text-center");
            $box.html('<i class="fa fa-2x fa-warning"></i><br>Erro desconhecido, tente novamente.<br><button type="button" class="btn btn-primary" data-dismiss="modal">OK</button>');
        }
    });
}