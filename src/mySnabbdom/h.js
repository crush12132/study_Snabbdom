import vnode from './vnode'

/**
 * h('a',{},'')
 * h('a',{},[])
 * h('a',{},{}) //这里对象的形式就是一个h()函数，h()函数返回的是一个对象
 */
export default function (sel,data,c){

    if(arguments.length!=3){
        throw new Error('传入的参数不能少于3!!!')
    }
    if(typeof c =='string'||typeof c =='number'){
        return vnode(sel,data,undefined,c,undefined)
    }else if(Array.isArray(c)){
        let children = []
        for(let i=0;i<c.length;++i){
            if(!(typeof c[i] == 'object' && c[i].hasOwnProperty('sel')))
               throw new Error('传入的参数不是h函数!!!')
                    children.push(c[i])
           
        }
        return vnode(sel,data,children,undefined,undefined)

    }else if(typeof c == 'object'&& c.hasOwnProperty('sel')){
       let children = [c]
       return vnode(sel,data,children,undefined,undefined)
    }else{
        throw new Error('传入的参数类型不对')
    }
}
