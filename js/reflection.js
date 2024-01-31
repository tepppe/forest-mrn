


// let m_up2 = 0;
// let m_up = 0
// let m_down = 0;
// var starttime;



// const Mouseon = (cont_id, time) => {
//   document.getElementById(cont_id).style.color="red";
//   document.getElementById("timedisplay").innerText = time;
// }
// //発言ノードからマウス外れた時のイベント
// const Mouseout = (cont_id) => {
//   document.getElementById(cont_id).style.color="black";
//   document.getElementById("timedisplay").innerText="";
// }
// //発言ノードをマウスで押した時のイベント。ここダブルクリックでもいい
// const Mousedown = (cont_id) => {
//   document.getElementById(cont_id).style.color="black";
//   document.getElementById(cont_id).style.background="blue";
//   m_down = cont_id;
// }
// //発言ノードをマウスで離した時のイベント
// //未完成
// const Mouseup = (cont_id) => {
//   m_up = cont_id;
//   m_up2 = cont_id;
//   //ここに発言者同じじゃないと進めないっていう制約いる
//   if(m_down != 0 && m_up != 0 && m_down != m_up){
//     if(m_up > m_down){
//       document.getElementById(m_down).innerText+=document.getElementById(m_up).innerText;
//       document.getElementById(m_up).remove();
//       update_text(starttime, m_down, m_up, document.getElementById(m_down).innerText);
//       m_up2 = m_down;
//     }else{
//       document.getElementById(m_up).innerText+=document.getElementById(m_down).innerText;
//       document.getElementById(m_down).remove();
//       update_text(starttime, m_up, m_down, document.getElementById(m_up).innerText);
//     }
//   }
//   document.getElementById(m_up2).style.background="white";
//   m_up = 0;
//   m_down = 0;
//   m_up2 = 0;
// }

// const update_text = (sttime, remain_id, delete_id, content) => {
//   $.ajax({
//     url: "php/update_network_text.php",
//     type: "POST",
//     data: {remain_id : remain_id,
//       delete_id : delete_id,
//       content : content,
//       sttime : sttime},
//     success: function () {
//       console.log("登録成功:record_contentaaa")
//     },
//     error: function () {
//     console.log("登録失敗");},
//   });
// }

// //リフレクション開始
// async function startlef(xml_name){
//   const record_start = () =>{
//     return new Promise((resolve, reject) => {
// 			$.ajax({
//         url: "php/record_struct_time.php",
//         type: "POST",
//         data: {type : "start"},
//         success: function (result) {
//             console.log("登録成功:record_content");
//             return result;
//         }
// 			}).then(result => {
// 				resolve(JSON.parse(result));
// 			}, () => {
// 				reject();
// 			});
// 		})
//   }
//   const stime = await record_start();
//   starttime = stime.start_time;
//   getData2(starttime,xml_name);
// }

// //過去の議事録マップを取るときに使う
// async function open_time_start(){
//   const open_time = (php_name) => {
//     return new Promise((resolve, reject) => {
//       $.ajax({
//         url: php_name,
//         type: "POST",
//         data: {type : "end"},
//         success: (result) => {
//             return result;
//         }
//       }).then(result => {
//         resolve(JSON.parse(result));
//       }, () => {
//         reject();
//       });
//     })
//   }
//   const timedata = await open_time("php/open_time.php");
//   console.log(timedata);
//   if(timedata.error == "not"){
//     return;
//   }
//   const selectElement = document.getElementById("selectiontime");
//   timedata.map((n) => {
//     const optionElement = document.createElement('option');
//     optionElement.value = JSON.stringify([n.start_time,n.end_time]);
//     optionElement.text = n.start_time;
//     selectElement.appendChild(optionElement);
//   })
// }

// const select_time = () => {
//   const selectiontime = document.getElementById('selectiontime');
//   const selecttime = JSON.parse(selectiontime.value);
//   GetPastMap2(selecttime[0]);
//   GetPastMap3(selecttime[1]);
//   selectiontime.options[0].selected = true;
//   OpenNetwork(selecttime[0],selecttime[1]);
// }

