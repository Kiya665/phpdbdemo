<?php
require '../pg_pdodb.php';

$html = "";

try {
    foreach($_POST as $student){
        foreach($student as $array){
            $conn = db_connect();
            $sql = 'update student set name=?,mail=?,birthday=to_date(?,\'yyyy/mm/dd\') where no = ?';
            $prepare = $conn->prepare($sql);
            $prepare->bindValue(1, $array['name']);
            $prepare->bindValue(2, $array['mail']);
            $prepare->bindValue(3, $array['birthday']);    
            $prepare->bindValue(4, $array['no']);
            $prepare->execute();
        }
    }
    $count=$prepare->rowCount();
} catch( PDOException $e ) {
    $html =  "更新できませんでした。（" . $e->getMessage() . "）";
}

if ($count > 0) {
    $html = '更新されました。';
}