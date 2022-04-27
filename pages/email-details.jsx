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
                console.log(email);
                if (!email) return this.props.history.push('/email')
                this.setState({ email })
            })
    }
    render(){
        const { email } = this.state
        console.log(email);
        if(!email) return <h1></h1>
        return <div className="email-details">
            <h1>{email.from}</h1>
            <h2>subject: {email.subject}</h2>
            <p>{email.body}</p>

        </div>
    }

}