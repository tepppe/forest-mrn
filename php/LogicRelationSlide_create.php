<?php

	session_start();

	/*ノード情報をDBに格納する際に使用*/
	require("connect_db.php");

  //タイムゾーンの設定
  date_default_timezone_set('Asia/Tokyo');

  		$content_id = $_POST["id"];             //コンテントID
		$node_id1 = $_POST["node_id1"]; 
		$node_id2 = $_POST["node_id2"];
		$thread1_id = $_POST["thread1_id"];      //ユーザID
		$thread2_id = $_POST["thread2_id"];
		$thread1_label = $_POST["thread1_label"];      
		$thread2_label = $_POST["thread2_label"];
		$ont1_id = $_POST["ont1_id"];
		$ont2_id = $_POST["ont2_id"];
		$relation_label = $_POST["relation_label"];             //関係性のラベル
		$relation_concept = $_POST["relation_concept"];
		$sheet_id = $_SESSION['SHEETID'];    //スライドID
		$timestamp = date("Y-m-d H:i:s") . "." . substr(explode(".", (microtime(true) . ""))[1], 0, 3);

		$sql = "INSERT INTO document_relation (id, node_id1, thread1_id, thread1_label, ont1_id, node_id2, thread2_id, thread2_label, ont2_id, deleted, created_at, updated_at, sheet_id) VALUES ('$content_id', '$node_id1', '$thread1_id', '$thread1_label', '$ont1_id', '$node_id2', '$thread2_id', '$thread2_label', '$ont2_id', 0, '$timestamp', '$timestamp' , '$sheet_id')";

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
			error_log('$result成功しています!'.$timestamp, 0);
		}else if($result == FALSE){
      	echo "false";
			error_log($result.'$result失敗です'.$mysqli->error, "3", "error_log.txt");
			// error_log('失敗しました。'.mysqli_error($link), 0);
		}else{
			error_log('$result不明なエラーです', 0);
		}

    //==============================activityログ===============================//

	// 	$sql = "INSERT INTO slide_content_activity (id, sheet_id, slide_content_id, node_id, concept_id, content, type, user_id, slide_id, act, date, from_slide_content)
	// 	VALUES ('$activity_id', '$sheet_id', '$content_id', '$node_id', '$concept_id', '$content', '$type', '$user_id', '$slide_id', 'add', '$timestamp', NULL)";

	// 	$result = $mysqli->query($sql);

    // //クエリ($sql)のエラー処理
    // if($sql == TRUE){
	// 		echo "true";
	// 		error_log('$sql成功しています！'.$timestamp, 0);
	// 	}else if($sql == FALSE){
	// 		error_log($sql.'$sql失敗です', 0);
	// 		// error_log('失敗しました。'.mysqli_error($link), 0);
	// 	}else{
	// 		error_log('$sql不明なエラーです', 0);
	// 	}

    // //php($result)のエラー処理
    // if($result == TRUE){
	// 		echo "true";
	// 		error_log('$result成功しています！'.$timestamp, 0);
	// 	}else if($result == FALSE){
	// 		error_log($result.'$result失敗です'.$mysqli->error, 0);
	// 		// error_log('失敗しました。'.mysqli_error($link), 0);
	// 	}else{
	// 		error_log('$result不明なエラーです', 0);
	// 	}


?>
