<?php
    include "getapi.php";

    $req = new req();
    $lowbinance = round($req->get_binance_trade('BTCUSDT')->lowPrice, 2);
    $highbinance = round($req->get_binance_trade('BTCUSDT')->highPrice, 2);
    $lastbinance = round($req->get_binance_trade('BTCUSDT')->lastPrice, 2);
    $lasthuobi = $req->get_huobi_trade('btcusdt')->tick->data[0]->price;

    if($lastbinance > $lasthuobi) {
        $lasthasil = $lastbinance - $lasthuobi;
    } else {
        $lasthasil = $lasthuobi - $lastbinance;
    }
    
    $selisih = $_POST['selisih'];
    $mendekati = $selisih / 2;
    if($lasthasil >= $selisih) {
        $messagelast = "<span style='color: green'>Selisih lebih besar dari ".$selisih."</span>";
    } else if($lasthasil >= $mendekati) {
        $messagelast = "<span style='color: blue'>Selisih mendekati ".$selisih."</span>";
    } else{
        $messagelast = "<span style='color: red'>Selisih lebih kecil dari ".$selisih."</span>";
    }

    date_default_timezone_set("Asia/Jakarta");
    $time = date("h:i:sa");

    echo json_encode(
        array(
            'lowprice' => array(
                'binance' => $lowbinance,
                // 'huobi' => $lowhuobi,
                // 'selisih' => round($lowhasil, 2),
                // 'messagelastprice' => $message
            ),
            'highprice' => array(
                'binance' => $highbinance,
                // 'huobi' => $highhuobi,
                // 'selisih' => round($highhasil, 2),
                // 'messagelastprice' => $message
            ),
            'lastprice' => array(
                'binance' => $lastbinance,
                'huobi' => $lasthuobi,
                'selisih' => round($lasthasil, 2),
                'message' => $messagelast
            ),
            'time' => $time
        ));
?>