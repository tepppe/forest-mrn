<?php

session_start();

/*ノード情報をDBに格納する際に使用*/
require("connect_db.php");

//タイムゾーンの設定
date_default_timezone_set('Asia/Tokyo');

// $timestamp = date("Y-m-d H:i:s") . "." . substr(explode(".", (microtime(true) . ""))[1], 0, 3);//日時をマイクロ秒まで取得するようにしてみる

//ここ未完成（ノードにもっと情報追加しないといけないかも）
$user_id = $_SESSION['USERID'];      //ユーザID
$sheet_id = $_SESSION['SHEETID'];    //シートID
$type = $_POST["type"];             //開始終了どっちか
$timestamp = date("Y-m-d H:i:s") . "." . substr(explode(".", (microtime(true) . ""))[1], 0, 3);


$result1 = $mysqli->query("SELECT MAX(start_time) FROM network_sturuct_activity WHERE user_id = '$user_id' AND sheet_id = '$sheet_id' AND situation = 'start'");
$row1 = $result1->fetch_assoc();
$maxStartTime = $row1['MAX(start_time)'];
$sql1 = "UPDATE network_sturuct_activity SET end_time = '$timestamp', situation = '$type' WHERE user_id = '$user_id' AND sheet_id = '$sheet_id' AND situation = 'start' AND start_time = '$maxStartTime'";
$result = $mysqli->query($sql1);

$sql2 = "INSERT INTO network_sturuct_activity (user_id, sheet_id, start_time, end_time, situation) VALUES ('$user_id', '$sheet_id', '$timestamp', '$timestamp', 'start')";
$result2 = $mysqli->query($sql2);

echo json_encode(["start_time" => $timestamp]);

?>