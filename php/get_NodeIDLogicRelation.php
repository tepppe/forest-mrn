<?php

//指定した日時だけ取得・マッチングするバージョン
session_start();
require("connect_db.php");

// $user_id = $_SESSION["USERID"];//"26943"; //
$sheet_id = $_SESSION["SHEETID"];//"102774749"; //
// $node_id = $_GET["node_id"];
$node_id = $_POST["node_id"];
//追記
$node1_id = $_POST["node1_id"];

//タイムゾーンの設定
date_default_timezone_set('Asia/Tokyo');

// $sql = "SELECT scenario_title FROM sheets WHERE id='$sheet_id'";
$sql = "SELECT * FROM document_content_relation WHERE sheet_id='$sheet_id' AND deleted='0' AND node1_id='$node_id'";

$data = array();
if($result = $mysqli->query($sql)){
  while($row = mysqli_fetch_assoc($result)){
    array_push($data, $row);
  }
}

//追記
$sql2 = "SELECT * FROM document_content_relation WHERE sheet_id='$sheet_id' AND deleted='0' AND node1_id='$node1_id' OR sheet_id='$sheet_id' AND deleted='0' AND node2_id='$node1_id'";

if($result2 = $mysqli->query($sql2)){
  while($row2 = mysqli_fetch_assoc($result2)){
    array_push($data, $row2);
  }
}

$json=json_encode($data, JSON_UNESCAPED_UNICODE);
echo $json;

?>
