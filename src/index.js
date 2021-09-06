import {
    init,
    classModule,
    propsModule,
    styleModule,
    eventListenersModule,
    h,
  } from "snabbdom";

  //创建出patch函数
  const patch = init([classModule,propsModule,styleModule,eventListenersModule])
  
  //创建虚拟节点
  const vNode1 = h('a',{props:{href:'http://www.baidu.com'}},'百度')
  const vNode2 = h('ul',[
    h('li','西瓜'),
    h('li','葡萄'),
    h('li','香蕉'),
  ])
  //让虚拟节点上树
  const container = document.getElementById('container')
  patch(container,vNode1)
  patch(vNode1,vNode2)
  console.log(vNode1)