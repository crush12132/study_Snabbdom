import {
    init,
    classModule,
    propsModule,
    styleModule,
    eventListenersModule,
    h
  } from "snabbdom";
const container = document.getElementById('container');
const btn = document.getElementById('btn')
const patch = init([classModule,propsModule,styleModule,eventListenersModule,h])
const vnode1 = h('div',{},[
    h('p',{key:'A'},'A'),
    h('p',{key:'B'},'B'),
    h('p',{key:'C'},'C'),
    h('p',{key:'D'},'D'),
])
patch(container,vnode1)

const vnode2 = h('div',{},h('section',{},[
  h('li',{key:'E'},'E'),
  h('li',{key:'A'},'A'),
  h('li',{key:'B'},'B'),
  h('li',{key:'C'},'C'),
  h('li',{key:'D'},'D'),
]))
btn.addEventListener('click',function(){
   patch(vnode1,vnode2)
})
