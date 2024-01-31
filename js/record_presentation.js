//スライド作成を記録する関数
function Record_slide(slideID){

  $.ajax({
      url: "php/slide_create.php",
      type: "POST",
      data: {id : slideID,},
      success: function () {
        console.log("登録成功：　" +slideID );
      },
      error: function () {
      console.log("登録失敗");},

  });

}

//スライド削除を記録する関数
function Delete_slide(slideID){

  $.ajax({

      url: "php/slide_delete.php",
      type: "POST",
      data: {id : slideID,},
      success: function () {
        console.log("登録成功：　" +slideID );
      },
      error: function () {
      console.log("登録失敗");},

  });
}
//2022-12-16 shimizu
function Delete_Document(slideID){

  $.ajax({

      url: "php/Document_delete.php",
      type: "POST",
      data: {id : slideID,},
      success: function () {
        console.log("登録成功：　" +slideID );
      },
      error: function () {
      console.log("登録失敗");},

  });
}

//2022-12-13 shimizu
//ノード削除から関係性を更新する関数
function Delete_document_relation_node(doc_node_id){

  $.ajax({

      url: "php/LogicRelation_node_delete.php",
      type: "POST",
      data: {id : doc_node_id,},
      success: function () {
        console.log("登録成功：　" +doc_node_id );
      },
      error: function () {
      console.log("登録失敗");},
  });

}

//20230130 shimizu
//スライドのバッジ選択
function Delete_slide_relation(thread_id){
  $.ajax({

    url: "php/LogicRelationSlide_delete.php",
    type: "POST",
    data: {id : thread_id,},
    success: function () {
      console.log("登録成功：　" +thread_id );
    },
    error: function () {
    console.log("登録失敗");},
});
}

//2022-12-13 shimizu
//スライド削除から関係性を更新する関数
function Delete_document_relation_slide(slide_id){

  $.ajax({

      url: "php/LogicRelation_slide_delete.php",
      type: "POST",
      data: {id : slide_id,},
      success: function () {
        console.log("登録成功：　" +slide_id );
      },
      error: function () {
      console.log("登録失敗");},
  });

  //スライドとスライドの関係性があれば削除する
  $.ajax({

    url: "php/SlideLogicRelation_delete.php",
    type: "POST",
    data: {id : slide_id,},
    success: function () {
      console.log("登録成功：　" +slide_id );
    },
    error: function () {
    console.log("登録失敗");},
});
}

//2022-12-21 shimizu
//一つの論理構成意図削除から関係性を更新する関数
function Delete_document_relation_concept(id){

  $.ajax({

      url: "php/LogicRelation_concept_delete.php",
      type: "POST",
      data: {id : id,},
      success: function () {
        console.log("登録成功：　" +id );
      },
      error: function () {
      console.log("登録失敗");},
  });

}

//2022-12-21 shimizu 
function Delete_concept(id){
  $.ajax({

    url: "php/get_LogicRelation.php",
    type: "POST",
    success: function (arr) {
      if(arr == "[]"){
        console.log(arr);
      }else{
        console.log(arr);
        var parse = JSON.parse(arr);
        var badge_ids = [];
        for(var i=0; i<parse.length;i++){
          var badge_id1 = parse[i].id+","+parse[i].doc_con1_id;
          badge_ids.push(badge_id1);
          var badge_id2 = parse[i].id+","+parse[i].doc_con2_id;
          badge_ids.push(badge_id2);
        }
        for(var j=0;j<badge_ids;j++){
          console.log(badge_ids[j]);
          var badge_element = document.getElementById(badge_ids[j]);
          badge_element.remove();
        }
        
      }
      console.log("登録成功：　" +id );
    },
    error: function () {
    console.log("登録失敗");},
});
}

function Delete_concepts(doc_id){

}

//コンテンツ追加を記録する関数
function Record_content(contentID, nodeID, conceptID, content, slideID, type){

  $.ajax({

      url: "php/content_create.php",
      type: "POST",
      data: {id : contentID,
             node_id : nodeID,
             concept_id : conceptID,
             content : content,
             slide_id : slideID,
             type : type,
             },
      success: function () {
        console.log("登録成功：　" +slideID );
      },
      error: function () {
      console.log("登録失敗");},

  });
}