// async function OpenNetwork(st_time, en_time){
//   const show_network = (php_name) => {
//     return new Promise((resolve, reject) => {
//       $.ajax({
//         url: php_name,
//         type: "POST",
//         data: {st_time : st_time,
//             en_time : en_time},
//         success: (result) => {
//             return result;
//         }
//       }).then(result => {
//         resolve(JSON.parse(result));
//       }, () => {
//         reject();
//       });
//     })
//   }
//   const nodedata_show = await show_network("php/show_network_node.php");
//   const edgedata_show = await show_network("php/show_network_edge.php");
//   const connectiondata_show = await show_network("php/show_network_connection.php");
//   const ontologydata_show = await show_network("php/show_network_ontology.php");
//   const nodes_show = new vis.DataSet();
//   const edges_show = new vis.DataSet();
//   const connect_net_show =[];
//   const connect_mind_show =[];
//   const jmindex2_show = [];
//   const jmindex3_show = [];
// //オントロジーの対応用
//   const ontology_id_show = [];
//   const ontology_nodeid_show = [];
//   const data_show = {
//     nodes: nodes_show,
//     edges: edges_show
//   };
//   const options_show = {
//     physics: false,
//     nodes: {
//       fixed: true
//     },
//     edges: {
//       arrows: 'to', // エッジに矢印を付けて有向グラフにする
//       smooth: false // falseにするとエッジが直線になる
//     },
//     interaction: {
//       multiselect: false
//     }
//   };
//   const network2 = new vis.Network(document.getElementById('mynetwork_show'), data_show, options_show);
//   if(nodedata_show.error == "not"){
//     return;
//   }
//   nodedata_show.map((n) => {
//     if(n.shape == "box"){
//       nodes_show.add({id: n.node_id, label: n.label, x: n.node_x, y: n.node_y, color: n.color, shape: 'box'});
//     }else{
//       nodes_show.add({id: n.node_id, label: n.label, x: n.node_x, y: n.node_y, color: n.color, shape: 'ellipse', font:{color: 'white'}, fixed: true})
//     }
//   })
//   if(edgedata_show.error != "not"){
//     edgedata_show.map((n) => {
//       edges_show.add({ from: n.edge_start, to: n.edge_end });
//     });
//   }
//   if(connectiondata_show.error != "not"){
//     connectiondata_show.map((n) => {
//       connect_net_show.push(n.network_node_id);
//       connect_mind_show.push(n.mindmap_node_id);
//     });
//   }
//   if(ontologydata_show.error != "not"){
//     ontologydata_show.map((n) => {
//       ontology_id_show.push(n.ontology_id);
//       ontology_nodeid_show.push(n.node_id);
//     });
//   }
//   //ネットワーククリックされたときに繋がってるマインドマップ表示
//   //未完成（jquery使ったらもっと軽くできるかも）
//   network2.on('click',function (params) {
//     //他のところクリックしたら色直す
//     if(jmindex2_show != []){
//       const area2 = document.getElementById("jsmind_container2");
//       const jmnode2 = area2.getElementsByTagName("jmnode");
//       jmindex2_show.map((n) => {
//         if(jmnode2[n].getAttribute("type") == "answer"){
//           jmnode2[n].style.backgroundColor = "#ffa500";
//         }else{
//           jmnode2[n].style.backgroundColor = "#87cefa";
//         }
//       })
//       jmindex2_show.length = 0;
//     }
//     if(jmindex3_show != []){
//       const area3 = document.getElementById("jsmind_container3");
//       const jmnode3 = area3.getElementsByTagName("jmnode");
//       jmindex3_show.map((n) => {
//         if(jmnode3[n].getAttribute("type") == "answer"){
//           jmnode3[n].style.backgroundColor = "#ffa500";
//         }else{
//           jmnode3[n].style.backgroundColor = "#87cefa";
//         }
//       })
//       jmindex3_show.length = 0;
//     }
//     if(params.nodes.length = 1){
//       const net_index_show = connect_net_show.map((n_id, index) => {
//         return n_id === params.nodes[0] ? index : null;
//       }).filter(n => n !== null);
//       if(net_index_show == ""){
//         return;
//       }
//       const area2 = document.getElementById("jsmind_container2");
//       const area3 = document.getElementById("jsmind_container3");
//       const jmnode2 = area2.getElementsByTagName("jmnode");
//       const jmnode3 = area3.getElementsByTagName("jmnode");

