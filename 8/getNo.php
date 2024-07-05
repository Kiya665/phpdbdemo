<?php
require '../../pg_pdodb.php';

$conn = db_connect();
$sql = 'select no from student order by no';
$prepare = $conn->prepare($sql);
$prepare->execute();
$count=$prepare->rowCount();
$numbers = $prepare->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($numbers, JSON_UNESCAPED_UNICODE);

?>