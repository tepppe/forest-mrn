<?php
session_start();

require("connect_db.php");

$user_id = $_SESSION['USERID'];      //ユーザID
$sheet_id = $_SESSION['SHEETID'];    //シートID
$st_time = $_POST["time"]; 

$result = $mysqli->query("SELECT node_id, label, node_x, node_y, color, shape FROM network_nodes_activity
          WHERE user_id = '$user_id' AND sheet_id = '$sheet_id' AND updated_time > '$st_time'
          ORDER BY updated_time DESC ");

$data = array();
while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

if (empty($data)) {
    echo json_encode(["error" => "not"]);
} else {
    echo json_encode($data);
}

?>