//       net_index_show.map((m_id) => {
//         // $("[nodeid='"+jmnode[i].getAttribute("nodeid")+"' ]").css("background-color", "white");
//         for(var i = 0; i < jmnode2.length; i++){
//           if(jmnode2[i].getAttribute("nodeid") == connect_mind_show[m_id]){
//             //ここいろかえる必要あるかも
//             jmnode2[i].style.backgroundColor = "white";
//             jmindex2_show.push(i);
//           }
//         }
//         for(var i = 0; i < jmnode3.length; i++){
//           if(jmnode3[i].getAttribute("nodeid") == connect_mind_show[m_id]){
//             //ここいろかえる必要あるかも
//             jmnode3[i].style.backgroundColor = "white";
//             jmindex3_show.push(i);
//             return;
//           }
//         }
//       });
//     }
//   });
// }

// const existingOnLoad = window.onload;
// //ロードされたときの読み込み
// window.onload = () =>{
//   existingOnLoad();
//   open_time_start();
//   const xhr = new XMLHttpRequest();
//     // リクエストの設定
//     xhr.open('GET', 'php/open_situation.php', true);

//     // レスポンスが返ってきた時の処理
//     xhr.onreadystatechange = function() {
//         if (xhr.readyState == 4) {
//             if (xhr.status == 200) {
//                 // レスポンスのデータを取得
//                 var response = JSON.parse(xhr.responseText);
//                 if (response.error) {
//                     // エラーがある場合
//                     //未完成，start削除したりとかいるかも
//                     console.error(response.error);
//                     return;
//                 } else {
//                     // 正常な場合の処理
//                     const st_time = response.start_time;
//                     console.log("Start Time: " + st_time);
//                     open_start(st_time);
//                     return;
//                 }
//             } else {
//                 // エラーがある場合の処理
//                 console.error("Error: " + xhr.status);
//                 return;
//             }
//         }
//     };
//     // リクエストの送信
//     xhr.send();
// }

// //スタート時間を引数にしてネットワークと発言ノードの復元
// //テキスト読込みできてない
// async function open_start(start_time) {
//   starttime = start_time;
//   const requestDiscussionMapData = (php_name) => {
//     return new Promise((resolve, reject) => {
//       $.ajax({
//         url: php_name,
//         type: "POST",
//         data: {time : start_time},
//         success: (result) => {
//             return result;
//         }
//       }).then(result => {
//         resolve(JSON.parse(result));
//       }, () => {
//         reject();
//       });
//     })
//   }
//   const nodedata = await requestDiscussionMapData("php/open_network_node.php");
//   const edgedata = await requestDiscussionMapData("php/open_network_edge.php");
//   const connectiondata = await requestDiscussionMapData("php/open_network_connection.php");
//   const ontologydata = await requestDiscussionMapData("php/open_network_ontology.php");
//   const textdata = await requestDiscussionMapData("php/open_text.php");
//   if(textdata.error != "not"){
//     const elem = document.getElementById("utterance_area2");
//     elem.innerHTML = "";
//     for(var i = 0; i < textdata.length; i++ ){
//       if(textdata[i].network_on == 1){
//         elem.innerHTML += "<div id="+textdata[i].area_id + " style='border: solid 2px #000; font-size: 10px; line-height: 10px; background: gray; margin-bottom: 5px;'>"+textdata[i].content+"</div>";
//       }else{
//         elem.innerHTML += "<div id="+textdata[i].area_id + " style='border: solid 2px #000; font-size: 10px; line-height: 10px; background: white; margin-bottom: 5px;' onclick='rightclick()' onmouseover = Mouseon("+textdata[i].area_id+",'"+textdata[i].JPNtime+"') onmouseout = Mouseout("+textdata[i].area_id+") onmousedown= Mousedown("+textdata[i].area_id+") onmouseup= Mouseup("+textdata[i].area_id+")>"+textdata[i].content+"</div>";
//       }
//     }
//   }
//   if(nodedata.error == "not"){
//     return;
//   }
//   nodedata.map((n) => {
//     if(n.shape == "box"){
//       nodes.add({id: n.node_id, label: n.label, x: n.node_x, y: n.node_y, color: n.color, shape: 'box'});
//       nodenumber += 1;
//       nodey += 35;
//     }else{
//       nodes.add({id: n.node_id, label: n.label, x: n.node_x, y: n.node_y, color: n.color, shape: 'ellipse', font:{color: 'white'}, fixed: true})
//     }
//   })
//   if(edgedata.error != "not"){
//     edgedata.map((n) => {
//       edges.add({ from: n.edge_start, to: n.edge_end });
//       edge_Start.push(n.edge_start);
//       edge_End.push(n.edge_end)
//     });
//   }
//   if(connectiondata.error != "not"){
//     connectiondata.map((n) => {
//       connect_net.push(n.network_node_id);
//       connect_mind.push(n.mindmap_node_id);
//     });
//   }
//   if(ontologydata.error != "not"){
//     ontologydata.map((n) => {
//       ontology_id.push(n.ontology_id);
//       ontology_nodeid.push(n.node_id);
//     });
//   }
// }


