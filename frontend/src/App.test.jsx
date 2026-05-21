import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App.jsx';

test('deve renderizar o título principal da aplicação', () => {
  render(<App />);

  expect(
    screen.getByText('Gestão de livros digitais')
  ).toBeInTheDocument();
});

test('deve renderizar a seção Dashboard', () => {
  render(<App />);
  expect(screen.getByText('Dashboard')).toBeInTheDocument();
});

test('deve renderizar a seção Livros cadastrados', () => {
  render(<App />);
  expect(screen.getByText('Livros cadastrados')).toBeInTheDocument();
});

test('deve renderizar a seção Novo livro', () => {
  render(<App />);
  expect(screen.getByText('Novo livro')).toBeInTheDocument();
});

test('deve renderizar o card com o livro Clean Code', () => {
  render(<App />);
  expect(screen.getByText('Clean Code')).toBeInTheDocument();
});

test('deve renderizar o campo Título do formulário', () => {
  render(<App />);
  expect(screen.getByPlaceholderText('Título do livro')).toBeInTheDocument();
});

test('deve renderizar o botão Cadastrar livro', () => {
  render(<App />);
  expect(screen.getByRole('button', { name: 'Cadastrar livro' })).toBeInTheDocument();
});
