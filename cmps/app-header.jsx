const { Link, NavLink, withRouter } = ReactRouterDOM
import {eventBusService} from '../services/event-bus-service.js'
export class AppHeader extends React.Component{

    state={
    currentPage: ''
    }
    removeEvent;
    componentDidMount() {
        this.removeEvent = eventBusService.on('changeHeader', (val) => {     
            this.setState({ currentPage:val})
        })
    }
    componentWillUnmount() {
        this.removeEvent()
    }

    render(){
    return <header className="app-header flex space-between align-center pad20">
        <h3 className="YAWHO">YAWHO?   <span>{this.state.currentPage}</span></h3>

        <nav>
            <NavLink to="/" exact>Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/book">Our books</NavLink>
            <NavLink to="/email">Email</NavLink>
            <NavLink to="/keep">Keep</NavLink>
        </nav>
    </header>
    }
}
