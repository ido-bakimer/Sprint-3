const { Link } = ReactRouterDOM
export function BookPreview({ book }) {
    let txt = ''
    switch (book.listPrice.currencyCode) {
        case 'EUR':
            txt = '€'
            break;
        case 'ILS':
            txt = '₪'
            break;
        case 'USD':
            txt = '$'
            break
    }
    return <Link to={`/book/${book.id}`}>
     <article className="book-preview flex column align-center">
        <h3>Title : {book.title}</h3>
        <img className="img-container" src={`${book.thumbnail}`} />
        <h3>Price : {book.listPrice.amount}<span>{txt}</span></h3>
    </article>
    </Link>
}