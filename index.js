
const MyReact = {

}

const MyReactDOM = {
    render
}


MyReact.createElement = function(tag,attrs,...children) {
    return {
        tag,
        attrs,
        children
    }
}

let name = 'hello world!!!'
let number = 200

function handleClick (e) {
    console.log('事件对象',e)
}

//JSX会转换成虚拟DOM，虚拟DOM是一个对象，每一个虚拟DOM对象都包含tag，attrs，children属性。
let htmlDOM = (
    <div className={'wrapper'}>
        {name} {number}
        <button onClick={handleClick} style={{color: 'red'}}>点击</button>
    </div>   
)

console.log(htmlDOM)

function render(vnode,container) {
    if(typeof vnode === 'string' || typeof vnode === 'number') {
        return container.append(document.createTextNode(vnode))
    }
    if(typeof vnode === 'object') {
        let dom = document.createElement(vnode.tag)
        setAttribute(dom,vnode.attrs)
        if(Array.isArray(vnode.children) && vnode.children.length > 0) {
            vnode.children.map( vnodeChild => {
                render(vnodeChild,dom)
            })
        }
        container.append(dom)
    }
}

//给DOM元素设置属性
function setAttribute(dom,attrs) {
    for(let key in attrs) {
        if(/^on/.test(key)) {
            dom[key.toLowerCase()] = attrs[key]
        } else if(key === 'style') {
            Object.assign(dom.style,attrs[key])
        } else {
            dom[key] = attrs[key]   //这样直接赋值的话，style属性和onclick事件就没法绑定,需要做一个判断
        }
    }
}


MyReactDOM.render(htmlDOM,document.getElementById('root'))