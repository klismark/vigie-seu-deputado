define(["jquery","chartjs","bootstrap"],
function ( $ ) {
    var module = {
        buildCharts: function(){
            $('#tabs-congressman a').click(function (e) {
                e.preventDefault()
                $(this).tab('show');
            });

            //Gráfico principal
            var lbls = ["Março/2017", "Abril/2017", "Maio/2017", "Junho/2017", "Julho/2017", "Agosto/2017"];
            var vals = [900.00, 20000.00, 3000.00, 5000.00, 25476.00, 35432.90];
            this.buildChartMain(lbls,vals);

            //Gastos por categoria
            var lbls = ["Material de esctiório", "Serviços Postais", "Telefonia", "Combustíveis", "Passagens Aéreas", "Divulgação"];
            var vals = [900.00, 20000.00, 3000.00, 5000.00, 25476.00, 35432.90];
            this.buildChartByCategory(lbls,vals);
        },
        buildChartMain: function(labels,values){
            var ctx = document.getElementById("chart-main");
            var myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Gastos da cota parlamentar nos últimos 6 meses',
                        data: values,
                        backgroundColor: [
                            'rgba(75, 192, 192, 0.3)'
                        ],
                        borderColor: [
                            'rgba(75, 192, 192, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    legend: {
                        display: false
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero:true,
                                callback: function(value, index, values) {
                                    return value.toLocaleString("pt-BR",{style:"currency", currency:"BRL"});
                                }
                            }
                        }]
                    },
                    tooltips: {
                        callbacks: {
                            title: function() {
                                return '';
                            },
                            label: function(tooltipItem, data) {
                                var dataLabel = data.labels[tooltipItem.index];
                                var value = parseFloat(data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]);

                                return dataLabel+ " : " + value.toLocaleString("pt-BR",{style:"currency", currency:"BRL"});
                            }
                        }
                    }
                }
            });
        },
        buildChartByCategory: function(labels,values){
            Chart.pluginService.register({
                beforeRender: function (chart) {
                    if (chart.config.options.showAllTooltips) {
                        // create an array of tooltips
                        // we can't use the chart tooltip because there is only one tooltip per chart
                        chart.pluginTooltips = [];
                        chart.config.data.datasets.forEach(function (dataset, i) {
                            chart.getDatasetMeta(i).data.forEach(function (sector, j) {
                                chart.pluginTooltips.push(new Chart.Tooltip({
                                    _chart: chart.chart,
                                    _chartInstance: chart,
                                    _data: chart.data,
                                    _options: chart.options,
                                    _active: [sector]
                                }, chart));
                            });
                        });

                        // turn off normal tooltips
                        chart.options.tooltips.enabled = false;
                    }
                },
                afterDraw: function (chart, easing) {
                    if (chart.config.options.showAllTooltips) {
                        // we don't want the permanent tooltips to animate, so don't do anything till the animation runs atleast once
                        if (!chart.allTooltipsOnce) {
                            if (easing !== 1)
                                return;
                            chart.allTooltipsOnce = true;
                        }

                        // turn on tooltips
                        chart.options.tooltips.enabled = true;
                        Chart.helpers.each(chart.pluginTooltips, function (tooltip) {
                            tooltip.initialize();
                            tooltip.update();
                            // we don't actually need this since we are not animating tooltips
                            tooltip.pivot();
                            tooltip.transition(easing).draw();
                        });
                        chart.options.tooltips.enabled = false;
                    }
                }
            });
            var ctx = document.getElementById("chart-by-category");
            var chart = new Chart(ctx, {
                type: 'horizontalBar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Gastos por categoria',
                        data: values,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255,99,132,1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    showAllTooltips: true,
                    legend: {
                        display: false
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero:true,
                                callback: function(value, index, values) {
                                    return value.toLocaleString("pt-BR",{style:"currency", currency:"BRL"});
                                }
                            }
                        }]
                    },
                    tooltips: {
                        callbacks: {
                            mode: 'y',
                            title: function() {
                                return '';
                            },
                            label: function(tooltipItem, data) {
                                var dataLabel = data.labels[tooltipItem.index];
                                var value = parseFloat(data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]);

                                return dataLabel+ " : " + value.toLocaleString("pt-BR",{style:"currency", currency:"BRL"});
                            }
                        }
                    }
                }
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
                el: '#busca',
                data: {
                    search: '',//Texto de pesquisa
                    page:1,//Número da página
                    loading:true,//Exibindo alert de carregamento
                    scrollPos:0,//Posição do scroll
                    finishList: false,//Flag se a lista foi totalmente carregada
                    limitByPage:100,//Itens por página
                    congressmen: [],//Lista completa de deputados,
                    congressmenFiltered: [],//Lista completa de deputados,
                    last:1,
                    filtered:false
                },
                created:function(){this.loadCongressmen()},
                destroyed: function() {
                    window.removeEventListener('scroll', this.loadMore);
                },
                methods:{
                    loadMore: function () { 
                        if(this.finishList || this.loading){
                            return;
                        }
                        if(this.search == ""){
                            this.filtered = false;
                        }
                        var self = this;
                        this.scrollPos = document.querySelector("html").scrollHeight - window.innerHeight - document.querySelector("html").scrollTop;  
                        if (this.scrollPos == 0) {
                            self.page++;
                            request.loadCongressmen(
                                {
                                    "pagina":self.page,
                                    "itens":self.limitByPage,
                                    "ordenarPor":"nome",
                                },
                                function(data){
                                    self.congressmen = self.congressmen.concat(data.dados);
                                    if(self.filtered){
                                        var textSearch = self.search;
                                        self.congressmenFiltered = self.congressmen.filter(function(congressman){
                                            if(congressman.nome.toLocaleLowerCase().includes(textSearch)){
                                                return true;
                                            }else if(congressman.siglaUf.toLocaleLowerCase() == textSearch){
                                                return true;
                                            }else if(congressman.siglaPartido.toLocaleLowerCase() == textSearch){
                                                return true;
                                            }
                                            return false;
                                        });
                                        console.log(self.congressmenFiltered.length);
                                        console.log(self.finishList);
                                        if(self.congressmenFiltered.length == 0 && !self.finishList){
                                            self.loading = false;
                                            self.loadMore();
                                        }
                                    }else{
                                        this.congressmenFiltered = this.congressmen;
                                    }

                                    if(self.page == self.last){
                                        self.finishList = true;
                                    }
                                    //Delay de 2 segundos
                                    setTimeout(function(){
                                        self.loading = false;
                                    },2000);
                                },
                                function(){
                                    self.loading = true;
                                },
                                function(){
                                    module.alert.buildAlertDanger("#alert-box-loading","Não foi possível carregar a lista completa de deputados, tente novamente.");
                                }
                            );
                        }
                    },
                    loadCongressmen:function(){
                        var self = this;
                        request.loadCongressmen(
                            {
                                "pagina":self.page,
                                "itens":self.limitByPage,
                                "ordenarPor":"nome",
                            },
                            function(data){
                                var linkLast = data.links[3].href;
                                var last = linkLast.substring(linkLast.indexOf("?pagina=")+8,linkLast.indexOf("&itens"));
                                self.last = last;
                                self.congressmenFiltered = self.congressmen = data.dados;

                                self.loading = false;
                                window.addEventListener('scroll', self.loadMore);
                            },
                            function(){
                                self.loading = true;
                            },
                            function(){
                                module.alert.buildAlertDanger("#alert-box-loading","Não foi possível carregar a lista de deputados, tente novamente.");
                            }
                        );
                    },
                    searchCongressman:function(){       
                        this.filtered = true;
                        var textSearch = this.search;
                        if(textSearch == ""){
                            this.congressmenFiltered = this.congressmen;   
                            this.filtered = false;
                            return;
                        }
                        this.congressmenFiltered = this.congressmen.filter(function(congressman){
                            if(congressman.nome.toLocaleLowerCase().includes(textSearch)){
                                return true;
                            }else if(congressman.siglaUf.toLocaleLowerCase() == textSearch){
                                return true;
                            }else if(congressman.siglaPartido.toLocaleLowerCase() == textSearch){
                                return true;
                            }
                            return false;
                        });

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
                        ufNascimento:""
                    },
                    outgoings:[]
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

                            document.title = data.ultimoStatus.nomeEleitoral+" | Vigie Seu Deputado";
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
                                ano:self.yearOutgoing,
                                itens:100
                            },
                            function(data){
                                /*var out = {
                                    ano: data.ano,
                                    cnpjCpfFornecedor: data.cnpjCpfFornecedor,
                                    dataDocumento: data.dataDocumento,
                                    idDocumento: data.idDocumento,
                                    idLote: data.idLote,
                                    idTipoDocumento: data.idTipoDocumento,
                                    mes: data.mes,
                                    nomeFornecedor: data.nomeFornecedor,
                                    numDocumento: data.numDocumento,
                                    numRessarcimento: data.numRessarcimento,
                                    parcela: data.parcela,
                                    tipoDespesa: data.tipoDespesa,
                                    tipoDocumento: data.tipoDocumento,
                                    urlDocumento: data.urlDocumento,
                                    valorDocumento: data.valorDocumento,
                                    valorGlosa: data.valorGlosa,
                                    valorLiquido: data.valorLiquido
                                };*/
                                self.outgoing = data;
                                console.log(data);
                            },
                            function(){
                                self.loading = true;
                            },
                            function(error){
                                console.log(error);
                            }
                        );
                    },
                    buildSelectDate:function(){
                        
                    }
                }
            });
        }
    };
    return module;
});