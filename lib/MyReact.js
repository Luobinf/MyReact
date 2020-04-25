import MyReactDOM from './MyReactDOM';
/**
 * 
 * @param {String} tag 
 * @param {Object} attrs 
 * @param  {String | Object} children 
 */
function createElement(tag,attrs,...children) {
    return {
        tag,
        attrs,
        children
    }
}

class Component {
    constructor(props = {}) {
        this.props = props
        this.state = {}
    }
    setState(state) {
        Object.assign(this.state,state) //合并
        console.log(this.state)
        MyReactDOM.render()
    }
}



export default {
    createElement,
    Component
}