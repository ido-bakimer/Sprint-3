import { bookService } from '../services/book.service.js'
import { eventBusService } from '../services/event-bus-service.js'

import { GoogleSearch } from '../cmps/book-cmps/google-search.jsx'
import { BookList } from '../cmps/book-cmps/book-list.jsx'
import { BookFilter } from '../cmps/book-cmps/book-filter.jsx'



export class BookApp extends React.Component {

    state = {
        books: [],
        filterBy: null,
    }

    componentDidMount() {
        eventBusService.emit('changeHeader',`Books`)
        this.loadBooks()
    }

    loadBooks = () => {
        bookService.query(this.state.filterBy)
            .then(books => this.setState({ books }))
    }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, () => {
            this.loadBooks()
        })
    }



    render() {
        const { books } = this.state
        return <section className="book-app">
                <GoogleSearch loadBooks={this.loadBooks}/>
                <BookFilter onSetFilter={this.onSetFilter} />
                <BookList books={books} onSelectBook={this.onSelectBook} />

        </section>
    }


}