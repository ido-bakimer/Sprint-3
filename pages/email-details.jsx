import { emailService } from '../services/email.service.js'
import { EmailStatus } from '../cmps/email-cmps/email-status.jsx'
import { EmailBtns } from '../cmps/email-cmps/email-btns.jsx'
import { EmailCompose } from '../cmps/email-cmps/email-compose'
export class EmailDetails extends React.Component {
    state = {
        email: null,
        isCopmposing: false,
        isReplying: false,
        showByStatus: null
    }

    componentDidMount() {
        this.loadEmail()
        const seearchParams = new URLSearchParams(this.props.location.search);
        const showByStatus = seearchParams.get('status');
        this.setState({ showByStatus })
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
        const email = this.state.email
        emailService.updateEmail(email.id, { removeAt: Date.now(), status: 'trash' })
            .then(()=>{
                this.onGoBack()
                eventBusService.emit('msg',{val:`Email transferred to trash`,isSuccess:true})
            })
            if (email.removeAt) {
                emailService.remove(email.id)
                .then(()=>{
                    this.onGoBack()
                    eventBusService.emit('msg',{val:`Email deleted successfully`,isSuccess:true})
                })
        }
    }
    onRecycle = () => {
        const email = this.state.email
        let status = email.to
        if (status === 'muki@appsus.com') status = 'inbox'
        else status = 'sent'
        emailService.updateEmail(email.id, { removeAt: null, status: 'trash' })
            .then(()=>{
                this.loadEmail()
                eventBusService.emit('msg',{val:`Email restored successfully`,isSuccess:true})
            })
    }


    onSetShowByStatus = (status) => {
        this.props.history.push(`/email?status=${status}`)
    }

    onStartComposing = () => {
        this.setState({ isCopmposing: true, isReplying: false })
    }

    onEndComposing = () => {
        this.setState({ isCopmposing: false, isReplying: false })
    }
    onReplying = () => {
        this.setState({ isReplying: true, isCopmposing: false })
    }

    onToggleStar = (ev, email) => {
        ev.stopPropagation()
        const change = !email.isStarred
        emailService.updateEmail(email.id, { isStarred: change })
            .then(this.loadEmail)
    }
    onToggleRead = (ev, email) => {
        ev.stopPropagation()
        const change = !email.isRead
        emailService.updateEmail(email.id, { isRead: change })
            .then(this.loadEmail)
    }

    render() {
        const { email } = this.state
        if (!email) return <h1></h1>
        return <div className="email-details">
            <div className= "email-details-navbar">
            <EmailStatus onStartComposing={this.onStartComposing} onSetShowByStatus={this.onSetShowByStatus} showByStatus={this.state.showByStatus} />
            </div>
            <div className="email-details-body">
            <EmailBtns email={this.state.email} onToggleStar={this.onToggleStar} onRemove={this.onRemove} onToggleRead={this.onToggleRead} onReplying={this.onReplying} onRecycle={this.onRecycle} />
            <h1>{email.status === 'inbox' ? email.from : email.to}</h1>
            <h2>subject: {email.subject}</h2>
            <p>{email.body}</p>
            {this.state.isCopmposing && <EmailCompose onEndComposing={this.onEndComposing} />}
            {this.state.isReplying && <EmailCompose onEndComposing={this.onEndComposing} email={this.state.email} />} 
            </div>
        </div>
    }

}