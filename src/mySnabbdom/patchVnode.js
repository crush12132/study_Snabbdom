import createElement from "./createElement";
import updateChildren from "./updateChildren";
export default function patchNvode(oldNode,newNode) {
    console.log(111,oldNode,newNode);
    //oldNode和newNode是否是内存中的同一对象,是的话就nothing
    if(oldNode === newNode) {
     
      return;
    }
    //newNode有没有text属性且没有孩子
    if(newNode.text != undefined &&(newNode.children==undefined||newNode.children.length==0)){

       //newNode和oldNade的text是否相同
       if(newNode.text != oldNode.text){
          console.log('新的和老的text不相同')
          //把老的innerText变为newVode的Text
          oldNode.elm.innerText = newNode.text;
       }
    }else{//oldNode有没有children
       if(oldNode.children.length>0 && oldNode.children!=undefined){
        updateChildren(oldNode.elm,oldNode.children,newNode.children)

       }else{//意味着oldNode有text
          //清空oldNode中的text并把newNode的children添加到DOM中
          oldNode.elm.innerHTML = '';
         //  newNode.elm = oldNode.elm;
          for(let i=0;i<newNode.children.length;i++){
             let dom = createElement(newNode.children[i]);
             oldNode.elm.appendChild(dom);

          }
       }
      
    }
}