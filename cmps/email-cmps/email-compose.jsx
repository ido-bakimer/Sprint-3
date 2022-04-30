import { emailService } from '../../services/email.service.js'
import { eventBusService } from '../../services/event-bus-service.js'

export class EmailCompose extends React.Component {

    state = {
        newMail: {
            to: '',
            subject: '',
            body: '',
        }

    }

    componentDidMount() {
        const email = this.props.email
        if (email) {
            let to = email.from
            if (to === 'muki@appsus.com') to = email.to
            this.setState({ newMail: { to, subject: email.subject, body: '' } })
        }
        const info = this.props.info
        if (info) {
            if (info.imgUrl) this.setState({ newMail: { to: '', subject: '', body: info.imgUrl } })
            else if (info.txt) this.setState({ newMail: { to: '', subject: '', body: info.txt } })
            else if (info.videoUrl) this.setState({ newMail: { to: '', subject: '', body: info.videoUrl } })
            else {
                let todos = ''
                info.todos.forEach(todo => {
                    todos += todo.txt + '. '
                    if (todo.isDone) todos += 'already done'
                    todos += '|'
                });
                this.setState({ newMail: { to: '', subject: info.label, body: todos } })
            }
        }
    }

    onSendMail = (ev) => {
        ev.preventDefault()
        if (!this.state.newMail.to){this.props.onEndComposing();
            eventBusService.emit('msg', { val: `Cant sent empty filds`, isSuccess: false })
             return}
        if (!this.state.newMail.subject){this.props.onEndComposing();
            eventBusService.emit('msg', { val: `Cant sent empty filds`, isSuccess: false })
             return}
        if (!this.state.newMail.body){this.props.onEndComposing();
            eventBusService.emit('msg', { val: `Cant sent empty filds`, isSuccess: false })
              return}
        emailService.sendEmail(this.state.newMail)
            .then(() => {
                eventBusService.emit('msg', { val: `Email sent successfully`, isSuccess: true })
                this.props.onEndComposing()
            })

    }

    handleChange = ({ target }) => {
        const value = target.value
        const stateKey = target.name
        this.setState((prevState) => ({ newMail: { ...prevState.newMail, [stateKey]: value } }), () => {
        })
    }

    render() {
        return <section className="email-compose">
            <button className="delete-email-btn" onClick={this.props.onEndComposing}>x</button>
            <form className="flex column" onSubmit={this.onSendMail}>
                <input name="to" type="email" placeholder="to" value={this.state.newMail.to} onChange={this.handleChange} />
                <input name="subject" type="text" autoComplete="off" placeholder="subject" value={this.state.newMail.subject} onChange={this.handleChange} />
                <textarea name="body" rows="20" cols="100" value={this.state.newMail.body} onChange={this.handleChange}></textarea>
                <button className="send-email-btn">Send email</button>
            </form>

        </section>
    }
}