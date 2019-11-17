<?php
    class req {
        private $url_huobi = 'https://api.huobi.pro';
        private $url_binance = 'https://api.binance.com';
        public $api_method = '';
        public $req_method = '';

        function bind_param($param) {
            $u = [];
            $sort_rank = [];
            foreach($param as $k=>$v) {
                $u[] = $k."=".urlencode($v);
                $sort_rank[] = ord($k);
            }
            asort($u);
            return implode('&', $u);
        }
        
        function get_binance_trade($symbol = '') {
            $this->api_method = "/api/v1/ticker/24hr";
            $param = [
                'symbol' => $symbol
            ];
            
            $url = $this->url_binance.$this->api_method.'?'.$this->bind_param($param);
            return json_decode($this->curl($url));
        }

        function get_huobi_trade($symbol = '') {
            $this->api_method = "/market/trade";
            $param = [
                'symbol' => $symbol
            ];
            
            $url = $this->url_huobi.$this->api_method.'?'.$this->bind_param($param);
            return json_decode($this->curl($url));
        }
    
        function curl($url, $postdata=[]) {
            $ch = curl_init();
            curl_setopt($ch,CURLOPT_URL, $url);

            if ($this->req_method == 'POST') {
                curl_setopt($ch, CURLOPT_POST, 1);
                curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($postdata));
            }

            curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
            curl_setopt($ch,CURLOPT_HEADER,0);
            curl_setopt($ch, CURLOPT_TIMEOUT,60);
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
            curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);  
            curl_setopt ($ch, CURLOPT_HTTPHEADER, [
                "Content-Type: application/json",
                "ACCOUNT_ID: 125002839",
                "ACCESS_KEY: f5128cec-b5e90d27-edrfhh5h53-99fcc",
                "SECRET_KEY: 1eec8799-89cc4302-923a8989-3f1cd"
            ]);

            $output = curl_exec($ch);
            $info = curl_getinfo($ch);
            curl_close($ch);
            return $output;
        }
    }
?>