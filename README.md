# Desafio_PicPay

O objetivo deste projeto é simular um sistema de transferências financeiras entre usuários e lojistas, com validações de regras de negócio e integração com serviços externos para autorização e notificações.

## Plano de Desenvolvimento

1. **Tecnologias Utilizadas**:
   - Node.js com Express para a API RESTFul.
   - SQLite como banco de dados relacional.
   - Sequelize como ORM.
   - Axios para chamadas HTTP externas.
   - Jest para testes.

2. **Funcionalidades Principais**:
   - Cadastro de usuários e lojistas com validação de CPF/CNPJ e e-mail únicos.
   - Transferências entre usuários e lojistas com:
     - Validação de saldo disponível.
     - Atualização atômica do saldo do pagador e recebedor.
     - Integração com serviços externos para autorização.
   - Envio de notificações ao recebedor após a transferência.

3. **Estrutura do Projeto**:
   - `src/`: Contém o código-fonte da aplicação.
   - `tests/`: Contém os testes unitários e de integração.
   - `database/`: Contém o arquivo SQLite e as migrações.
   - `docker/`: Configurações para Docker e Docker Compose.

4. **Como Rodar o Projeto**:
   - Instale as dependências com `npm install`.
   - Rode as migrações do banco de dados com `npx sequelize-cli db:migrate`.
   - Inicie o servidor com `npm start`.

## Imagens dos testes - Prova de funcionalidades e regras

Aqui estão as imagens que demonstram os testes realizados para validar as funcionalidades e regras do sistema:

![Teste 1](./Imagens/teste1.png)
![Teste 2](./Imagens/teste2.png)
![Teste 3](./Imagens/teste3.png)

## Referência

Encontrei este desafio a partir do canal da Fernanda Kipper, e utilizei algumas bases como referências, no entanto, segue link do vídeo para que fique claro que não houve reprodução direta do código. A Fernanda não deixou repositório com a solução deste desafio, por isso não irei menciona-lo aqui.

[Vídeo de Referência](https://www.youtube.com/watch?v=QXunBiLq2SM&t=55s)
