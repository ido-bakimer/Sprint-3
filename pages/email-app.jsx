import { emailService } from '../services/email.service.js'

import { EmailList } from '../cmps/email-cmps/email-list.jsx'

export class EmailApp extends React.Component{

    state = {
        emails: [],
        showByStatus: null,
        previewclicked: null,
        filterBy:{},
    }

    componentDidMount() {
        this.loadEmails()
    }

    loadEmails = () => {
        emailService.query(this.state.showByStatus,this.state.filterBy)
            .then(emails => this.setState({ emails }))
    }

    onSetShowByStatus = (status) => {
        this.setState({ showByStatus: status }, () => {
            console.log('ShowByStatus from email App', this.state.showByStatus);
            this.loadEmails()
        })
    }
    onSetFilter = (filterBy)=>{
        this.setState({ filterBy }, () => {
            this.loadEmails()
        })
    }
    
    onPreviewClick = (email) => {
        console.log(email);
        if (!email.isRead) {
          emailService.updateEmail(email.id, { isRead: true }).then(this.loadEmails)
        }
        this.props.history.push('/email/' + email.id)
      }
      onRemove = (ev,id) => {
          ev.stopPropagation()
        emailService.remove(id)
            .then(this.loadEmails)
    }
    onStartComposing = ()=>{
        this.props.history.push('/email/compose')
    }



    render(){
        const {emails} = this.state

        return <div className="email-app">
            <EmailList emails={emails} onPreviewClick={this.onPreviewClick} onStartComposing={this.onStartComposing} onSetShowByStatus={this.onSetShowByStatus} onSetFilter={this.onSetFilter} onRemove={this.onRemove} loadEmails={this.loadEmails}/>

        </div>
    }
}