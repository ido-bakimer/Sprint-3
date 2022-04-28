import { emailService } from "../../services/email.service.js";

export class EmailSort extends React.Component {

    state = {
        isReverse: false,
        emails:null
    }


    componentDidMount = ()=>{
        emailService.query(null,{})
       .then((emails)=>this.setState({emails})).then(()=>this.sortByDate())
    }

    sortByDate = () => {
        const {emails} = this.state
            emails.sort(function (emailA, emailB) {
                return emailA.sentAt - emailB.sentAt;
            });
            if(!this.state.isReverse) emails.reverse()
            emailService.sortEmails(emails)
            .then(()=>this.props.loadEmails())
    }
    
    sortBy = ({ target }) => {
        if (target.value === 'date') this.sortByDate()
    }

    render() {
        return <div className="email-sort">
            <label htmlFor="sort" title="Sort by">
                <select name="sort" id="sort" onChange={(ev) => { this.sortBy(ev) }}>
                    <option value="date">Date</option>
                    <option value="subject">Subject</option>
                </select>
            </label>
        </div>
    }
}