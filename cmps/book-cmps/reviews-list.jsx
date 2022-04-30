

export function ReviewList({reviews,bookId,onRemove}){
if(!reviews) return <section></section>
    return <section >
        {reviews.map(review =>{
            return <div className="review-card">
            <button onClick={() => {onRemove(review.id,bookId)}}>x</button>
            <p>Name: {review.name}</p>
            <p>stars: {review.stars}</p>
            <p>Date of review: {review.date}</p>
            <p>Review: {review.review}</p>
            </div>

            })}
    </section>

    
    
}