function Dashboard({ metrics }) {
 return (
   <section>
     <h2>Dashboard</h2>

     <div className="grid">
       <div className="metric">
         <span>Total de livros</span>
         <strong>{metrics.totalBooks}</strong>
       </div>

       <div className="metric">
         <span>Não lidos</span>
         <strong>{metrics.booksByStatus.unread}</strong>
       </div>

       <div className="metric">
         <span>Em leitura</span>
         <strong>{metrics.booksByStatus.reading}</strong>
       </div>

       <div className="metric">
         <span>Finalizados</span>
         <strong>{metrics.booksByStatus.finished}</strong>
       </div>
     </div>
   </section>
 );
}

export default Dashboard;
