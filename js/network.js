let nodex = 0;
let nodey = -300;
let nodenumber = 0;
let con_count = 0;
var nodes = new vis.DataSet();
var edges = new vis.DataSet();
// ドラッグアンドドロップを有効にするフラグ
let nodeDragEnabled = false;
// マインドマップとの対応づけを可能にする
let nodeConnectEnabled = false;
// ドラッグ元のノードIDを保持する変数
let nodeIdStart = null;
let net_menu = document.getElementById('network_conmenu');
let mynet = document.getElementById("mynetwork2");
var data = {
	nodes: nodes,
	edges: edges
};
var options = {
	physics: false,
	edges: {
		arrows: 'to', // エッジに矢印を付けて有向グラフにする
		smooth: false // falseにするとエッジが直線になる
  },
  interaction: {
    multiselect: false
  }
};
var network = new vis.Network(document.getElementById('mynetwork'), data, options);
let rightclick_id;
let nodeconnect = true;
//下３つはノードがクリックされたときに色を変えるマインドマップ上のノードの記録用
const connect_net =[];
const connect_mind =[];
const jmindex =[];
//オントロジーの対応用
const ontology_id = [];
const ontology_nodeid = [];
//エッジ逆の場合の処理
const edge_End = [];
const edge_Start = [];

//発言ノードクリック
const rightclick = (e) => {
    var e=window.event;
    var elm=e.target;
    var id1=elm.id;
    document.getElementById("rclick").innerHTML="<input type='button' onclick='addnode("+id1+")' value='ノードに追加'>";
}
console.log("nettowaojdfa")
//発言ノード追加
const addnode = (areaid) => {
  document.getElementById("rclick").innerHTML="";
  nodey += 35;
  const delete_event = document.getElementById(areaid);
  delete_event.removeAttribute('onclick');
  delete_event.removeAttribute('onmouseover');
  delete_event.removeAttribute('onmouseout');
  delete_event.removeAttribute('onmouseup');
  delete_event.removeAttribute('onmousedown');
  delete_event.style.background="gray";
  var newNode = {id: areaid, label: document.getElementById(areaid).innerText, color: 'pink', shape: 'box'};
  newNode.x = nodex;
  newNode.y = nodey;
  nodes.add(newNode);
  record_Netnode(areaid, document.getElementById(areaid).innerText, nodex, nodey, 'pink', 'box');
  update_text_on(starttime, areaid);
}

//新ノード追加
const addNewNode = () => {
  nodenumber += 1;
  nodey += 35;
  const newNode = {id: 'N_'+nodenumber, label: 'newNode', color: 'skyblue', shape: 'box'};
  newNode.x = nodex;
  newNode.y = nodey;
  nodes.add(newNode);
  record_Netnode('N_'+nodenumber, 'newNode', nodex, nodey, 'skyblue', 'box');
}

//新エッジ追加
const addEdgeStart = () => {
  nodeDragEnabled = !nodeDragEnabled ;
  nodefix(nodeDragEnabled);
  if(nodeDragEnabled){
    document.getElementById("edgeadd").value="エッジ追加終了";
  }else{
    document.getElementById("edgeadd").value="エッジ追加";
  }
}

// ノードのドラッグ開始時のイベントリスナーを追加
network.on('dragStart', function (params) {
  if(!nodeDragEnabled){
    params.event.preventDefault();
  }else{
    var nodeAtPoint = network.getNodeAt(params.pointer.DOM);
    nodeIdStart = nodeAtPoint;
  }
});
// ノードのドラッグ終了時のイベントリスナーを追加
network.on('dragEnd', function (params) {
  if(nodeDragEnabled){
    var nodeAtPoint = network.getNodeAt(params.pointer.DOM);
    var nodeIdEnd = nodeAtPoint;
    if(nodeIdStart !== null && nodeIdEnd !== null && nodeIdEnd !== undefined && nodeIdEnd !== nodeIdStart && nodes.get(nodeIdStart).shape != "ellipse" && nodes.get(nodeIdEnd).shape != "ellipse"){
      const edgest = [];
      const edgeen = [];
      let notable = true;
      edge_Start.map((n,index) => {
        if(n == nodeIdStart){
          edgest.push(index);
        }else if(n == nodeIdEnd){
          edgeen.push(index);
          console.log(index)
        }
      })
      edgest.map((n) => {
        if(edge_End[n] == nodeIdEnd){
          notable = false;
          console.log("a")
          return;
        }
      })
      edgeen.map((n) => {
        if(edge_End[n] == nodeIdStart){
          notable = false;
          console.log(edge_Start,edge_End,edgeen,edgest,nodeIdEnd,nodeIdStart)
          return;
        }
      })
      if(notable == false){
        return;
      }
      edgest.length = 0;
      edgeen.length = 0;
      var newEdgeData = { from: nodeIdStart, to: nodeIdEnd };
      edges.add(newEdgeData);
      record_Netedge(nodeIdStart, nodeIdEnd);
      edge_Start.push(nodeIdStart);
      edge_End.push(nodeIdEnd);
    }
    nodeIdStart = null;
  }else{
    const movedNodeId = params.nodes[0];
    if (movedNodeId !== undefined) {
      const pointer = params.pointer;
      nodes.update({ id: movedNodeId, x: pointer.x, y: pointer.y });
      const nodeBoundingBox = network.getBoundingBox(movedNodeId);
      update_Netnode2(starttime, "point", movedNodeId, (nodeBoundingBox.right + nodeBoundingBox.left)/2, (nodeBoundingBox.bottom + nodeBoundingBox.top)/2);
      const ontology_index = ontology_nodeid.indexOf(movedNodeId);
      if(ontology_index !== -1){
        const nodeBoundingBox = network.getBoundingBox(movedNodeId);
        const ontology_x = nodeBoundingBox.left;
        const ontology_y = nodeBoundingBox.top;
        nodes.update({ id: ontology_id[ontology_index], x: ontology_x, y: ontology_y });
        update_Netnode2(starttime, "point", ontology_id[ontology_index], ontology_x, ontology_y);
      }
    }
  }
});

