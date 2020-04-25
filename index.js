import MyReact from './lib/MyReact'
import MyReactDOM from './lib/MyReactDOM'

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
        <App/>
    </div>   
)

// console.log(htmlDOM)  //这个最后结果是React元素也即虚拟DOM
let hobbies = ['打球', '吃饭','打豆豆']
function Hobby(props) {
    // console.log('props',props)
    return (
      <div>我的兴趣是
        <ul>
            { props.hobbies.map(hobby => <li>{ hobby }</li>) }   
        </ul>
      </div>
    )
  }

class Job extends MyReact.Component {
    render() {
        return (
            <div className='job' onClick={handleClick}>
                前端开发
            </div>
        )
    }
}

class App extends MyReact.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: 'jack'
        }
    }
    changeName() {
        this.setState({
            name: 'tom'
        })
    }
    render() {
        return (
            <div className='title'>
                <span>姓名: {this.state.name}</span>
                <button onClick={this.changeName.bind(this)}>点击切换名字</button>
                <Job className='job' />
                <Hobby hobbies={hobbies} className='hobby' />
            </div>
        )
    }
    alert () {
        console.log(this)
    }
}

MyReactDOM.render(<App/>,document.getElementById('root'))  //此时App就是一个组件

//上面相当于
//MyReactDOM.render(MyReact.createElement(App, null), document.getElementById('root'));

// MyReactDOM.render(htmlDOM,document.getElementById('root'))


//Myreact.createElement函数的第三个参数开始都是第一个参数的子节点。
//Myreact.createElement('div',{className: 'title'},name,number,Myreact.createElement.createElement(...))
//babel通过调用React.createElement函数将JSX语法转换成下面这个样子。
//将上面的JSX转换为React.createElement函数的参数 tag，attrs，children

//babel的jsx转换插件会将jsx转换成下面的这种形式
//  let element = {
//     tag: 'div',
//     attrs: {
//         className: 'wrapper'
//     },
//     children: [
//         'hello world!!!', '',200,{
//         tag: 'button',
//         attrs: {
//             onclick: handleClick,
//             style: {
//                 color: 'red'
//             }
//         },
//         children: ['点击']
//     }]
// }

//调用render函数将虚拟DOM渲染到页面上去
// render(htmlDOM,document.getElementById('root'))


// render(MyReact.createElement(App, null),document.getElementById('root'))

// function render(vnode,container) {
//     console.log(vnode)
//     console.log(1)
//     if(typeof vnode === 'string' || typeof vnode === 'number') {
//         let dom = document.createTextNode(vnode)
//         container.append(dom)
//     }
//     if(typeof vnode === 'object') {
//         if( typeof vnode.tag === 'function') {
//             console.log(vnode.tag)  //是一个构造函数，则创建一个组件
//             let component = createComponent(vnode.tag)
//             console.log('test')
//         }
//         let dom = document.createElement(vnode.tag,vnode.attrs)
//         // setAttribute(dom,vnode.attrs)
//         if(Array.isArray(vnode.children) && vnode.children.length > 0) {
//             vnode.children.forEach( child => {
//                 //递归
//                 render(child,dom)
//             })
//         }
//         container.append(dom)
//     }
// }

// function createComponent(constructor,attrs) {
//     let component = new constructor(attrs)
//     console.log(component)
//     console.log(2020)
// }