$(document).ready(function(){
    if (localStorage.getItem("inp-selisih") === null) {
        localStorage.setItem("inp-selisih", 5);
    }
    
    var selisih = localStorage.getItem("inp-selisih");
    
    $('#selisih').html(selisih);

    $('.btn-selisih').click(function () {
        var input = $(".inp-selisih").val();
        if (input !== '') {
            localStorage.setItem("inp-selisih", input);
            location.reload();
        }
    });

    function loadlink(){
        $.ajax({
            url: window.location.href + "selisih/index.php",
            method: "POST",
            dataType: 'json',
            data: {
                selisih: selisih
            },
            success:function(data){
                // data = JSON.parse(datas);
                $('.binancelowprice').html(data.lowprice.binance); 
                $('.binancehighprice').html(data.highprice.binance); 
                $('.binancelastprice').html(data.lastprice.binance); 
                $('.huobilastprice').html(data.lastprice.huobi); 
                $('.selisihlastprice').html(data.lastprice.selisih);
                $('.messagelastprice').html(data.lastprice.message);
            }
        });
        // $.getJSON(window.location.href + "selisih/index.php", function(data) {
        //     $('.binancelowprice').html(data.lowprice.binance); 
        //     $('.binancehighprice').html(data.highprice.binance); 
        //     $('.binancelastprice').html(data.lastprice.binance); 
        //     $('.huobilastprice').html(data.lastprice.huobi); 
        //     $('.selisihlastprice').html(data.lastprice.selisih);
        //     // $('.messagelastprice').html(data.message); 
        // });

        // $('.hasilbinance').load(window.location.href + "binance/index.php");
        // $('.hasilhuobi').load(window.location.href + "huobi/index.php");

        // var binance = Number($('.hasilbinance').html());
        // var huobi = Number($('.hasilhuobi').html());
        // if(binance > huobi) {
        //     var hasil = binance - huobi;
        // } else {
        //     var hasil = huobi - binance;
        // }
        
        // $('.hasil').html(hasil.toFixed(2));

        // var mendekati = selisih / 2;
        // if(hasil >= selisih) {
        //     $('.hasil').css({'color' : 'green'});
        //     $('.message').text('Selisih lebih besar dari '+ selisih).css({'color' : 'green'});
        // } else if(hasil >= mendekati) {
        //     $('.hasil').css({'color' : 'blue'});
        //     $('.message').text('Selisih mendekati '+ selisih).css({'color' : 'blue'});
        // } else{
        //     $('.hasil').css({'color' : 'red'});
        //     $('.message').text('Selisih lebih kecil dari '+ selisih).css({'color' : 'red'});
        // }
    }

    loadlink();
    setInterval(function(){
        loadlink();
    }, 1000);

    // $(function() {
    //     getBinance();
    //     getHuobi();
    // });

    // function getBinance() {
    //     $.get(window.location.href + "binance/index.php", function(data) {
    //         $('.binance').html(data);    
    //     });
    //     setTimeout(getBinance, 1000);
    // }

    // function getHuobi() {
    //     $.get(window.location.href + "huobi/index.php", function(data) {
    //         $('.huobi').html(data);    
    //     });
    //     setTimeout(getHuobi, 1000);
    // }

    window.onload = function () {
        var dps = [];
        var dpss = [];
        var chart = new CanvasJS.Chart("linechart", {
            title :{
                text: "Marke Overview"
            },
            axisX: {
                includeZero: false,
                // valueFormatString: "HH:mm:ss"

            },
            axisY: {
                includeZero: false
            },      
            data: [{
                type: "spline",
                name: "Binance",
                showInLegend: true,
                dataPoints: dps
            },
            {
                type: "spline",
                name: "Huobi",
                showInLegend: true,
                dataPoints: dpss
            }]
        });
        
        var d = new Date($.now());
        var hour = d.getHours();
        var minute = d.getMinutes();
        var second = d.getSeconds();
        var xVal = second;
        var dataLength = 50;
        
        var updateChart = function (count) {
            count = count || 1;
            for (var j = 0; j < count; j++) {
                $.ajax({
                    url: window.location.href + "selisih/index.php",
                    method: "POST",
                    dataType: 'json',
                    data: {
                        selisih: selisih
                    },
                    success:function(data){
                        // console.log(xVal);
                        dps.push({
                            x: xVal,
                            y: data.lastprice.binance
                        });
                        dpss.push({
                            x: xVal,
                            y: data.lastprice.huobi
                        });
                        xVal++;
                    }
                });
            }
        
            if (dps.length > dataLength) {
                dps.shift();
            }

            if (dpss.length > dataLength) {
                dpss.shift();
            }
        
            chart.render();
        };
        
        updateChart(dataLength);
        setInterval(function(){updateChart()}, 1000);
    }

    // function updateTime() {
    //     var d = new Date($.now());
    //     var time = d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
    //     return time;
    // }
    
    // setInterval(function(){
    //     console.log(updateTime())
    // }, 1000);
});