module.exports = function (app) {
    let request = require('request');
    let filterController = {
        getCongressmen: function (req, res) {
            request('http://www.camara.leg.br/SitCamaraWS/Deputados.asmx/ObterDeputados', function (error, response, body) {     
                if(error){
                    return res.sendStatus(230);
                }
                if(response.statusCode == 200){//Se a requisição foi tudo bem
                    //Faz o parse dos dados XML para JSON
                    let parseString = require('xml2js').parseString;
                    parseString(body, function (err, result) {
                        if(err){
                            return res.sendStatus(231);//Erro no parse dos dados
                        }
                        if(!filterDataListCongressmen(result)){
                            return res.sendStatus(231);//Erro no parse dos dados
                        }
                    });
                }
            });

            //Organiza o JSON para a leitura do site.
            function filterDataListCongressmen(data){
                var congressmen = [];
                if(data.hasOwnProperty("deputados")){
                    if(data.deputados.hasOwnProperty("deputado")){
                        var list = data.deputados.deputado;
                        for(var i = 0,max = list.length;i<max;i++){
                            var dept = {
                                ide: list[i].ideCadastro[0],
                                idParlamentar: list[i].idParlamentar[0],
                                condition: list[i].condicao[0],
                                photo: list[i].urlFoto[0],
                                parliamentaryName: list[i].nomeParlamentar[0],
                                party: list[i].partido[0],
                                uf: list[i].uf[0],
                                phone: list[i].fone[0]
                            }
                            congressmen.push(dept);
                        }
                        let util = app.controllers.util;
                        congressmen.sort(function(a,b){
                            
                           if(util.removeAccents(a.parliamentaryName.toLowerCase()) < util.removeAccents(b.parliamentaryName.toLowerCase())){
                               return -1;
                           }else{
                                return 1;
                           }
                        });

                        return res.json(congressmen);
                    }
                }
                return false;
            }
        },
        getParties: function (req, res) {
            request('http://www.camara.leg.br/SitCamaraWS/Deputados.asmx/ObterPartidosCD', function (error, response, body) {     
                if(error){
                    return res.sendStatus(230);
                }
                if(response.statusCode == 200){//Se a requisição foi tudo bem
                    //Faz o parse dos dados XML para JSON
                    let parseString = require('xml2js').parseString;
                    parseString(body, function (err, result) {
                        if(err){
                            return res.sendStatus(231);//Erro no parse dos dados
                        }
                        if(!filterDataListParties(result)){
                            return res.sendStatus(231);//Erro no parse dos dados
                        }
                    });
                }
            });

            //Organiza o JSON para a leitura do site.
            function filterDataListParties(data){
                var parties = [];
                if(data.hasOwnProperty("partidos")){
                    if(data.partidos.hasOwnProperty("partido")){
                        var list = data.partidos.partido;
                        
                        for(var i = 0,max = list.length;i<max;i++){
                            if(list[i].dataExtincao[0].length == 10){
                                continue;
                            }
                            var party = {
                                acronym: list[i].siglaPartido[0],
                                name: list[i].nomePartido[0]
                            }
                            parties.push(party);
                        }
                        let util = app.controllers.util;
                        parties.sort(function(a,b){    
                           if(util.removeAccents(a.acronym.toLowerCase()) < util.removeAccents(b.acronym.toLowerCase())){
                               return -1;
                           }else{
                                return 1;
                           }
                        });
                        return res.json(parties);
                    }
                }
                return false;
            }
        }
    };
    return filterController;
}