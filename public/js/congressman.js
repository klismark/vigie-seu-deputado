define(["jquery","actions","request","view"],function(){var a=require("actions"),b=require("view");b.changeStatusWAIARIA(),a.configAnnyangHome(),a.verifySpeechRecognition(),b.checkFontSize(),b.checkContrast(),$("#btn-speech-recognition").click(a.changeStatusSpeechRecognition),$("#btn-contrast").click(a.changeStatusContrast),$("#btn-up-font").click(b.upFontSize),$("#btn-low-font").click(b.lowFontSize),b.buildCharts()});