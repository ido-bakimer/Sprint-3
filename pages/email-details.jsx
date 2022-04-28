import { emailService } from '../services/email.service.js'

export class EmailDetails extends React.Component{
    state ={
        email: null
    }

    componentDidMount(){
        this.loadEmail()
    }

    loadEmail = () => {
        const { emailId } = this.props.match.params
        emailService.getById(emailId)
            .then(email => {
                if (!email) return this.props.history.push('/email')
                this.setState({ email })
            })
    }

    onGoBack = () => {
        this.props.history.push('/email')
    }

    onRemove = () => {
        emailService.remove(this.state.email.id)
            .then(this.onGoBack)
    }
    
    render(){
        const { email } = this.state
        if(!email) return <h1></h1>
        return <div className="email-details">
            <div className="email-btns">
                <button onClick={this.onRemove} title="Delete email">🗑️</button>
                <button onClick={this.onGoBack} title="Go back">⬅️</button>
            </div>
            <h1>{email.status==='inbox'?email.from:email.to}</h1>
            <h2>subject: {email.subject}</h2>
            <p>{email.body}</p>

        </div>
    }

}