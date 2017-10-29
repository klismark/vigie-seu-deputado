define(["jquery","highcharts","bootstrap"],
function ( $ ) {
    var module = {
        buildChartByCategory: function(labels,values,legend){
            Highcharts.chart('chart-by-category', {
                chart: {
                    type: 'bar'
                },
                title: {
                    text: 'Gastos por categoria'
                },
                subtitle: {
                    text: 'Fonte: <a href="http://camara.gov.br">Câmara dos Deputados</a>'
                },
                xAxis: {
                    categories: labels,
                    title: {
                        text: null
                    }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Reais (R$)',
                        align: 'high'
                    },
                    labels: {
                        overflow: 'justify'
                    }
                },
                tooltip: {
                    valueSuffix: ' millions'
                },
                plotOptions: {
                    bar: {
                        dataLabels: {
                            enabled: true
                        }
                    }
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'top',
                    x: -40,
                    y: 80,
                    floating: true,
                    borderWidth: 1,
                    backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
                    shadow: true
                },
                credits: {
                    enabled: false
                },
                series: [ {
                    name: legend,
                    data: values
                }]
            });
        },
        alert:{
            /**
             * 
             * @param {String} box
             * @param {String} msg
             * @returns {undefined}
             */
            buildLoading: function(box,msg){
                if(msg == "" || msg == undefined){
                    msg = "Carregando dados...";
                }
                $(box).html('<p class="alert alert-info text-center"><i class="fa fa-2x fa-pulse fa-spin fa-spinner"></i><br>'+msg+'</p>');
            },
            /**
             * 
             * @param {String} box
             * @param {String} msg
             * @returns {undefined}
             */
            buildAlertDanger: function(box,msg){
                if(msg == "" || msg == undefined){
                    msg = "Houve um erro inesperado, tente recarregar a página novamente.";
                }
                $(box).html('<p class="alert alert-danger text-center"><i class="fa fa-2x fa-times-circle"></i><br>'+msg+'</p>');
            },
            /**
             * 
             * @param {String} box
             * @param {String} msg
             * @returns {undefined}
             */
            buildAlertWarning: function(box,msg){
                if(msg == "" || msg == undefined){
                    msg = "Houve um erro inesperado, tente recarregar a página novamente.";
                }
                $(box).html('<p class="alert alert-warning text-center"><i class="fa fa-2x fa-warning"></i><br>'+msg+'</p>');
            }
        },
        accessibility:{
            /**
             * 
             * @returns {undefined}
             */
            changeStatusWAIARIA: function(){
                var w = $( window ).width();
                
                if(w < 768){//MOBILE
                    $("#menu-accessibility").attr("aria-hidden",true);
                    
                }else if(w >= 768 && w < 992){//TABLET
                    $("#menu-accessibility").attr("aria-hidden",false);
                    
                }else if(w >= 992 && w < 1200){//LARGER
                    $("#menu-accessibility").attr("aria-hidden",false);
                    
                }else if(w >= 1200){//X-LARGER
                    $("#menu-accessibility").attr("aria-hidden",false);
                }
                
            },
            /**
             * 
             * @returns {undefined}
             */
            checkFontSize: function(){
                var fontSize = JSON.parse(localStorage.getItem("fontSize"));
                if(fontSize){
                    $("html").css({"font-size":fontSize+"px"});
                }else{
                    localStorage.setItem("fontSize",JSON.stringify(16));
                }
            },
            /**
             * 
             * @returns {undefined}
             */
            upFontSize: function(){
                var fontSize = JSON.parse(localStorage.getItem("fontSize"));
                if(fontSize < 20){
                    fontSize++;
                    localStorage.setItem("fontSize",JSON.stringify(fontSize));
                    $("html").css({"font-size":fontSize+"px"});
                }
            },
            /**
             * 
             * @returns {undefined}
             */
            lowFontSize: function(){
                var fontSize = JSON.parse(localStorage.getItem("fontSize"));
                if(fontSize > 16){
                    fontSize--;
                    localStorage.setItem("fontSize",JSON.stringify(fontSize));
                    $("html").css({"font-size":fontSize+"px"});
                }
                
            },
            /**
             * 
             * @returns {undefined}
             */
            checkContrast: function(){
                var contrast = JSON.parse(localStorage.getItem("contrast"));
                if(contrast){
                    this.enableContrast();
                }else{
                    this.disableContrast();
                }
            },
            /**
             * 
             * @returns {undefined}
             */
            enableContrast: function(){
                var contrast = JSON.parse(localStorage.getItem("contrast"));
                if(!contrast){
                    localStorage.setItem("contrast",JSON.stringify(true));
                    $("#btn-contrast").html("Baixo Contraste");
                    //Home
                    $(".header-main").css({"background":"#000"});
                }
            },
            /**
             * 
             * @returns {undefined}
             */
            disableContrast: function(){
                var contrast = JSON.parse(localStorage.getItem("contrast"));
                if(contrast){
                    localStorage.setItem("contrast",JSON.stringify(false));
                    $("#btn-contrast").html("Alto Contraste");
                    //Home
                    $(".header-main").removeAttr("style");
                }
                
            }

        },
        /**
         * 
         * @returns {undefined}
         */
        buildHome:function(){
            var request = require('request');
            var Vue = require("vue");  

            var vue = new Vue({
                el: '#data-congressmen',
                data: {
                    search: '',//Texto de pesquisa
                    page:1,//Número da página
                    token: this.token,//Token da sessão do usuário
                    loading:true,//Exibindo alert de carregamento
                    itemsActive:true,//Exibindo transportadoras ativadas
                    scrollPos:0,//Posição do scroll
                    finishList: false,//Flag se a lista foi totalmente carregada
                    limitByPage:50,//Itens por página
                    congressmen: [],//Lista completa de deputados,
                    congressmenFiltered: [],//Lista completa de deputados,
                    total:0
                },
                created:function(){
                    var self = this;
                    request.loadAllCongressmen(
                        function(data){
                            self.congressmen = self.congressmenFiltered = data;
                            self.total = 0;
                            for(var i = 0;i<self.congressmen.length;i++){
                                self.total += parseFloat(self.congressmen[i].despesas.total);
                            }
                            self.loading = false;
                        },
                        function(){
                            self.loading = true;
                    });
                },
                methods:{
                    searchItem:function(item){
                        var textSearch = this.search.trim().toLowerCase();
                        if(item.nomeCivil.toLowerCase().indexOf(textSearch) !== -1 || item.ultimoStatus.nomeEleitoral.toString().toLowerCase().indexOf(textSearch) !== -1){
                            return true;
                        }
                    },
                    filter:function(){ 
                        if(this.congressmen.length == 0){
                            return;
                        }
                        this.loading = true;
                        this.congressmenFiltered = this.congressmen.filter(this.searchItem);
                        
                        if(this.congressmenFiltered.length == 0){
                            this.loading = false;
                            return;
                        }
                        this.loading = false;
                    }
                }
            });
            

        },
        buildCongressman:function(id){
            var request = require('request');
            var Vue = require("vue");  
            
            var vue = new Vue({
                el: '#page-congressman',
                data: {
                    loading:false,
                    total:0,
                    yearOutgoing:2017,
                    monthOutgoing:9,
                    congressman:{
                        id:id,
                        nomeCivil:"",
                        nomeEleitoral:"",
                        siglaPartido:"",
                        siglaUf:"",
                        idLegislatura:"",
                        urlFoto:"",
                        telefone:"",
                        email:"",
                        dataNascimento:"",
                        idade:"",
                        condicaoEleitoral:"",
                        escolaridade:"",
                        municipioNascimento:"",
                        ufNascimento:"",
                        despesas:{
                            2015:{posicao:0,total:0},
                            2016:{posicao:0,total:0},
                            2017:{posicao:0,total:0},
                            posicaoMandato55:0,
                            total:0
                        }
                    },
                    outgoing:[]
                },
                beforeCreate:function(){
                    var self = this;
                    request.loadCongressmanDetails(
                        id,
                        function(data){

                            var birthday = new Date(data.dataNascimento);
                            var today = new Date();
                            var oldYear = Math.floor((((((today.getTime() - birthday.getTime())/1000)/60)/60)/24)/365);
                            
                            self.congressman.id = data.id;
                            self.congressman.nomeCivil = data.nomeCivil;
                            self.congressman.nomeEleitoral = data.ultimoStatus.nomeEleitoral;
                            self.congressman.siglaPartido = data.ultimoStatus.siglaPartido;
                            self.congressman.siglaUf = data.ultimoStatus.siglaUf;
                            self.congressman.idLegislatura = data.ultimoStatus.idLegislatura;
                            self.congressman.urlFoto = data.ultimoStatus.urlFoto;
                            self.congressman.telefone = data.ultimoStatus.gabinete.telefone;
                            self.congressman.email = data.ultimoStatus.gabinete.email;
                            self.congressman.condicaoEleitoral = data.ultimoStatus.condicaoEleitoral;
                            self.congressman.dataNascimento = data.dataNascimento.split("-").reverse().join("/");
                            self.congressman.idade = oldYear;
                            self.congressman.escolaridade = data.escolaridade;
                            self.congressman.municipioNascimento = data.municipioNascimento;
                            self.congressman.ufNascimento = data.ufNascimento;
                            self.congressman.despesas = data.despesas;

                            document.title = data.ultimoStatus.nomeEleitoral+" | Vigie Seu Deputado";
                            self.buildSelectDate();
                            var d = new Date();
                            self.yearOutgoing = d.getFullYear();
                            self.monthOutgoing = d.getMonth()+1;
                            self.loadOutgoing();
                        },
                        function(){
                            self.loading = true;
                        },
                        function(error){
                            console.log(error);
                        }
                    );
                },
                methods:{
                    loadOutgoing:function(){
                        var self = this;
                        request.loadCongressmanOutgoing(
                            id,
                            {
                                mes:self.monthOutgoing,
                                ano:self.yearOutgoing
                            },
                            function(data){
                                self.total = 0;
                                self.outgoing = [];
                                if(data.length == 0){
                                    self.loading = false;
                                    return;
                                }
                                var out = {
                                    tipoDespesa:data[0].tipoDespesa,
                                    expenses:[]
                                };
                                var j = 0;
                                var typeExpense = [data[0].tipoDespesa];
                                var totalExpenses = [0];
                                
                                for(var i = 0,max = data.length;i<max;i++){
                                    self.total += (parseFloat(data[i].valorDocumento) - parseFloat(data[i].valorGlosa));
                                    if(data[i].tipoDespesa == out.tipoDespesa){
                                        out.expenses.push(data[i]);
                                    }else{
                                        self.outgoing.push(out);
                                        out = {
                                            tipoDespesa:data[i].tipoDespesa,
                                            expenses:[data[i]]
                                        };
                                        j++;
                                        typeExpense.push(data[i].tipoDespesa);
                                        totalExpenses.push(0);
                                    }
                                    totalExpenses[j] += (parseFloat(data[i].valorDocumento) - parseFloat(data[i].valorGlosa));
                                }
                                self.outgoing.push(out);
                                self.loading = false;
                                setTimeout(function(){
                                    self.buildChartByCategory(typeExpense,totalExpenses);
                                },1000)
                            },
                            function(){
                                self.loading = true;
                            },
                            function(error){
                                console.log(error);
                            }
                        );
                    },
                    buildChartByCategory:function(labels,values){
                        Highcharts.chart('chart-by-category', {
                            chart: {
                                type: 'bar'
                            },
                            title: {
                                text: 'Gastos por categoria'
                            },
                            subtitle: {
                                text: 'Fonte: <a href="http://camara.gov.br">Câmara dos Deputados</a>'
                            },
                            xAxis: {
                                categories: labels,
                                title: {
                                    text: null
                                }
                            },
                            yAxis: {
                                min: 0,
                                title: {
                                    text: 'Reais (R$)',
                                    align: 'high'
                                },
                                labels: {
                                    overflow: 'justify'
                                }
                            },
                            tooltip: {
                                enabled:false
                            },
                            plotOptions: {
                                bar: {
                                    dataLabels: {
                                        enabled: true,
                                        formatter: function () {
                                            return parseFloat(this.y.toFixed(2)).toLocaleString("pt-BR", {style: "currency",currency: "BRL"});
                                        }
                                    }
                                }
                            },
                            legend: {
                                layout: 'vertical',
                                align: 'right',
                                verticalAlign: 'top',
                                x: 0,
                                y: 40,
                                floating: true,
                                borderWidth: 1,
                                backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
                                shadow: true
                            },
                            credits: {
                                enabled: false
                            },
                            series: [ {
                                name: $("#select-month option:selected").html(),
                                data: values
                            }]
                        });
                    },
                    selectMonth:function(){
                        var dt = $("#select-month option:selected").val().split("/");
                        this.monthOutgoing = dt[0];
                        this.yearOutgoing = dt[1];
                        this.loadOutgoing();
                    },
                    buildSelectDate:function(){
                        var d = new Date();
                        var i = 1;
                        var options = [];
                        var values = [];
                        var year = 2015;
                        var select = '';
                        while(i<=12){
                            values.push(i+"/"+year);
                            v = this.formatMonth(i-1)+"/"+year;
                            if(d.getMonth() == (i-1) && d.getFullYear() == year){
                                select += '<option selected value="'+(i+"/"+year)+'">'+v+'</option>';
                                break;
                            }else{
                                select += '<option value="'+(i+"/"+year)+'">'+v+'</option>'; 
                            }
                            if(i==12){
                                year++;
                                i = 0;
                            }
                            i++;
                        }
                        $("#select-month").html(select);
                    },
                    formatMoney:function(money){
                        return money.toLocaleString('pt-BR', {style: 'currency',currency: 'BRL'})
                    },
                    formatMonth:function(number){
                        if(typeof number == "undefined"){
                            var dt = $("#select-month option:selected").val().split("/");
                            number = dt[0]-1;
                        }
                        switch (number) {
                            case 0:
                                return "Janeiro";
                            case 1:
                                return "Fevereiro";
                            case 2:
                                return "Março";
                            case 3:
                                return "Abril";
                            case 4:
                                return "Maio";
                            case 5:
                                return "Junho";
                            case 6:
                                return "Julho";
                            case 7:
                                return "Agosto";
                            case 8:
                                return "Setembro";
                            case 9:
                                return "Outubro";
                            case 10:
                                return "Novembro";
                            default:
                                return "Dezembro";
                        }
                    }
                }
            });
        }
    };
    return module;
});