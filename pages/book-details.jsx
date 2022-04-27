import { LongText } from "../cmps/long-text.jsx"
import { bookService } from "../services/book.service.js"
import { ReviewAdd } from "../cmps/review-add.jsx"
import { ReviewList } from "../cmps/reviews-list.jsx"

// ({ book, onGoBack, onRemoveBook })
export class BookDetails extends React.Component {

    state = {
        book: null
    }

    componentDidMount() {
        this.loadBook()
    }


    loadBook = () => {
        const { bookId } = this.props.match.params
        bookService.getById(bookId)
            .then(book => {
                if (!book) return this.props.history.push('/')
                this.setState({ book })
            })
    }

    onGoBack = () => {
        this.props.history.push('/book')
    }

    onRemoveBook = () => {
        bookService.remove(this.state.book.id)
            .then(this.onGoBack)
    }
    onRemoveReview = (reviewId,bookId) => {
        bookService.removeReview(reviewId,bookId)
        .then(()=> this.loadBook())
    }

    onSaveReview = (review) => {
        const { bookId } = this.props.match.params
        bookService.addReview(review, bookId)
            .then(() => this.loadBook())
    }



    render() {
        const { book } = this.state
        if (!book) return <div>Loading...</div>
        console.log(book);
        let displayLength = ''
        let publishDate = ''
        let name = ''
        let sale = ''
        let currency = ''
        let bookPrice
        switch (book.listPrice.currencyCode) {
        case 'EUR':
            currency = '€'
            break;
        case 'ILS':
            currency = '₪'
            break;
        case 'USD':
            currency = '$'
            break
        }
        if (book.listPrice.isOnSale) sale = 'This book is now on sale!'

        if (book.listPrice.amount > 150) name = 'red'
        if (book.listPrice.amount < 20) name = 'green'
        if (!book.listPrice.amount){
             bookPrice = 'not available'
            name =''
        }else bookPrice = book.listPrice.amount + currency

        if (2022 - book.publishedDate > 10) publishDate = 'Veteran book'
        else publishDate = 'New!'

        if (book.pageCount > 500) displayLength = 'Long reading'
        else if (book.pageCount > 200) displayLength = 'Decent reading'
        else if (book.pageCount < 100) displayLength = 'Light reading'
        else displayLength = 'not so light reading'
        return <section className="book-details">
            <h3>Name : {book.title}</h3>
            <h3 className={name}>Price : {bookPrice}</h3>
            <LongText text={book.description} />
            <p>Book Length : <span>{displayLength}</span></p>
            <p>Subtitles: {book.subtilte}</p>
            <p>Author/s: {book.authors}</p>
            <p>Published at: {book.publishedDate}</p>
            <p>Categories: {book.categories.map(cat => cat + ' ')}</p>
            <p>Language: {book.language}</p>
            <p>{publishDate} <br /> Publish date : {book.publishedDate}</p>
            <h1>{sale}</h1>

            <button onClick={this.onGoBack}>Go Back!</button>
            <button onClick={this.onRemoveBook}>Delete Book</button>

            <ReviewList reviews={book.reviews} bookId={book.id} onRemove={this.onRemoveReview} />
            <ReviewAdd onSaveReview={this.onSaveReview} />

        </section>

    }

}