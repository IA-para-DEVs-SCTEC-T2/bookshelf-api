import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App.jsx';

// ─────────────────────────────────────────────
// App — estrutura geral
// ─────────────────────────────────────────────
describe('App — estrutura geral', () => {
  test('deve renderizar o título principal da aplicação', () => {
    render(<App />);

    expect(screen.getByText('Gestão de livros digitais')).toBeInTheDocument();
  });

  test('deve renderizar o eyebrow com o nome da API', () => {
    render(<App />);

    expect(screen.getByText('BookShelf API')).toBeInTheDocument();
  });

  test('deve renderizar a descrição da aplicação', () => {
    render(<App />);

    expect(
      screen.getByText(/Aplicação full-stack demonstrativa/i)
    ).toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────
// Dashboard — métricas
// ─────────────────────────────────────────────
describe('Dashboard — métricas', () => {
  test('deve renderizar o título da seção Dashboard', () => {
    render(<App />);

    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  test('deve exibir o total de livros', () => {
    render(<App />);

    expect(screen.getByText('Total de livros')).toBeInTheDocument();
  });

  test('deve exibir o contador de livros não lidos', () => {
    render(<App />);

    expect(screen.getByText('Não lidos')).toBeInTheDocument();
  });

  test('deve exibir o contador de livros em leitura', () => {
    render(<App />);

    // "Em leitura" aparece também como opção no select do formulário
    const elements = screen.getAllByText('Em leitura');
    expect(elements.length).toBeGreaterThanOrEqual(1);
  });

  test('deve exibir o contador de livros finalizados', () => {
    render(<App />);

    expect(screen.getByText('Finalizados')).toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────
// BookList — lista de livros
// ─────────────────────────────────────────────
describe('BookList — lista de livros', () => {
  test('deve renderizar o título da seção de livros', () => {
    render(<App />);

    expect(screen.getByText('Livros cadastrados')).toBeInTheDocument();
  });

  test('deve renderizar o livro Clean Code', () => {
    render(<App />);

    expect(screen.getByText('Clean Code')).toBeInTheDocument();
  });

  test('deve renderizar o livro The Pragmatic Programmer', () => {
    render(<App />);

    expect(screen.getByText('The Pragmatic Programmer')).toBeInTheDocument();
  });

  test('deve renderizar o livro Designing Data-Intensive Applications', () => {
    render(<App />);

    expect(
      screen.getByText('Designing Data-Intensive Applications')
    ).toBeInTheDocument();
  });

  test('deve exibir o autor de Clean Code', () => {
    render(<App />);

    expect(screen.getByText(/Robert C\. Martin/i)).toBeInTheDocument();
  });

  test('deve exibir o autor de The Pragmatic Programmer', () => {
    render(<App />);

    expect(screen.getByText(/Andrew Hunt/i)).toBeInTheDocument();
  });
});

// ─────────────────────────────────────────────
// NewBook — formulário de cadastro
// ─────────────────────────────────────────────
describe('NewBook — formulário de cadastro', () => {
  test('deve renderizar o título da seção Novo livro', () => {
    render(<App />);

    expect(screen.getByText('Novo livro')).toBeInTheDocument();
  });

  test('deve renderizar o campo Título', () => {
    render(<App />);

    expect(screen.getByPlaceholderText('Título do livro')).toBeInTheDocument();
  });

  test('deve renderizar o campo Autor', () => {
    render(<App />);

    expect(screen.getByPlaceholderText('Nome do autor')).toBeInTheDocument();
  });

  test('deve renderizar o select de Categoria com as opções corretas', () => {
    render(<App />);

    expect(screen.getByText('Software')).toBeInTheDocument();
    expect(screen.getByText('Arquitetura')).toBeInTheDocument();
    expect(screen.getByText('Dados')).toBeInTheDocument();
    expect(screen.getByText('Carreira')).toBeInTheDocument();
  });

  test('deve renderizar o select de Status com as opções corretas', () => {
    render(<App />);

    expect(screen.getByText('Não lido')).toBeInTheDocument();
    // "Em leitura" aparece também no Dashboard — usa getAllByText
    expect(screen.getAllByText('Em leitura').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('Finalizado')).toBeInTheDocument();
  });

  test('deve renderizar o botão de cadastro', () => {
    render(<App />);

    expect(
      screen.getByRole('button', { name: /Cadastrar livro/i })
    ).toBeInTheDocument();
  });
});
