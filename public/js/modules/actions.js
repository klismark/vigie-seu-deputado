define(["jquery","request","main","annyang"],function(){return{changeStatusSpeechRecognition:function(){if(annyang){JSON.parse(localStorage.getItem("speechRecognition"))?(console.log("Comando de voz desativado"),annyang.abort(),localStorage.setItem("speechRecognition",JSON.stringify(!1)),$(".box-status-speech-recognition").removeClass("active"),$("#btn-speech-recognition").html("1 - Ativar comando de voz")):(console.log("Comando de voz ativo"),annyang.start(),localStorage.setItem("speechRecognition",JSON.stringify(!0)),$(".box-status-speech-recognition").addClass("active"),$("#btn-speech-recognition").html("1 - Desativar comando de voz"))}else console.log("Comando de voz desativado (annyang desativado)"),localStorage.setItem("speechRecognition",JSON.stringify(!1)),$(".box-status-speech-recognition").removeClass("active"),$("#btn-speech-recognition").html("1 - Ativar comando de voz")},verifySpeechRecognition:function(){if(annyang){JSON.parse(localStorage.getItem("speechRecognition"))?(console.log("Comando de voz ativo"),annyang.start(),localStorage.setItem("speechRecognition",JSON.stringify(!0)),$(".box-status-speech-recognition").addClass("active"),$("#btn-speech-recognition").html("1 - Desativar comando de voz")):(console.log("Comando de voz desativado"),annyang.abort(),localStorage.setItem("speechRecognition",JSON.stringify(!1)),$(".box-status-speech-recognition").removeClass("active"),$("#btn-speech-recognition").html("1 - Ativar comando de voz"))}else $("#btn-speech-recognition").hide()},configAnnyangHome:function(){if(annyang){console.log("ok"),annyang.setLanguage("pt-BR");var a=require("view"),b={"ir para *tag":this.goingTo,"pesquisar *congressman":this.searchVoiceCongressmen,"encontre *congressman":this.searchVoiceCongressmen,"detalhar *congressman":this.searchVoiceCongressmen,"encontrar *congressman":this.searchVoiceCongressmen,"encontrar todos os deputados":this.searchVoiceCongressmen,"mostrar todos os deputados":this.searchVoiceCongressmen,"exibir todos os deputados":this.searchVoiceCongressmen,"desativar comando de voz":this.changeStatusSpeechRecognition,"aumentar letra":a.upFontSize,"diminuir letra":a.lowFontSize,"aumentar fonte":a.upFontSize,"diminuir fonte":a.lowFontSize,"aumentar tamanho da fonte":a.upFontSize,"diminuir tamanho da fonte":a.lowFontSize,"aumentar tamanho da letra":a.upFontSize,"diminuir tamanho da letra":a.lowFontSize,"aumentar contraste":a.enableContrast,"diminuir contraste":a.disableContrast,"baixar contraste":a.disableContrast,"alto contraste":a.enableContrast,"baixo contraste":a.disableContrast};annyang.addCommands(b)}},goingTo:function(a){console.log(a),"conteúdo"==a?location.href="#conteudo":"busca"==a&&(location.href="#busca")},searchVoiceCongressmen:function(a){console.log(a),location.href="#busca",$("#text-search").val(a),require("actions").filterCongressmen()},changeStatusContrast:function(){var a=JSON.parse(localStorage.getItem("contrast")),b=require("view");a?b.disableContrast():b.enableContrast()}}});