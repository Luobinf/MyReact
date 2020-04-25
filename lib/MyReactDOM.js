import MyReact from './MyReact'

const MyReactDOM = {
    render,
    setAttribute,
    // renderComponent
}

function render(vnode,container) {
    // console.log(vnode)
    if(!vnode) return

    if(typeof vnode === 'string' || typeof vnode === 'number') {
        let dom = document.createTextNode(vnode)
        container.append(dom)
        return
    } else if(Array.isArray(vnode)) {
        let dom = document.createDocumentFragment()
        vnode.forEach( child => {
            // console.log(child)
            render(child,dom) //递归渲染
        })
        container.append(dom)
    } else if(typeof vnode === 'object') {
        let dom,child
        if( typeof vnode.tag === 'function') {
            // console.log(vnode.tag)  //是一个构造函数，则创建一个组件
            dom = document.createDocumentFragment()
            child = createVnodeFromComponent(vnode.tag,vnode.attrs)  //{}
            render(child,dom)
        } else {
            dom = document.createElement(vnode.tag)
            setAttribute(dom,vnode.attrs)
            if(Array.isArray(vnode.children) && vnode.children.length > 0) {
                vnode.children.forEach( child => {
                    //递归
                    render(child,dom)
                })
            }
        }
        container.append(dom)
    }
}

// 从组件中创建虚拟DOM
function createVnodeFromComponent(constructor,attrs) {
    let component,vnode
    if(constructor.prototype instanceof MyReact.Component) {  //class组件
        component = new constructor(attrs)
        vnode = component.render(attrs) //得到vnode
        // console.log(attrs)
    } else {  //函数组件
        // console.log(attrs)
        component = new MyReact.Component(attrs)
        component.constructor = constructor //构造函数重新指向
        component.render = function () {
            return this.constructor(attrs)
        }
        vnode = component.render(attrs)
    }
    return vnode

}


function renderComponent(component) {
    
}


//给DOM元素设置属性
function setAttribute(dom, attrs) {
    if (!attrs) {
        return
    }
    for (let key in attrs) {
        if (/^on/.test(key)) {
            dom[key.toLowerCase()] = attrs[key]
        } else if (key === 'style') {
            //这样直接赋值的话，style属性和onclick事件就没法绑定,需要做一个判断
            Object.assign(dom.style, attrs[key])
        } else {
            dom[key] = attrs[key]
        }
    }
}


export default MyReactDOM


