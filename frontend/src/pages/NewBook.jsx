function NewBook() {
 return (
   <section>
     <h2>Novo livro</h2>

     <form className="form">
       <label>
         Título
         <input type="text" placeholder="Título do livro" />
       </label>

       <label>
         Autor
         <input type="text" placeholder="Nome do autor" />
       </label>

       <label>
         Categoria
         <select defaultValue="software">
           <option value="software">Software</option>
           <option value="architecture">Arquitetura</option>
           <option value="data">Dados</option>
           <option value="career">Carreira</option>
         </select>
       </label>

       <label>
         Status
         <select defaultValue="unread">
           <option value="unread">Não lido</option>
           <option value="reading">Em leitura</option>
           <option value="finished">Finalizado</option>
         </select>
       </label>

       <button type="button">Cadastrar livro</button>
     </form>
   </section>
 );
}

export default NewBook;
