<?php

//指定した日時だけ取得・マッチングするバージョン
session_start();
require("connect_db.php");

$user_id = $_SESSION["USERID"];//"26943"; //
$sheet_id = $_SESSION["SHEETID"];//"102774749"; //

//タイムゾーンの設定
date_default_timezone_set('Asia/Tokyo');
$today_date = date("Y-m-d");


$sql = "SELECT slide_id, rank, title FROM slide_rank WHERE sheet_id='$sheet_id' AND deleted=0";

$reflections = array();

if($result = $mysqli->query($sql)){

  //$reflections
  while($row = mysqli_fetch_assoc($result)){
    $reflections[] = array(
    'slide_id'=> $row["slide_id"],
    'rank' => $row["rank"],
    'title' => $row["title"]);
  }
}

echo json_encode($reflections);

?>