// ノードの固定
const nodefix = (fixed) => {
  options.interaction.multiselect = fixed;
  network.setOptions(options);
  var fixNodes = nodes.get({
    fields: ['id', 'fixed']
  });
  fixNodes.forEach(function(fixNode) {
    fixNode.fixed = fixed;
  });
  nodes.update(fixNodes);
}

//ノードの編集
const editNodeLabel = (nodeId, newLabel) => {
  const node = nodes.get(nodeId);
  if (node) {
    // ノードの中身を編集
    node.label = newLabel;
    // 編集を反映
    nodes.update(node);
    update_Netnode1(starttime, "label", nodeId, newLabel);
    const ontology_index = ontology_nodeid.indexOf(nodeId);
    if(ontology_index !== -1){
      const nodeBoundingBox = network.getBoundingBox(nodeId);
      const ontology_x = nodeBoundingBox.left;
      const ontology_y = nodeBoundingBox.top;
      nodes.update({ id: ontology_id[ontology_index], x: ontology_x, y: ontology_y });
      update_Netnode2(starttime, "point", ontology_id[ontology_index], ontology_x, ontology_y);
    }
  }
}

// ダブルクリックしたときのイベントリスナー
network.on('doubleClick', function (params) {
  var clickedNodeId = params.nodes[0];
  if (clickedNodeId !== undefined) {
    // ユーザーに新しいラベルを尋ね、それをノードの中身に設定
    var newLabel = prompt('新しいラベルを入力してください:', nodes.get(clickedNodeId).label);
    // 編集したラベルを反映
    if (newLabel !== null) {
      editNodeLabel(clickedNodeId, newLabel);
    }
  }
});


//ノード削除
const deleteNode = () => {
  const selectNodeId = network.getSelection().nodes[0];
  if(selectNodeId !== undefined){
    edges.remove(network.getConnectedEdges(selectNodeId));
    nodes.remove({id: selectNodeId});
    update_Netnode1(starttime, "delete", selectNodeId, 0);
    update_Netedge(starttime, selectNodeId, 0);
    update_Netedge(starttime, 0, selectNodeId);
    const ontology_index = ontology_nodeid.indexOf(selectNodeId);
    if(ontology_index !== -1){
      nodes.remove({ id: ontology_id[ontology_index]});
      update_Netnode1(starttime, "delete", ontology_id[ontology_index], 0);
      ontology_id.splice(ontology_index, 1);
      ontology_nodeid.splice(ontology_index, 1);
    }
    const connect_net_index = [];
    connect_net.map((n_id, index) => {
      if(n_id === selectNodeId){
        connect_net_index.push(index);
      }
    });
    connect_net_index.map((n) => {
      connect_net.splice(n, 1);
      connect_mind.splice(n, 1);
    })
    delete_connection(starttime, selectNodeId);
  }
}

//エッジ削除
const deleteEdge = () => {
  const selectEdgeId = network.getSelection().edges[0];
  const startid = edges.get(selectEdgeId).from;
  const endid = edges.get(selectEdgeId).to;
  if(selectEdgeId !== undefined){
    edges.remove({id: selectEdgeId});
    update_Netedge(starttime, startid, endid);
  }
}

