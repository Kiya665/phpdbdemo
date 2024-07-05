<?php
function db_connect() {
    //DB接続パラメータ
    $dbType = "pgsql";
    $dbHost = "127.0.0.1";
    $dbName = "phpdbdemo";
    $dbUser = "postgres";
    $dbPass = "Neko25nky";
    $dbPort = "5432";
    
    //DBへの接続
    try
    {
        //コネクションの確立
        $dbh = new PDO(
                        $dbType . ":host=" . $dbHost . ";dbname=" . $dbName . ";port=" . $dbPort, 
                        $dbUser , 
                        $dbPass
        );
        return $dbh;
    }
    catch( PDOException $e )
    {
        var_dump( $e->getMessage() );
        exit;
    }
}
?>