<?php

//指定した日時だけ取得・マッチングするバージョン
session_start();
require("connect_db.php");

$user_id = $_SESSION["USERID"];//"26943"; //
$sheet_id = $_SESSION["SHEETID"];//"102774749"; //

//タイムゾーンの設定
date_default_timezone_set('Asia/Tokyo');
$today_date = date("Y-m-d");

$sql = "SELECT scenario_title FROM sheets WHERE id='$sheet_id'";

if($result = $mysqli->query($sql)){

  //$reflections
  while($row = mysqli_fetch_assoc($result)){
    $reflections[] = array('scenario_title'=> $row["scenario_title"]);
  }
}

echo json_encode($reflections);

?>
