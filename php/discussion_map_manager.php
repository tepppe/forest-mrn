<?php
// 議論内省マップのデータを読み出すための処理群

session_start();
require("connect_db.php");

// POSTデータの受け取り
$user_id = $_SESSION['USERID'];      //ユーザID
$sheet_id = $_SESSION['SHEETID'];    //シートID

$purpose = $_POST["purpose"];

$target_map_created_start_times = null;  // リフレクションの開始時間
$first_load_flag = $_POST["first_load_flag"]; // どんなデータがほしいというリクエストなのかを判定
$display_target_log_time = $_POST["display_target_log_time"]; // 表示する対象の思考整理マップの更新時間

/*
* 新しいマップの開始と終了（リフレクションの開始＿過去のリフレクションの終了）時刻を取得
*/
$result_map_create_start_and_end = $mysqli->query("SELECT start_time, end_time FROM network_sturuct_activity
        WHERE user_id = '$user_id' AND sheet_id = '$sheet_id' AND (start_time != end_time)
        ORDER BY start_time DESC ");
$map_create_start_and_end = [];
while ($row = $result_map_create_start_and_end->fetch_assoc()) {
    array_push($map_create_start_and_end, $row);
}


if(!empty($first_load_flag)) {
    // 最初の読み込みの処理のときだけ，最新のマップ作成時間を取得
    $target_map_created_start_times = $map_create_start_and_end[0]["start_time"];
} else {
    // 過去のマップを読み出そうとするとき
    $target_map_created_start_times = $_POST["time"];
}


if($purpose === "record_meeting_utterance") {
    // ミーティングの発話をノードごとに保存する処理

    $jsonDataArray = json_decode($_POST['utters'], true);
    $query = "INSERT INTO network_text (user_id, sheet_id, area_id, sender, content, time, JPNtime) VALUES ";
        
    foreach ($jsonDataArray as $jsonData) {
        $id = $mysqli->real_escape_string($jsonData['message_id']);
        $content = $mysqli->real_escape_string($jsonData['content']);
        $sender = $mysqli->real_escape_string($jsonData['sender']);
        $time = $mysqli->real_escape_string($jsonData['time']);
        $JPNtime = $mysqli->real_escape_string($jsonData['JPNtime']);
        
        $query .= "($user_id, $sheet_id, $id, '$sender', '$content', $time, '$JPNtime'), ";
    }
    $query = rtrim($query,", ");
    $mysqli->query($query);

    return;
}


/*
* 議論内省マップのノードデータと思考整理マップのノードの対応関係データを取得する処理
*/
$result_forest_node_and_discussionmap_node_relation = $mysqli->query("SELECT network_node_id, mindmap_node_id FROM network_mindmap_connect
          WHERE user_id = '$user_id' AND sheet_id = '$sheet_id' AND time > '$target_map_created_start_times'
          ORDER BY time DESC ");

$forest_node_and_discussionmap_node_relation = [];
while ($row = $result_forest_node_and_discussionmap_node_relation->fetch_assoc()) {
    array_push($forest_node_and_discussionmap_node_relation, $row);
}


/* 
* オントロジーとの対応データの読み込み
*/
$result_discussionmap_node_and_ontology_relation = $mysqli->query("SELECT ontology_id, node_id FROM network_ontology_activity
          WHERE user_id = '$user_id' AND sheet_id = '$sheet_id' AND time > '$target_map_created_start_times'
          ORDER BY time DESC ");
$discussionmap_node_and_ontology_relation = [];
while ($row = $result_discussionmap_node_and_ontology_relation->fetch_assoc()) {
    array_push($discussionmap_node_and_ontology_relation, $row);
}


/*
* 議論内省マップのノードデータの取得
*/
$result_discussionmap_node = $mysqli->query("SELECT node_id, label, node_x, node_y, color, shape FROM network_nodes_activity
        WHERE user_id = '$user_id' AND sheet_id = '$sheet_id' AND updated_time > '$target_map_created_start_times'
        ORDER BY updated_time DESC ");
$discussionmap_node = [];
while ($row = $result_discussionmap_node->fetch_assoc()) {
    array_push($discussionmap_node, $row);
}

$result_discussionmap_edge = $mysqli->query("SELECT edge_start, edge_end FROM network_edges_activity
          WHERE user_id = '$user_id' AND sheet_id = '$sheet_id' AND time > '$target_map_created_start_times'
          ORDER BY time DESC ");
$discussionmap_edge = [];
while ($row = $result_discussionmap_edge->fetch_assoc()) {
    array_push($discussionmap_edge, $row);
}


/*
* 議論における発話パーツ一覧
*/
$result_utterance = $mysqli->query("SELECT area_id, sender, content, network_on, time, JPNtime FROM network_text
          WHERE user_id = '$user_id' AND sheet_id = '$sheet_id' AND ST_Time = '$target_map_created_start_times'
          ORDER BY ST_Time DESC ");
$utterance = [];
while ($row = $result_utterance->fetch_assoc()) {
    array_push($utterance, $row);
}


/*
* 特定のマップバージョンに対応する議論内省マップの作成開始時間（＝議論内省マップのバージョン）を取得
*/
$result_discussionmap_create_start_time = $mysqli->query("SELECT start_time FROM network_sturuct_activity 
            WHERE user_id = '$user_id' AND sheet_id = '$sheet_id' 
            AND start_time < '$display_target_log_time' AND end_time > '$display_target_log_time'");
if (!$result_discussionmap_create_start_time || $result_discussionmap_create_start_time->num_rows == 0) {
    // エンドタイムが今の最新時刻を含むものが存在しない（まだ最新のリフレクションを閉じていない）場合，現状最新の時刻のマップを取得する
    $result_discussionmap_create_start_time = $mysqli->query("SELECT MAX(start_time) FROM network_sturuct_activity 
            WHERE user_id = '$user_id' AND sheet_id = '$sheet_id'"); // 一番最新のマップの時間
}



if (empty($data)) {
    echo json_encode(["error" => "not"]);
} else {
    echo json_encode($data);
}

