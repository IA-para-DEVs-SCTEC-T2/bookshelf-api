import BookCard from '../components/BookCard.jsx';

function BookList({ books }) {
 return (
   <section>
     <h2>Livros cadastrados</h2>

     <div className="list">
       {books.map((book) => (
         <BookCard key={book.id} book={book} />
       ))}
     </div>
   </section>
 );
}

export default BookList;
