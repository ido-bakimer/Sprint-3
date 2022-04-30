

export class ReviewAdd extends React.Component {
    state = {
        review: {
            name: '',
            stars: '',
            date: '',
            review: '',
        }
    }

    onAddReview = (ev) => {
        ev.preventDefault()
        this.props.onSaveReview(this.state.review)
        this.setState({  review: {
            name: '',
            stars: '',
            date: '',
            review: '',
        } })
    }

    handleChange = ({ target }) => {
        const value = target.value
        const stateKey = target.name
        this.setState((prevState) => ({ review: { ...prevState.review, [stateKey]: value } }), () => {
        })
    }

    render() {
        return <section className="reviews">
            <form onSubmit={this.onAddReview}>
                <input name="name" type="text" placeholder="Your name" onChange={this.handleChange} />
                <label htmlFor="stars">
                    <select name="stars" id="stars" onChange={this.handleChange}>
                        <option value="1">1 Star!</option>
                        <option value="2">2 Stars!</option>
                        <option value="3">3 Stars!</option>
                        <option value="4">4 Stars!</option>
                        <option value="5">5 Stars!</option>
                    </select>
                </label>
                <input name="date" type="date" onChange={this.handleChange} />
                <textarea name="review" id="review" rows="4" cols="30" onChange={this.handleChange}></textarea>
                <button>Save review!</button>
            </form>
        </section>
    }
}