import patchVnode from './patchVnode';
import createElement from './createElement';
function someNode(oldNode, newNode) {
  return oldNode.sel===newNode.sel && oldNode.key === newNode.key 
}
export default function updateChildren(parentElm,oldCh,newCh){
    //旧前
    let oldStartInx = 0;
    //旧后
    let oldEndInx = oldCh.length - 1;
    //新前
    let newStartInx = 0;
    //新后
    let newEndInx = newCh.length - 1;
    //旧前节点
    let oldStartNode = oldCh[0]
     //旧后节点
    let oldEndNode = oldCh[oldEndInx]
      //新前节点
    let newStartNode = newCh[0]
     //新后节点
    let newEndNode = newCh[newEndInx]
   
    let keyMap = null
   
    while(oldStartInx <= oldEndInx && newStartInx <= newEndInx){
      if(oldStartNode === null || oldCh[oldStartInx] === undefined){
        oldStartNode = oldCh[++oldStartInx]
      }else if(oldEndNode === null || oldCh[oldEndInx] === undefined){
        oldEndNode = oldCh[--oldEndInx]
      }else if(newStartNode === null || newCh[newStartInx] === undefined){
        newStartNode = newCh[++newStartInx]
      }else if(newEndNode === null || newCh[newEndInx] === undefined){
        newEndNode = newCh[--newEndInx]
      }else if(someNode(oldStartNode,newStartNode)){  //1.新前与旧前
        console.log('1.新前与旧前命中');
        patchVnode(oldStartNode,newStartNode)
        oldStartNode = oldCh[++oldStartInx]
        newStartNode = newCh[++newStartInx]
      }else if(someNode(oldEndNode,newEndNode)){//2.新后与旧后
        console.log('2.新后与旧后命中');
        patchVnode(oldEndNode,newEndNode)
        oldEndNode = oldCh[--oldEndInx]
        newEndNode = newCh[--newEndInx]
      }else if(someNode(oldStartNode,newEndNode)){//3.新后与旧前
        console.log('3.新后与旧前命中');
        patchVnode(oldStartNode,newEndNode)
        //如何移动节点？只要你插入来了一个已经在DOM树上的节点，它就会被移动
        //当3新后与旧前命中的时候，此时要移动节点，
        //移动新后指向的这个节点到老节点的旧后的后面
        parentElm.insertBefore(oldStartNode.elm,oldEndNode.elm.nextSibling)
        oldStartNode = oldCh[++oldStartInx]
        newEndNode = newCh[--newEndInx]
      }else if(someNode(oldEndNode,newStartNode)){//4.新前与旧后
        console.log('4.新前与旧后命中');
        patchVnode(oldEndNode,newStartNode)
        //当4新前与旧后命中的时候，此时要移动节点，
        //移动新前指向的这个节点到老节点的旧前的前面
        parentElm.insertBefore(oldEndNode.elm,oldStartNode.elm)
        oldEndNode = oldCh[--oldEndInx]
        newStartNode = newCh[++newStartInx]
      }else{//四种都没命中
        if(!keyMap){
          keyMap = {}
          for(let i = oldStartInx;i <= oldEndInx; i++ ){
            const key = oldCh[i].key
            if(key != undefined){
              keyMap[key] = i
            }
          }
        }
        // console.log(keyMap);
        const ByInx = keyMap[newStartNode.key]
        if(ByInx == undefined){//新节点的内容与老节点的内容都不相同
          //被加入的项(就是newStartNode这项)现在不是真正的DOM节点
          console.log(1111,newStartNode.text,createElement(newStartNode),oldStartNode.elm);
          parentElm.insertBefore(createElement(newStartNode),oldStartNode.elm)
          
        }else{//不是全新的项，要进行移动
            const elmToMove = oldCh[ByInx]
            patchVnode(elmToMove,newStartNode)
            oldCh[ByInx] = undefined;//虚拟节点设置为undefined，真实节点移动
            parentElm.insertBefore(elmToMove.elm,oldStartNode.elm)
        }
       
        //指针下移，只移动新的头
        newStartNode = newCh[++newStartInx];
      }
    }
    //说明新增节点
    if(newStartInx <= newEndInx) {
      console.log('newCh还有节点没有处理，要增加');
      let before = newCh[newEndInx+1] == null ? null : newCh[newEndInx+1].elm
      //遍历新的newCh,添加到老的没有处理的之前
      for(let i = newStartInx; i <= newEndInx ;++i){
        //insertBefore方法可以识别null，如果是null就会自动排到队尾，效果和appendChild一致
        console.log(2222,createElement(newCh[i]));
        // parentElm.insertBefore(createElement(newCh[i]),oldCh[oldStartInx].elm);
        parentElm.insertBefore(createElement(newCh[i]),before);
      }
    }else if(oldStartInx <= oldEndInx){//说明删除节点
      console.log('oldCh还有节点没有处理，要删除');
      for(let i = oldStartInx; i <= oldEndInx ;++i){
       
        if(oldCh[i]){
          //批量删除oldStartInx和oldEndInx卡着的项
          parentElm.removeChild(oldCh[i].elm)
        }
      }
    }
}