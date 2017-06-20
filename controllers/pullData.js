module.exports = function(app){
    var request = require('request');
    var http = require('http');
    var pull = {
        /**
        * Remove todos os acentos e "ç" do texto fornecido.
        * 
        * @example 
        *   removeAccents("éíçá"); // eica
        * 
        * @param   {String} text Texto a ser retirado os acentos.
        * @returns {String} Retorna uma stringa sem acentos ou "ç".
        */
        getAttendance: function (req, res) {
            var url = "http://www.camara.leg.br/cotas/Ano-2017.json.zip";
            http.get(url, function(res){
                var data = "";
                res.on('data', function (chunk){
                    data += chunk;			
                });
                res.on("end", function(){			
                    console.log(data);
                });
            }).on("error", function(){        
                   console.log("Erro");
            });
            
            //http://www.camara.leg.br/cotas/Ano-2017.json.zip
            
            request(url, function (error, response, body) {     
                if(error){
                    console.log(error);
                    return res.sendStatus(230);
                }
                console.log(body);
                return res.json({});
            });
        },
        /**
        * Remove todos os acentos e "ç" do texto fornecido.
        * 
        * @example 
        *   removeAccents("éíçá"); // eica
        * 
        * @param   {String} text Texto a ser retirado os acentos.
        * @returns {String} Retorna uma stringa sem acentos ou "ç".
        */
        getQuota: function (req, res) {
            var urlFile = "http://www.camara.leg.br/cotas/Ano-2017.json.zip";
            //var urlFile = "http://allsimple.com.br/deputados/Ano-2017.json.zip";
            var AdmZip = require('adm-zip');
            var fs = require('fs');
            var url = require('url');

            var options = {
                host: url.parse(urlFile).host,
                port: 80,
                path: url.parse(urlFile).pathname
            };

            http.get(options, function(res) {
                var data = [], dataLen = 0; 

                res.on('data', function(chunk) {
                        data.push(chunk);
                        dataLen += chunk.length;
                    }).on('end', function() {
                        var buf = new Buffer(dataLen);
                        for (var i=0, len = data.length, pos = 0; i < len; i++) { 
                            data[i].copy(buf, pos); 
                            pos += data[i].length; 
                        } 
                        var zip = new AdmZip(buf);
                        var zipEntries = zip.getEntries();
                        zipEntries.forEach(function(zipEntry) {
                            //console.log(zipEntry.toString()); // outputs zip entries information 
                            if (zipEntry.entryName === "Ano-2017.json") {
                                console.log(zip.readAsText(zipEntry));
                                return;
                            }
                        });
                        
                        
                    });
            }).on("error", function(){        
                   console.log("Erro");
            });
        }
    }
    return pull;
}