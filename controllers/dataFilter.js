module.exports = function (app) {
    var request = require('request');
    var filterController = {
        getListDeputados: function (req, res) {
            request('http://www.camara.leg.br/SitCamaraWS/Deputados.asmx/ObterDeputados', function (error, response, body) {     
                if(error){
                    return res.sendStatus(230);
                }
                if(response.statusCode == 200){//Se a requisição foi tudo bem
                    //Faz o parse dos dados XML para JSON
                    var parseString = require('xml2js').parseString;
                    parseString(body, function (err, result) {
                        if(err){
                            return res.sendStatus(231);//Erro no parse dos dados
                        }
                        if(!filterDataListDeputados(result)){
                            return res.sendStatus(231);//Erro no parse dos dados
                        }
                    });
                }

            });

            //Organiza o JSON para a leitura do site.
            function filterDataListDeputados(data){
                var deputados = [];
                if(data.hasOwnProperty("deputados")){
                    if(data.deputados.hasOwnProperty("deputado")){
                        var list = data.deputados.deputado;
                        for(var i = 0,max = list.length;i<max;i++){
                            var dept = {
                                ide: list[i].ideCadastro[0],
                                idParlamentar: list[i].idParlamentar[0],
                                condition: list[i].condicao[0],
                                photo: list[i].urlFoto[0],
                                name:list[i].nome[0],
                                parliamentaryName: list[i].nomeParlamentar[0],
                                party: list[i].partido[0],
                                uf: list[i].uf[0],
                                phone: list[i].fone[0]
                            }
                            deputados.push(dept);
                        }
                        return res.json(deputados);
                    }
                }
                return false;
            }
        }
    };
    return filterController;
}