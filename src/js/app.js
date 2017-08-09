requirejs.config({
    "baseUrl": "js/modules",
    "paths": {
        "jquery": "../lib/jquery.min",
        "bootstrap": "../lib/bootstrap.min",
        "annyang": "../lib/annyang.min",
        "chartjs": "../lib/Chart.min",
        "main": "../main"
    }
});
 
// Chamando módulo principal para iniciar a aplicação
requirejs(["main"]);