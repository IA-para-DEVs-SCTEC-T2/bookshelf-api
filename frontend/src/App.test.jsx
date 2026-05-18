import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App.jsx';

test('deve renderizar o título principal da aplicação', () => {
 render(<App />);

 expect(
   screen.getByText('Gestão de livros digitais')
 ).toBeInTheDocument();
});
