import Dashboard from './pages/Dashboard.jsx';
import BookList from './pages/BookList.jsx';
import NewBook from './pages/NewBook.jsx';

const books = [
 {
   id: 1,
   title: 'Clean Code',
   author: 'Robert C. Martin',
   category: 'software',
   status: 'reading',
   rating: 5
 },
 {
   id: 2,
   title: 'The Pragmatic Programmer',
   author: 'Andrew Hunt and David Thomas',
   category: 'software',
   status: 'unread',
   rating: 4
 },
 {
   id: 3,
   title: 'Designing Data-Intensive Applications',
   author: 'Martin Kleppmann',
   category: 'architecture',
   status: 'finished',
   rating: 5
 }
];

const metrics = {
 totalBooks: 3,
 booksByStatus: {
   unread: 1,
   reading: 1,
   finished: 1
 }
};

function App() {
 return (
   <main>
     <header className="hero">
       <div>
         <p className="eyebrow">BookShelf API</p>
         <h1>Gestão de livros digitais</h1>
         <p>
           Aplicação full-stack demonstrativa para validar backend, frontend,
           lint, testes, build, documentação e pipeline CI/CD.
         </p>
       </div>
     </header>

     <Dashboard metrics={metrics} />
     <BookList books={books} />
     <NewBook />

     <style>{`
       body {
         margin: 0;
         font-family: Arial, sans-serif;
         background: #f3f4f6;
         color: #111827;
       }

       main {
         max-width: 1100px;
         margin: 0 auto;
         padding: 32px;
       }

       .hero {
         background: #1f2937;
         color: white;
         padding: 32px;
         border-radius: 20px;
         margin-bottom: 24px;
       }

       .eyebrow {
         color: #93c5fd;
         text-transform: uppercase;
         font-weight: 700;
         letter-spacing: 0.08em;
       }

       section {
         background: white;
         padding: 24px;
         border-radius: 16px;
         margin-bottom: 24px;
         box-shadow: 0 10px 25px rgba(0, 0, 0, 0.06);
       }

       .grid {
         display: grid;
         grid-template-columns: repeat(4, 1fr);
         gap: 16px;
       }

       .metric {
         background: #f9fafb;
         border: 1px solid #e5e7eb;
         border-radius: 14px;
         padding: 16px;
       }

       .metric span {
         display: block;
         color: #6b7280;
         margin-bottom: 8px;
       }

       .metric strong {
         font-size: 28px;
       }

       .list {
         display: grid;
         gap: 16px;
       }

       .card {
         border: 1px solid #e5e7eb;
         border-radius: 14px;
         padding: 16px;
         background: #ffffff;
       }

       .cardHeader {
         display: flex;
         align-items: center;
         justify-content: space-between;
         gap: 16px;
       }

       .status {
         font-size: 12px;
         padding: 4px 8px;
         border-radius: 999px;
         background: #e5e7eb;
       }

       .meta {
         display: flex;
         gap: 16px;
         color: #6b7280;
         font-size: 14px;
       }

       .form {
         display: grid;
         gap: 16px;
       }

       label {
         display: grid;
         gap: 6px;
         font-weight: 600;
       }

       input,
       select {
         padding: 10px;
         border: 1px solid #d1d5db;
         border-radius: 10px;
         font: inherit;
       }

       button {
         width: fit-content;
         background: #2563eb;
         color: white;
         border: 0;
         border-radius: 10px;
         padding: 12px 18px;
         font-weight: 700;
         cursor: pointer;
       }

       @media (max-width: 800px) {
         .grid {
           grid-template-columns: repeat(2, 1fr);
         }
       }

       @media (max-width: 520px) {
         .grid {
           grid-template-columns: 1fr;
         }
       }
     `}</style>
   </main>
 );
}

export default App;
