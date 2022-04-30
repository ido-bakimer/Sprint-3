import { EmailSort } from "./email-sort.jsx";


export class EmailFilter extends React.Component {

    state = {
        filterBy: {
            read: '',
            content: '',
            star: ''
        }
    }

    handleChange = ({ target }, callBack) => {
        const field = target.name
        this.setState(prevState => ({ filterBy: { ...prevState.filterBy, [field]: target.value } }), callBack)
    }


    onFilter = (ev) => {
        if (ev) ev.preventDefault()
        this.props.onSetFilter(this.state.filterBy)
    }

    render() {
        const { content, read, star } = this.state.filterBy
        return <section className="email-filter">
            <form onSubmit={this.onFilter}>
                <label htmlFor="by-content">Filter by:</label>
                <input type="text" id="by-content" placeholder="Search" name="content"
                    value={content} onChange={this.handleChange} />
                <button>Search</button>
                <label htmlFor="read" title="Filter by read">
                    <select name="read" id="read" onChange={(ev) => { this.handleChange(ev, this.onFilter) }}>
                        <option value="">ALL</option>
                        <option value="unread">unread</option>
                        <option value="read">read</option>
                    </select>
                    </label>
                <label htmlFor="star" title="Filter by star">
                    <select name="star" id="star" onChange={(ev) => { this.handleChange(ev, this.onFilter) }}>
                        <option value="">ALL</option>
                        <option value="unstarred">unstarred</option>
                        <option value="starred">starred</option>
                    </select>
                </label>
            </form>
            <EmailSort emails={this.props.emails} loadEmails={this.props.loadEmails}/>

        </section>
    }

}
