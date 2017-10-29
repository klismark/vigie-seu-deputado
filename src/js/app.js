requirejs.config({
    "baseUrl": "js/modules",
    "paths": {
        "jquery": "../lib/jquery.min",
        "bootstrap": "../lib/bootstrap.min",
        "annyang": "../lib/annyang.min",
        "vue": "../lib/vue.min",
        "firebase": "../lib/firebase",
        "highcharts": "../lib/highcharts",
        "main": "../main"
    },
    shim: {
        "bootstrap": {
            deps: ["jquery"]
        }
    }
});
 
// Chamando módulo principal para iniciar a aplicação
requirejs(["main"]);