//データベースにノード記録
const record_Netnode = (id, label, x, y, color, shape) => {
  $.ajax({
    url: "php/record_network_node.php",
    type: "POST",
    data: {node_id : id,
          label : label,
          x : x,
          y : y,
          color : color,
          shape : shape},
    success: function () {
      console.log("登録成功:record_content"+id);
    },
    error: function () {
    console.log("登録失敗");},
  });
}

//データベースにエッジ記録
const record_Netedge = (start, end) => {
  $.ajax({
    url: "php/record_network_edge.php",
    type: "POST",
    data: {start : start,
          end : end},
    success: function () {
      console.log("登録成功:record_content"+start);
    },
    error: function () {
    console.log("登録失敗");},
  });
}

//データベースに変更するものが１つの場合のノード更新(changeには今はlabel,deleteのみ)
const update_Netnode1 = (st_time, change, id, change_thing) => {
  $.ajax({
    url: "php/update_network_node.php",
    type: "POST",
    data: {st_time : st_time,
          change : change,
          node_id : id,
          change_thing : change_thing},
    success: function () {
      console.log("登録成功:record_content"+id);
    },
    error: function () {
    console.log("登録失敗");},
  });
}

//データベースに変更するものが２つの場合のノード更新(changeには今はpoint(座標)のみ)
const update_Netnode2 = (st_time, change, id, change_thing1, change_thing2) => {
  $.ajax({
    url: "php/update_network_node2.php",
    type: "POST",
    data: {st_time : st_time,
          change : change,
          node_id : id,
          change_thing1 : change_thing1,
          change_thing2 : change_thing2},
    success: function () {
      console.log("登録成功:record_content"+id);
    },
    error: function () {
    console.log("登録失敗");},
  });
}

//データベースにエッジの更新(削除)
function update_Netedge(st_time, start, end){
  $.ajax({
    url: "php/update_network_edge.php",
    type: "POST",
    data: {st_time : st_time,
          start : start,
          end : end},
    success: function () {
      console.log("登録成功:record_content"+start);
    },
    error: function () {
    console.log("登録失敗");},
  });
}

//右クリック
network.on("oncontext", function(params) {
  nodeConnectEnabled = false;
	if (params.nodes.length == 1) {
	  rightclick_id = params.nodes[0];
    const nodeBoundingBox = network.getBoundingBox(rightclick_id);
    const pointerX = params.pointer.DOM.x;
    const pointerY = params.pointer.DOM.y;
    const mynetPosi = mynet.getBoundingClientRect();
    const nextX = pointerX + mynetPosi.left + 20;
    const nextY = pointerY + mynetPosi.top + 20;
    net_menu.style.left = nextX;
    net_menu.style.top = nextY;
    net_menu.style.display = "block";//ここようわからん未完成かも
    document.getElementById("net_conmenu1").addEventListener("click", function select_temp(){
      show_select(rightclick_id, nextX, nextY, nodeBoundingBox.left, nodeBoundingBox.top);
      net_menu.style.display = "none";
      document.getElementById("net_conmenu1").removeEventListener("click", select_temp);
    });
    document.getElementById("net_conmenu2").addEventListener("click", function network_temp (){
      connect_network(rightclick_id);
      net_menu.style.display = "none";
      document.getElementById("net_conmenu2").removeEventListener("click", network_temp);
    });
  }
});

//マインドマップとネットワークつなげる(今後動作確認はいる多分行けた)，(複雑なので何してるか聞きたいなら大槻まで)
//学習者に選んでくださいみたいなやつ表示するのはいる
const connect_network = (net_nodeid) => {
  nodeConnectEnabled = true;
  con_count += 1;
  console.log(net_nodeid);
  const jscont = document.getElementById("jsmind_container");
  function connect_mindmap(e){
    console.log("イベント呼び出し")
    const Jsmind = new jsMind({container:'jsmind_container',
                              editable: false});
    if (nodeConnectEnabled) {
      if(con_count > 1){
        jscont.removeEventListener("click", connect_mindmap);
        con_count -= 1;
        console.log("ok"+net_nodeid,con_count);
        console.log("開始後1")
        return;
      }
      const mm_nodeid = Jsmind.view.get_binded_nodeid(e.target);
      if(mm_nodeid == null){
        con_count -= 1;
        jscont.removeEventListener("click", connect_mindmap);
        alert('ノードのクリックがうまくできませんでした．もう一度試してみてください');
        return;
      }else{
        if(connect_net.indexOf(net_nodeid) !== -1 && connect_mind.indexOf(mm_nodeid) !== -1){
          con_count -= 1;
          jscont.removeEventListener("click", connect_mindmap);
          alert('このノードはすでに選択されています');
          return;
        }
        connect_mm(net_nodeid,mm_nodeid);
      }
    }else{
      jscont.removeEventListener("click", connect_mindmap);
      con_count -= 1;
      return;
    }
    jscont.removeEventListener("click", connect_mindmap);
  }
  jscont.addEventListener("click", connect_mindmap);
}