//2022-12-13 shimizu ノード間の論理的関係を記録する関数
async function Record_NodeLogicRelation(U_ID, node1_id,doc_con1_id,doc_con1_label,ont1_id,node2_id, doc_con2_id,doc_con2_label,ont2_id){

  $.ajax({
    url: "php/LogicRelationNode_create.php",
    type: "POST",
    data: {id : U_ID,
            node1_id : node1_id,
            doc_con1_id : doc_con1_id,
            doc_con1_label : doc_con1_label,
            ont1_id : ont1_id,
            node2_id : node2_id,
            doc_con2_id : doc_con2_id,
            doc_con2_label : doc_con2_label,
            ont2_id : ont2_id,
            },
    success: function () {
      console.log("登録成功：　" +U_ID );
    },
    error: function () {
    console.log("登録失敗");},

  });
}

async function Record_SlideLogicRelation(U_ID, node_id1,thread1_id,thread1_label, ont1_id, node_id2, thread2_id,thread2_label,ont2_id, relation_label,relation_concept){


  $.ajax({
    url: "php/LogicRelationSlide_create.php",
    type: "POST",
    data: { id : U_ID,
            node_id1 : node_id1,
            thread1_id : thread1_id,
            thread1_label : thread1_label,
            ont1_id : ont1_id,
            node_id2 : node_id2,
            thread2_id : thread2_id,
            thread2_label : thread2_label,
            ont2_id : ont2_id,
            relation_label : relation_label,
            relation_concept : relation_concept
            },
    success: function () {
      console.log("登録成功：　" +U_ID );
    },
    error: function () {
    console.log("登録失敗");},

  });
}

//2022-12-15 shimizu 使用してないが，関係性を設定する時にスライドのIDを保存するやり方を検討していた．
async function getContentID(doc_con_id){
  var content_id
  $.ajax({
    url: "php/get_content_slideID.php",
    type: "POST",
    data: {content_id: doc_con_id},
    success: function(arr){
      if(arr == "[]"){
        // console.log(arr);
      }else{
        // console.log(arr);
        var parse = JSON.parse(arr);
        for(var i=0; i<parse.length; i++){
          content_id = parse[i].slide_id;
        }
      }
      console.log("取得成功：　" + content_id);
      return content_id;
    },
    error: function () {
    console.log("登録失敗");},
  })

}

//コンテンツ削除を記録する関数
function Delete_content(contentID){

  $.ajax({

      url: "php/content_delete.php",
      type: "POST",
      data: {id : contentID},
      success: function () {
        console.log("登録成功：　" +contentID );
      },
      error: function () {
      console.log("登録失敗");},

  });
}
//2022-12-16 shimizu コンテンツ削除を記録する関数
function Delete_Document_content(contentID){

  $.ajax({

      url: "php/Document_content_delete.php",
      type: "POST",
      data: {id : contentID},
      success: function () {
        console.log("登録成功：　" +contentID );
      },
      error: function () {
      console.log("登録失敗");},

  });
}


//コンテンツの編集を記録する関数
function Edit_save(obj,id){
  var content = obj.value;//変更されたテキストエリアの内容
  console.log(id);

  $.ajax({
      url: "php/content_edit.php",
      type: "POST",
      data: {id : id,
             content : content,},
      success: function () {
        console.log("登録成功");
      },
      error: function () {
      console.log("登録失敗");},
  });

  // ---------以下，ラベルへの変更結果を反映---------------

  var dom_label = obj.previousElementSibling;
  if(content == "" && dom_label.getAttribute("type") == "toi"){
    $(dom_label).html("新規問いノード");
  }else if(content == "" && dom_label.getAttribute("type") == "answer"){
    $(dom_label).html("新規答えノード");
  }else{
  $(dom_label).html(content);
  }
}



//スライドタイトルの編集を記録する関数
function Edit_slide(obj, slideID){
  var slidetitle = obj.value;//変更されたテキストエリアの内容
  console.log(slideID);
  console.log(slidetitle);

  $.ajax({

      url: "php/slide_edit.php",
      type: "POST",
      data: {id : slideID,
             content : slidetitle,},
      success: function () {
        console.log("登録成功");
      },
      error: function () {
      console.log("登録失敗");},

  });

  // ---------以下，ラベルへの変更結果を反映---------------

  var dom_label = obj.previousElementSibling;
  if(slidetitle == ""){
    $(dom_label).html("ページタイトル");
  }else{
  $(dom_label).html(slidetitle);
  }
}

//プレゼンテーション自体のタイトルの編集を記録する関数
function Edit_title(obj){
  var title = obj.value;

  $.ajax({

      url: "php/title_edit.php",
      type: "POST",
      data: {title : title,},
      success: function () {
        console.log("登録成功");
      },
      error: function () {
      console.log("登録失敗");},

  });

  $.ajax({

    url: "php/update_scenario_title.php",
    type: "POST",
    data: {title : title,},
    success: function () {
      console.log("登録成功");
    },
    error: function () {
    console.log("登録失敗");},

});
}

