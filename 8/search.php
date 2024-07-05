<?php
require '../pg_pdodb.php';

$conn = db_connect();
$keyword = $_POST['keyword'];
$sql = "select * from student where name like '%" . $keyword . "%' order by no";
$prepare = $conn->prepare($sql);
$prepare->execute();
$count=$prepare->rowCount();
$students = $prepare->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($students, JSON_UNESCAPED_UNICODE);

?>
