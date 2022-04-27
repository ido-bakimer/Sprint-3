import { emailService } from '../services/email.service.js'

import { EmailList } from '../cmps/email-cmps/email-list.jsx'

export class EmailApp extends React.Component{

    state = {
        emails: [],
        filterBy: null,
        previewclicked: null,
    }

    componentDidMount() {
        this.loadEmails()
    }

    loadEmails = () => {
        emailService.query(this.state.filterBy)
            .then(emails => this.setState({ emails }))
    }
    
    onPreviewClick = (email) => {
        console.log(email);
        if (!email.isRead) {
          emailService.updateEmail(email.id, { isRead: true }).then(this.loadEmails)
        }
        this.props.history.push('/email/' + email.id)
      }


    render(){
        const {emails} = this.state

        return <div className="email-app">
            <EmailList emails={emails} onPreviewClick={this.onPreviewClick}/>
        </div>
    }
}