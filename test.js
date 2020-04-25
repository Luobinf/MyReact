
//...展开运算符，将剩余的参数都丢到一个数组里面去了。
// function fn(name,age,...children) {
//     console.log(children)
//     return {
//       name,
//       age,
//       children
//     }
//   }

import MyReact from "./lib/MyReact"
import { func } from "assert-plus"

  
//   let obj = fn('luobin',23,'jack','address')
//   console.log(obj)

// function renderComponent () {

// }
// class Component {
//     constructor(props) {
//         this.props = props
//         this.state = {}

//         renderComponent()
//     }
// }

// class App extends Component {
//     constructor(props) {
//         super(props)
//     }
//     render() {
//         console.log(this)
//         return '你好'
//     }
// }
// let app = new App()
// console.log(app.__proto__ === App.prototype)
// console.log(App.prototype.__proto__ === Component.prototype)
// console.log(app)

// console.log(App)  // App是构造函数


function createElement(tag,attrs,...children) {
    return {
        tag,
        attrs,
        children
    }
}

// function render(vnode,container) {
//     container.innerHTML = ''
//     _render(vnode,container)
// }

function render(vnode,container) {
    if(typeof vnode === 'string' || typeof vnode === 'number') {
        let dom = document.createTextNode(vnode)
        container.append(dom)
    }
    if(typeof vnode === 'object') {
        let dom,vnode
        if( typeof vnode.tag === 'function') {
            console.log(vnode.tag)  //是一个构造函数，则创建一个组件
            dom = document.createDocumentFragment()
            child = createVnodeFromComponent(vnode.tag,vnode.attrs)  //{}
            render(child,dom)
        } else {
            dom = document.createElement(vnode.tag,vnode.attrs)
            // setAttribute(dom,vnode.attrs)
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

function createVnodeFromComponent(constructor,attrs) {
    let component,vnode
    if(constructor.prototype instanceof MyReact.Component) {  //class组件
        component = new constructor(attrs)
        vnode = component.render(attrs) //得到vnode
    } else {  //函数组件
        component = new MyReact.Component(attrs)
        component.constructor = constructor //构造函数重新指向
        component.render = function () {
            return this.constructor(attrs)
        }
        vnode = component.render(attrs)
    }
    return vnode

}