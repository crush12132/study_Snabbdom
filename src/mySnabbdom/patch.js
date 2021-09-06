import vnode from './vnode'
import createElement from './createElement'
import patchVnode from './patchVnode'
export default function patch(oldNode, newNode) {
    //oldNode是虚拟节点还是Dom节点
   if(oldNode.sel==''||oldNode.sel==undefined){
       //是dom节点-->将oldNode包装为虚拟节点
        oldNode = vnode(oldNode.tagName.toLowerCase(),{},[],undefined,oldNode)
   }//是虚拟节点-->判断oldNode和newNode是不是同一个节点

   console.log(oldNode.sel,newNode.sel)
   if(oldNode.key==newNode.key&&oldNode.sel==newNode.sel){
         //进行精细化比较
         console.log('进行精细化比较');
         patchVnode(oldNode,newNode)
   }else{//插入新的，再暴力删除旧的
      console.log('不是同一个节点,暴力删除旧的，插入新的')
      // createElement(newNode,oldNode.elm)
      let newVodeElm =  createElement(newNode)
      if(oldNode.elm.parentNode&&newVodeElm){
         //插入到老节点之前
         //insertBefore(newNode,参考节点) 在参考节点之前插入新节点 
         oldNode.elm.parentNode.insertBefore(newVodeElm,oldNode.elm)
      }
      //删除老节点
      oldNode.elm.parentNode.removeChild(oldNode.elm)

   }

   
}