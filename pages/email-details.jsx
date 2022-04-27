import { emailService } from '../services/email.service.js'

export class EmailDetails extends React.Component{
    state ={
        email: null
    }

    ComponentDidMount(){
        this.loadEmail()
    }

    loadEmail = () => {
        const { emailId } = this.props.match.params
        emailService.getById(emailId)
            .then(email => {
                console.log(email);
                if (!email) return this.props.history.push('/email')
                this.setState({ email })
            })
    }
    render(){
        const { email } = this.state
        console.log(this.props.match.params);
        return <div className="email-details">
            <h1>{email.from}</h1>
            <h2>subject: <h3>{email.subject}</h3></h2>
            <p>{email.body}</p>

        </div>
    }

}