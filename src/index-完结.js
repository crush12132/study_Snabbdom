import patch from './mySnabbdom/patch'
import h from './mySnabbdom/h'
const container = document.getElementById('container')
const btn = document.getElementById('btn')
const vnode1 = h('ul',{},[
    // h('li',{key:'0'},0),
    h('li',{key:'1'},1),
    h('li',{key:'2'},2),
    h('li',{key:'3'},3),
    h('li',{key:'4'},4),
    h('li',{key:'5'},5),
   
])
patch(container,vnode1)

const vnode2 = h('ul',{},[   
    h('li',{key:'5'},5),
    h('li',{key:'4'},4),
    h('li',{key:'3'},3),
    h('li',{key:'44'},44),
    h('li',{key:'2'},2),
    h('li',{key:'1'},1),
    h('li',{key:'0'},0),
    h('li',{key:'12'},12),
    h('li',{key:'11'},11),
    h('li',{key:'13'},13),
    h('li',{key:'14'},14),
])

btn.addEventListener('click',function(){
    patch(vnode1,vnode2)
 })