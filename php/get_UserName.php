<?php

//指定した日時だけ取得・マッチングするバージョン
session_start();
require("connect_db.php");

$user_name = $_SESSION["USERNAME"];//"26943"; //
// $sheet_id = $_SESSION["SHEETID"];//"102774749"; //

// //タイムゾーンの設定
// date_default_timezone_set('Asia/Tokyo');

// // $sql = "SELECT scenario_title FROM sheets WHERE id='$sheet_id'";
// $sql = "SELECT * FROM docum WHERE sheet_id='$sheet_id' AND deleted='0'";

// $data = array();
// if($result = $mysqli->query($sql)){
//   while($row = mysqli_fetch_assoc($result)){
//     array_push($data, $row);
//   }
// }

// $json=json_encode($data, JSON_UNESCAPED_UNICODE);
echo $user_name;

?>