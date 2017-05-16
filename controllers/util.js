module.exports = function(app){
    var util = {
        /**
        * Remove todos os acentos e "ç" do texto fornecido.
        * 
        * @example 
        *   removeAccents("éíçá"); // eica
        * 
        * @param   {String} text Texto a ser retirado os acentos.
        * @returns {String} Retorna uma stringa sem acentos ou "ç".
        */
        removeAccents: function (text) {
            var string = text;//.replace('/','');
            var mapAccentsHex = {
                a: /[\xE0-\xE6]/g,
                e: /[\xE8-\xEB]/g,
                i: /[\xEC-\xEF]/g,
                o: /[\xF2-\xF6]/g,
                u: /[\xF9-\xFC]/g,
                c: /\xE7/g,
                n: /\xF1/g
            };

            for (var letter in mapAccentsHex) {
                var er = mapAccentsHex[letter];
                string = string.replace(er, letter);
            }

            return string;
        }
    }
    return util;
}