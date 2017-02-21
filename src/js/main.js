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

/*
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
}*/