//繋げたものをDBに記録
const connect_mm = (net_nodeid,mm_nodeid) => {
  $.ajax({
    url: "php/record_network_connect.php",
    type: "POST",
    data: {net_nodeid : net_nodeid,
          mm_nodeid : mm_nodeid},
    success: function () {
      console.log("登録成功:record_content"+mm_nodeid);
    },
    error: function () {
    console.log("登録失敗");},
  });
  console.log("記録完了")
  connect_net.push(net_nodeid);
  connect_mind.push(mm_nodeid);
  con_count -= 1;
  nodeConnectEnabled = false;
}

//ネットワーククリックされたときに繋がってるマインドマップ表示
network.on('click',function (params) {
  //他のところクリックしたら色直す
  if(jmindex != []){
    const jmnode = document.getElementsByTagName("jmnode");
    jmindex.map((n) => {
      if(jmnode[n].getAttribute("type") == "answer"){
        jmnode[n].style.backgroundColor = "#ffa500";
      }else{
        jmnode[n].style.backgroundColor = "#87cefa";
      }
    })
    jmindex.length = 0;
  }
  if(params.nodes.length = 1){
    const net_index = connect_net.map((n_id, index) => {
      return n_id === params.nodes[0] ? index : null;
    }).filter(n => n !== null);
    if(net_index == ""){
      return;
    }
    const jmnode = document.getElementsByTagName("jmnode");
    net_index.map((m_id) => {
      for(var i = 0; i < jmnode.length; i++){
        if(jmnode[i].getAttribute("nodeid") == connect_mind[m_id]){
          //ここいろかえる必要あるかも
          jmnode[i].style.backgroundColor = "white";
          jmindex.push(i);
          break;
        }
      }
    });
  }
});

//ラベルの選択
const show_select = (rightclick_id, box_x,box_y,node_x,node_y) => {
  if(ontology_nodeid.indexOf(rightclick_id) !== -1){
    alert('このノードにはすでに概念がつけられているため概念付けできません');
    return;
  }
  const labelselect = document.getElementById("labelselect");
  labelselect.style.display = "block";
  labelselect.style.left = box_x;
  labelselect.style.top = box_y;
  const selectionlist = document.getElementById('selectionlist');
  const ontology_select = document.getElementById("ontology_select");
  ontology_select.addEventListener('click', function selected_ontology() {
    addontology(rightclick_id, selectionlist.value, node_x, node_y);
    selectionlist.options[2].selected = true;
    ontology_select.removeEventListener('click', selected_ontology);
    labelselect.style.display = "none";
  });
}

//概念追加データベースに
const addontology = (nodeid,label,x,y) => {
  const newNode = {id: 'ontology_'+nodeid, label: label, color: 'blue', shape: 'ellipse' ,font:{color: 'white'} , x: x, y: y, fixed: true};
  nodes.add(newNode);
  ontology_nodeid.push(nodeid);
  ontology_id.push('ontology_'+nodeid);
  record_ontrogy(nodeid,'ontology_'+nodeid, label, x, y, 'blue', 'ellipse');
}

const record_ontrogy = (nodeid,ontologyid,label,x,y,color,shape) => {
  $.ajax({
    url: "php/record_ontology.php",
    type: "POST",
    data: {node_id : nodeid,
          ontology_id : ontologyid,
          label : label,
          x : x,
          y : y,
          color : color,
          shape : shape},
    success: function () {
      console.log("登録成功:record_content"+nodeid);
    },
    error: function () {
    console.log("登録失敗");},
  });
}

const delete_connection = (st_time, nodeid) => {
  $.ajax({
    url: "php/delete_ontology.php",
    type: "POST",
    data: {st_time : st_time,
        nodeid: nodeid},
    success: function () {
      console.log("登録成功:record_content"+nodeid);
    },
    error: function () {
    console.log("登録失敗");},
  });
}

//オントロジーノードを選択不可に
network.on('select', function (params) {
  if (nodes.get(params.nodes[0]).shape == "ellipse") {
    // 選択を解除
    network.setSelection({ nodes: [] });
  }
});

const update_text_on = (st_time, areaid) => {
  $.ajax({
    url: "php/update_network_text_on.php",
    type: "POST",
    data: {st_time : st_time,
      areaid: areaid},
    success: function () {
      console.log("登録成功:record_content");
    },
    error: function () {
    console.log("登録失敗");},
  });
}