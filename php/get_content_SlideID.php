<?php

//指定した日時だけ取得・マッチングするバージョン
session_start();
require("connect_db.php");

// $user_id = $_SESSION["USERID"];//"26943"; //
$sheet_id = $_SESSION["SHEETID"];//"102774749"; //
// $doc_id = $_GET["doc_id"];
// $doc_id = $_POST["doc_id"];
$slide_id = $_POST["slide_id"];
$content_id = $_POST["content_id"];
// $slide_id = $_GET["slide_id"];
//タイムゾーンの設定
date_default_timezone_set('Asia/Tokyo');

// $sql = "SELECT scenario_title FROM sheets WHERE id='$sheet_id'";
$sql = "SELECT * FROM document_content_rank WHERE sheet_id='$sheet_id' AND deleted='0' AND content_id='$content_id' ";

$data = array();
if($result = $mysqli->query($sql)){
  while($row = mysqli_fetch_assoc($result)){
    array_push($data, $row);
  }
}

$json=json_encode($data, JSON_UNESCAPED_UNICODE);
echo $json;

?>
