function BookCard({ book }) {
 return (
   <article className="card">
     <div className="cardHeader">
       <strong>{book.title}</strong>
       <span className={`status ${book.status}`}>{book.status}</span>
     </div>

     <p>Autor: {book.author}</p>

     <div className="meta">
       <span>Categoria: {book.category}</span>
       <span>Avaliação: {book.rating}</span>
     </div>
   </article>
 );
}

export default BookCard;
