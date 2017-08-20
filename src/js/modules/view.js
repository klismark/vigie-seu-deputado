define(["jquery","chartjs","bootstrap"],
function ( $ ) {
    return {
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
        /**
         * 
         * @param {[congressman]} congressmen
         * @param {function} callback
         * @returns {undefined}
         */
        buildListAllCongressmen: function(congressmen,callback){
            if(congressmen.length == 0){
                this.buildAlertWarning("#box-all-congressmen","Nenhum deputado encontrado.");
                return;
            }
            var html = '<div class="panel panel-default"><div class="panel-body"><div class="row">';
            for(var i = 0,max = congressmen.length;i<max;i++){
                html += '<div class="col-lg-4 col-md-6 col-sm-6" id="congressmen-'+congressmen[i].id+'">';
                html += '<div class="thumbnail" itemscope itemtype="http://schema.org/Person">';
                html += '<img src="'+congressmen[i].photo+'" class="photo-list-congressmen" alt="Foto do deputado '+congressmen[i].name+'">';
                html += '<div class="caption info-list-congressmen">';
                html += '<h3 itemprop="name">'+congressmen[i].name+'</h3>';
                html += '<p class="text-info-list-congressmen">';
                html += '<span itemprop="affiliation"><i  aria-hidden="true" class="fa fa-flag"></i> '+congressmen[i].party+' - '+congressmen[i].uf+'</span><br>';
                html += '<span itemprop="email"><i  aria-hidden="true" class="fa fa-envelope-o"></i> '+congressmen[i].email+'</span>';
                html += '</p>';
                html += '<a href="congressman.html" itemprop="url" class="btn-view-congressman btn btn-small btn-success" ><i class="fa fa-info-circle" aria-hidden="true"></i> Ver Detalhes</a>';
                html += '</div>';
                html += '</div>';
                html += '</div>';
            }
            html += '</div></div></div>';
            $("#box-all-congressmen").html(html);
            if(typeof callback === "function"){
                callback();    
            }
        },
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
        },
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
                console.log("ativar");
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
                console.log("desativar");
            var contrast = JSON.parse(localStorage.getItem("contrast"));
            if(contrast){
                localStorage.setItem("contrast",JSON.stringify(false));
                $("#btn-contrast").html("Alto Contraste");
                //Home
                $(".header-main").removeAttr("style");
            }
            
        }
    };
});