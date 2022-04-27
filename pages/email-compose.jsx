import { emailService } from '../services/email.service.js'

export class EmailCompose extends React.Component{

    state={
        newMail:{
           to: '',
            subject: '',
            body: '',
        }

    }
onSendMail= (ev) => {
    ev.preventDefault()
    emailService.sendEmail(this.state.newMail)
    .then(this.onCloseComposing)

}

onCloseComposing = ()=>{
    this.props.history.push('/email')
}
handleChange = ({ target }) => {
    const value = target.value
    const stateKey = target.name
    this.setState((prevState) => ({ newMail: { ...prevState.newMail, [stateKey]: value } }), () => {
    })
}

    render(){
        return <section className="email-compose">
            <button onClick={this.onCloseComposing}>❌</button>
            <form className="flex column" onSubmit={this.onSendMail}>
                <input name="to" type="email" placeholder="to" onChange={this.handleChange} />

                <input name="subject" type="text" placeholder="subject" onChange={this.handleChange} />
                <textarea name="body" rows="20" cols="100" onChange={this.handleChange}></textarea>
                <button>Send email</button>
            </form>
            
            </section>
    }
}