/*
* XMLファイルのアップロードとデータ取得処理
*/
const getXMLTagInfo = () => {
  // あアプロードされたXMLファイルの中身をJSONデータとして取得
  parser = new DOMParser();
  const meeting_utterances = parser.parseFromString($("#meeting_utterance_xml").html(),"text/xml");
  const getTaggedInfo = (utter, tag) => {
    return $(utter).find(tag).html()
  }

  // const test = Array.prototype.forEach.call(meeting_utterances.getElementsByTagName("MessageData"), (u, index) => {
  // });  
  // console.log(test)
  const utter_list = Array.prototype.slice.call(meeting_utterances.getElementsByTagName("messagedata")).map(u => {
    return {
      message_id: getTaggedInfo(u, "id"),
      content: getTaggedInfo(u, "type"),
      sender: getTaggedInfo(u, "sender_id"),
      time: getTaggedInfo(u, "time"),
      JPNtime: getTaggedInfo(u, "jpntime")
    }
  })
  return utter_list;
}

const setUploadedXMLData = (file_input_btn_id, xml_area_id) => {
  // 読み込んだXMLファイルの中身を一度，HTML上にDisplayする（要素とかを取得する処理をしやすくするため）
  const btn = document.getElementById(file_input_btn_id);
  btn.addEventListener("click", () => {
      btn.addEventListener("change", (evt) => {
          const file = evt.target.files;
          const reader = new FileReader();
          reader.readAsText(file[0]);

          reader.onload = () => {
              const new_span = document.createElement('span');
              new_span.setAttribute('id', 'meeting_utterance_xml');
              new_span.innerHTML = reader.result;

              const area = $('#'+xml_area_id);
              area.append(new_span);
                           
              new Promise(() => {
                  $("#uploaded_meeting_utterance_xml_concent_display_area").html(area.html());
              });
          }
      }, false);
  });
  $(file_input_btn_id).off();
}

const uploadMeetingUtteranceXML = () => {
  // フォームデータを作成
  //console.log(getXMLTagInfo())
  recordMeetingUtteranceNodes(getXMLTagInfo())
}

const recordMeetingUtteranceNodes = (utterances) => {
  $.ajax({
    url: "php/discussion_map_manager.php",
    type: "POST",
    data: {
      purpose: "record_meeting_utterance",
      utters: JSON.stringify(utterances),
    }
  }).success((r) => {
    console.log(r)
  });
}


window.addEventListener('load', () => {

  // 初期表示時点でいくつかのオブジェクトを非表示にする
  document.getElementById("network_container").style.display="none";

  setUploadedXMLData("meetingUtteranceXmlFileUploader", "uploaded_meeting_utterance_xml_concent_display_area");
  $("#discussion_log_xml_file_upload_button").on("click", () => {
    // ファイルアップロードボタンにアップロードイベントを付与
    uploadMeetingUtteranceXML();
  });

});