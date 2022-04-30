import { emailService } from '../services/email.service.js'
import { noteService } from '../services/Keep.service.js'
import { eventBusService } from '../services/event-bus-service.js'

import { EmailList } from '../cmps/email-cmps/email-list.jsx'
import { EmailFilter } from '../cmps/email-cmps/email-filter.jsx'
import { EmailStatus } from '../cmps/email-cmps/email-status.jsx'
import { EmailCompose } from '../cmps/email-cmps/email-compose.jsx'

export class EmailApp extends React.Component {

    state = {
        emails: [],
        showByStatus: null,
        previewclicked: null,
        filterBy: {},
        isCopmposing: false,
    }

    componentDidMount() {
        eventBusService.emit('changeHeader',`Email`)
        this.loadEmails()
        const seearchParams = new URLSearchParams(this.props.location.search);
        const status = seearchParams.get('status');
        this.onSetShowByStatus(status)
    }

    loadEmails = () => {
        emailService.query(this.state.showByStatus, this.state.filterBy)
            .then(emails => this.setState({ emails }))
    }

    onSetShowByStatus = (status) => {
        if (status === 'null') return
        this.setState({ showByStatus: status }, () => {
            this.loadEmails()
        })
    }
    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, () => {
            this.loadEmails()
        })
    }

    onPreviewClick = (email) => {
        console.log(email);
        if (!email.isRead) {
            emailService.updateEmail(email.id, { isRead: true }).then(this.loadEmails)
        }
        this.props.history.push(`/email/${email.id}?status=${this.state.showByStatus}`)
    }
    onRemove = (ev, email) => {
        ev.stopPropagation()
        emailService.updateEmail(email.id, { removeAt: Date.now(), status: 'trash' })
            .then(()=>{
                this.loadEmails()
                eventBusService.emit('msg',{val:`Email transferred to trash`,isSuccess:true})
            })
        if (email.removeAt) {
            emailService.remove(email.id)
                .then(()=>{
                    this.loadEmails()
                    eventBusService.emit('msg',{val:`Email deleted successfully`,isSuccess:true})
                })
        }
    }

    onRecycle = (ev, email) => {
        ev.stopPropagation()
        let status = email.to
        if (status === 'muki@appsus.com') status = 'inbox'
        else status = 'sent'
        emailService.updateEmail(email.id, { removeAt: null, status }).then(()=>{
            this.loadEmails()
            eventBusService.emit('msg',{val:`Email restored successfully`,isSuccess:true})})
    }

    onToggleStar = (ev, email) => {
        ev.stopPropagation()
        const change = !email.isStarred
        emailService.updateEmail(email.id, { isStarred: change })
            .then(this.loadEmails)
    }

    onToggleRead = (ev, email) => {
        ev.stopPropagation()
        const change = !email.isRead
        emailService.updateEmail(email.id, { isRead: change })
            .then(this.loadEmails)
    }

    onStartComposing = () => {
        this.setState({ isCopmposing: true })
        // this.props.history.push('/email/compose')
    }
    onEndComposing = () => {
        this.setState({ isCopmposing: false })
    }

    makeNotefromEmail = (ev, email) => {
        ev.stopPropagation()
        let val = `Note from mail: |from: ${email.from} |to: ${email.to} |subject: ${email.subject} |body: ${email.body}`

        noteService.createNote(val, 'NoteText')
        eventBusService.emit('msg',{val:`note created successfully`,isSuccess:true})

    }



    render() {
        const { emails } = this.state

        return <div className="email-app">
            <EmailStatus onStartComposing={this.onStartComposing} onSetShowByStatus={this.onSetShowByStatus} showByStatus={this.state.showByStatus} />
            <div className="email-body">
            <EmailFilter emails={emails} onSetFilter={this.onSetFilter} loadEmails={this.loadEmails} />
            {this.state.isCopmposing && <EmailCompose onEndComposing={this.onEndComposing} />}
                <EmailList emails={emails} onPreviewClick={this.onPreviewClick} onRemove={this.onRemove} onToggleStar={this.onToggleStar} onToggleRead={this.onToggleRead} onRecycle={this.onRecycle} makeNotefromEmail={this.makeNotefromEmail} />
            </div>
        </div>
    }
}