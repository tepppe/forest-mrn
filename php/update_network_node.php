<?php

	session_start();

	require("connect_db.php");
	date_default_timezone_set('Asia/Tokyo');

	$user_id = $_SESSION['USERID'];      //ユーザID
    $sheet_id = $_SESSION['SHEETID'];    //シートID
	$st_time = $_POST['st_time'];
	$change = $_POST['change'];
	$node_id = $_POST['node_id'];
	$change_thing = $_POST['change_thing'];
    $timestamp = date("Y-m-d H:i:s") . "." . substr(explode(".", (microtime(true) . ""))[1], 0, 3);

	
	if($change == "label"){
		$sql = "UPDATE network_nodes_activity SET label = '$change_thing', updated_time = '$timestamp' WHERE user_id = '$user_id' AND sheet_id = '$sheet_id' AND node_id = '$node_id' AND updated_time > '$st_time'";
		$result = $mysqli->query($sql);
	}
	//後でwhereのところに時間設定はいる
	else if($change == "delete"){
		$sql = "DELETE FROM network_nodes_activity WHERE user_id = '$user_id' AND sheet_id = '$sheet_id' AND node_id = '$node_id' AND updated_time > '$st_time'";
		$result = $mysqli->query($sql);
	}
	//ここから変更するものが増えていけばifの中身をいじる
	else{

	}
	//クエリ($sql)のエラー処理
    if($sql == TRUE){
		echo "true";
		error_log('$sql成功しています！'.$timestamp, 0);
	}else if($sql == FALSE){
		error_log($sql.'$sql失敗です', 0);
		// error_log('失敗しました。'.mysqli_error($link), 0);
	}else{
		error_log('$sql不明なエラーです', 0);
	}
    //php($result)のエラー処理
    if($result == TRUE){
		echo "true";
		error_log('$result成功しています！'.$timestamp, 0);
	}else if($result == FALSE){
		error_log($result.'$result失敗です'.$mysqli->error, 0);
		// error_log('失敗しました。'.mysqli_error($link), 0);
	}else{
		error_log('$result不明なエラーです', 0);
	}
?>
