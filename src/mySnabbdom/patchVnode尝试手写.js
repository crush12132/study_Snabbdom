import createElement from "./createElement";
export default function patchNvode(oldNode,newNode) {
    //oldNode和newNode是否是内存中的同一对象,是的话就nothing
    if(oldNode === newNode) return;
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
        let un = 0;//指向老节点的指针
        for(let i=0;i<newNode.children.length;i++){
            let ch = newNode.children[i]
            let flag = false;
            for(let j=0;j<oldNode.children.length;j++){
                if(ch.sel == oldNode.children[j].sel && ch.key == oldNode.children[j].key){
                    //如果新的和老的key都相同的话，就做个标记，否则就创建新的节点
                    flag = true
                }
            }
            if(!flag){
                //新创建的节点(newVnode.children[i].elm)插入到所有未处理的节点之前，
                //而不是所有已处理的节点(oldVnode.children[i].elm)之后
                let dom = createElement(ch)
                ch.elm = dom
                if(un<oldNode.children.length){//如果当前的un所指向的老节点超过了新节点，那就创建新节点
                    oldNode.elm.insertBefore(dom,oldNode.children[un].elm)
                }else{//否则就在老节点后追加新节点
                    oldNode.elm.appendChild(dom)
                }

                console.log(dom);
            }else{//如果新的和老的key都相同的话就让指向oldVnode的指针向下移动
                un++;
               
            }

        }


       }else{//意味着oldNode有text
          //清空oldNode中的text并把newNode的children添加到DOM中
          oldNode.elm.innerHTML = '';
          for(let i=0;i<newNode.children.length;i++){
             let dom = createElement(newNode.children[i]);
             oldNode.elm.appendChild(dom);

          }
       }
      
    }
}