//2022-11-24 shimizu
function Edit_title_shimizu(obj){
  var title = obj.value;

  $.ajax({

      url: "php/title_edit_shimizu.php",
      type: "POST",
      data: {title : title,},
      success: function () {
        console.log("登録成功");
      },
      error: function () {
      console.log("登録失敗");},

  });
}

async function Update_slide_rank(){

  await $.ajax({

      url: "php/update_slide_rank.php",
      type: "POST",
      success: function () {
        console.log("登録成功");
        return "ok";
      },
      error: function () {
      console.log("登録失敗");
      return "err";},

  });
}

//2022-11-24 shimizu
async function Update_Document_rank(){

  await $.ajax({

      url: "php/update_document_rank.php",
      type: "POST",
      success: function () {
        console.log("登録成功");
        return "ok";
      },
      error: function () {
      console.log("登録失敗");
      return "err";},

  });
}

async function Update_content_rank(){
  await $.ajax({

      url: "php/update_content_rank.php",
      type: "POST",
      success: function () {
        console.log("登録成功");
        return "ok";
      },
      error: function () {
      console.log("登録失敗");
      return "err";},
  });
}

//2022-11-24 shimizu
async function Update_Document_content_rank(){
  await $.ajax({
      url: "php/update_document_content_rank.php",
      type: "POST",
      success: function () {
        console.log("登録成功");
        return "ok";
      },
      error: function () {
      console.log("登録失敗");
      return "err";},
  });
}

function Record_slide_rank(slideID, rank, title){
  var id = getUniqueStr();

  $.ajax({
      url: "php/slide_rank.php",
      type: "POST",
      data: {id : id,
            slide_id : slideID,
            rank : rank,
            title : title,},
      success: function () {
        console.log("登録成功");
      },
      error: function () {
      console.log("登録失敗");},
  });
}

//2022-11-24 shimizu
function Record_document_rank(slideID, rank, title,logic_option,node_id,concept_id){
  var id = getUniqueStr();

  $.ajax({
      url: "php/document_rank.php",
      type: "POST",
      data: {id : id,
            slide_id : slideID,
            rank : rank,
            title : title,
            logic_option : logic_option,
            node_id : node_id,
            concept_id : concept_id},
      success: function () {
        console.log("登録成功");
      },
      error: function () {
      console.log("登録失敗");},
  });
}

function Record_content_rank(contentID, rank, slideID, content, nodeID, type, indent, concept_id){
  var id = getUniqueStr();

  $.ajax({

      url: "php/content_rank.php",
      type: "POST",
      data: {id : id,
            content_id : contentID,
            rank : rank,
            slide_id : slideID,
            content : content,
            node_id : nodeID,
            type : type,
            indent : indent,
            concept_id : concept_id},
      success: function () {
        console.log("登録成功");
      },
      error: function () {
      console.log("登録失敗");},

  });
}

//2022-11-24 shimizu
function Record_document_content_rank(contentID, rank, slideID, content, nodeID, type, indent, concept_id,logic_option_content){
  var id = getUniqueStr();

  $.ajax({

      url: "php/document_content_rank.php",
      type: "POST",
      data: {id : id,
            content_id : contentID,
            rank : rank,
            slide_id : slideID,
            content : content,
            node_id : nodeID,
            type : type,
            indent : indent,
            concept_id : concept_id,
            logic_option : logic_option_content},
      success: function () {
        console.log("登録成功");
      },
      error: function () {
      console.log("登録失敗");},

  });
}

function Update_scenario_title(title){

  $.ajax({

      url: "php/update_scenario_title.php",
      type: "POST",
      data: {title : title,},
      success: function () {
        console.log("登録成功");
      },
      error: function () {
      console.log("登録失敗");},

  });
}

function Update_document_scenario_title(title){

  $.ajax({

      url: "php/update_document_scenario_title.php",
      type: "POST",
      data: {title : title,},
      success: function () {
        console.log("登録成功");
      },
      error: function () {
      console.log("登録失敗");},

  });
}

function Record_Timing(timing){
  console.log(timing);
  $.ajax({

      url: "php/record_timing.php",
      type: "POST",
      data: {timing : timing,},
      success: function () {
        console.log("登録成功");
      },
      error: function () {
      console.log("登録失敗");},

  });
}
