module.exports = function (app) {
    var Schema = require('mongoose').Schema;
    
    var congressman = Schema({
        ide: {type: Number, required: true, index: {unique: true}},//IDE do cadastro do deputado
        codeBudget: {type: Number, required: true, index: {unique: true}},//Código do orçamento
        condition: {type: String, required: true},//Titular ou Suplente
        enrollment: {type: Number, required: true, index: {unique: true}},//Número de matrícula
        ideParlamentary: {type: Number, required: true, index: {unique: true}},//IDE Parlamentar
        name: {type: String, required: true},//Nome verdadeiro do deputado
        nameParlamentar: {type: String, required: true},//Nome Parlamentar
        urlPhoto: {type: String, required: true},//URL da foto
        gender: {type: String, required: true},//Sexo
        uf: {type: String, required: true},//URL da foto
        party: {type: String, required: true},//Partido
        cabinet: {type: String, required: true},//Número do Gabinete
        outbuilding: {type: String, required: true},//Anexo
        phone: {type: String, required: true},//Telefone
        email: {type: String, required: true, index: {unique: true}},//Email
    });
    
    return db.model('congressmen', congressman);
}