<?php

	session_start();

	/*ノード情報をDBに格納する際に使用*/
	require("connect_db.php");

    //タイムゾーンの設定
    date_default_timezone_set('Asia/Tokyo');

		// $timestamp = date("Y-m-d H:i:s") . "." . substr(explode(".", (microtime(true) . ""))[1], 0, 3);//日時をマイクロ秒まで取得するようにしてみる
		$user_id = $_SESSION['USERID'];         //ユーザID
		$sheet_id = $_SESSION['SHEETID'];       //シートID
		$id = $_POST["id"];                     //ID
		$slide_id = $_POST["slide_id"];         //スライドID
		$rank = $_POST["rank"];                 //順番
		$title = $_POST["title"];               //タイトル
        $logic_option = $_POST["logic_option"]; //選択した論理構成意図の値
		$node_id = $_POST["node_id"];
		$concept_id = $_POST["concept_id"];
		$timestamp = date("Y-m-d H:i:s") . "." . substr(explode(".", (microtime(true) . ""))[1], 0, 3);

		$sql = "INSERT INTO document_rank (id, slide_id, rank, title, created_at, updated_at, user_id, sheet_id, deleted,logic_option,node_id,concept_id)
		VALUES ('$id', '$slide_id', '$rank', '$title', '$timestamp', '$timestamp', '$user_id','$sheet_id', 0, '$logic_option','$node_id','$concept_id')";


		$result = $mysqli->query($sql);

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
