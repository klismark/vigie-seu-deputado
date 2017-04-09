requirejs.config({
    "baseUrl": "js/modules",
    "paths": {
        "annyang": "../lib/annyang.min",
        "jquery": "../lib/jquery.min",
        "bootstrap": "../lib/bootstrap.min",
        "main": "../main"
    }
});
 
// Chamando módulo principal para iniciar a aplicação
requirejs(["main"]);