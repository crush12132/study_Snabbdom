//真正创建节点：将vvnode创建为dom，插入到pivot这个元素之前
export default function createElement(vnode){
    // console.log('目的是把虚拟节点',vnode,'插入到标杆',pivot,'前');
    let domVnode = document.createElement(vnode.sel);

    if(vnode.text!=''&&(vnode.children==undefined || vnode.children.length==0)){
       //它内部是文字
      
       domVnode.innerText=vnode.text
        //将孤儿节点上树,让标杆节点的父元素调用insertBefore方法，将新的孤儿节点插入到标签节点之前
        // pivot.parentNode.insertBefore(domVnode,pivot)
    }else if(Array.isArray(vnode.children) && vnode.children.length>0){
        //它的内部是子节点，就要递归创建节点
        for(let i=0;i<vnode.children.length;i++){
            let ch = vnode.children[i]
            let chDom = createElement(ch)
            domVnode.appendChild(chDom)
        }
    }
    // console.log('vnode.elm',vnode.elm)
    vnode.elm = domVnode
    //返回elm,elm属性是一个纯DOM对象
    return vnode.elm
}