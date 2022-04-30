import {eventBusService} from '../services/event-bus-service.js'



export class MsgBox extends React.Component{

    state = {
        val: '',
        isSuccess: true,
        clearTimeOut: null
    }
    removeEvent;

    componentDidMount() {
        this.removeEvent = eventBusService.on('msg', ({val ,isSuccess}) => {   
            clearTimeout(this.state.clearTimeOut)
            this.setState({ val, isSuccess })
            this.state.clearTimeOut = setTimeout(()=>this.setState({val:''}),3000)
        })
    }

    componentWillUnmount() {
        this.removeEvent()
    }
    render(){
        if(!this.state.val) return null
        const msgClass = this.state.isSuccess?'success':'error'
        return<div className={`msg-box ${msgClass}`}>
            {this.state.val}
        </div>
    }

}