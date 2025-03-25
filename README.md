# Desafio_PicPay

O intuito de fazer estes desafios e compartilha-los aqui, é, para além de meus estudos uma forma de criar um portfólio sem apelar para projetos repetitivos e de pouca importância real.

## Plano de Desenvolvimento

1. **Tecnologias Utilizadas**:
   - Node.js com Express para a API RESTFul.
   - SQLite como banco de dados relacional.
   - Sequelize como ORM.
   - Axios para chamadas HTTP externas.
   - Jest para testes.

2. **Funcionalidades Principais**:
   - Cadastro de usuários e lojistas com validação de CPF/CNPJ e e-mail únicos.
   - Transferências entre usuários e lojistas com validação de saldo.
   - Consulta a serviços externos para autorização e notificações.

3. **Estrutura do Projeto**:
   - `src/`: Contém o código-fonte da aplicação.
   - `tests/`: Contém os testes unitários e de integração.
   - `database/`: Contém o arquivo SQLite e as migrações.
   - `docker/`: Configurações para Docker e Docker Compose.

4. **Como Rodar o Projeto**:
   - Instale as dependências com `npm install`.
   - Rode as migrações do banco de dados com `npx sequelize-cli db:migrate`.
   - Inicie o servidor com `npm start`.

## Referência

Encontrei este desafio a partir do canal da Fernanda Kipper, e utilizei algumas bases como referências, no entanto, segue link do vídeo para que fique claro que não houve reprodução direta do código. A Fernanda não deixou repositório com a solução deste desafio, por isso não irei menciona-lo aqui.

[Vídeo de Referência](https://www.youtube.com/watch?v=QXunBiLq2SM&t=55s)
