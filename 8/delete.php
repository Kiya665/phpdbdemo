<?php
require '../../pg_pdodb.php';

$html = "";
// GET値をチェック
try {
    foreach($_POST as $k => $v){
        $conn = db_connect();
        $sql = 'delete from student where no = ?';
        $prepare = $conn->prepare($sql);
        $prepare->bindValue(1, $k);
        $prepare->execute();
    }
    $count=$prepare->rowCount();
} catch( PDOException $e ) {
    header("HTTP/1.1 500 Internal Server Error");
    echo $e->getMessage;
}
?>


