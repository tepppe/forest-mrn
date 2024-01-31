<?php
session_start();

require("connect_db.php");

$user_id = $_SESSION['USERID'];      //ユーザID
$sheet_id = $_SESSION['SHEETID'];    //シートID
$start_time_result = $mysqli->query("SELECT start_time FROM network_sturuct_activity WHERE user_id = '$user_id' AND sheet_id = '$sheet_id' AND situation = 'start'");

// クエリの結果を確認
if ($start_time_result && $start_time_result->num_rows > 0) {
    // 複数の行がある場合、中断
    if ($start_time_result->num_rows > 1) {
        echo json_encode(["error" => "No matching records found."]);
        exit;
    }
    // 1行だけ取得
    $row = $start_time_result->fetch_assoc();
    $st_time = $row['start_time'];
    echo json_encode(["start_time" => $st_time]);
} else {
    echo json_encode(["error" => "No matching records found."]);
}

?>