document.getElementById('transferForm').addEventListener('submit', async (event) => {
  event.preventDefault();

  const payer = document.getElementById('payer').value;
  const payee = document.getElementById('payee').value;
  const value = document.getElementById('value').value;

  const responseDiv = document.getElementById('response');
  responseDiv.innerHTML = 'Processando...';

  try {
    const response = await fetch('http://localhost:3000/api/transfer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ payer, payee, value }),
    });

    const data = await response.json();

    if (response.ok) {
      responseDiv.innerHTML = `<strong>Sucesso:</strong> ${data.message}`;
    } else {
      // Exibir a mensagem de erro retornada pelo servidor
      responseDiv.innerHTML = `<strong>Erro:</strong> ${data.error || 'Erro desconhecido.'}`;
    }
  } catch (error) {
    responseDiv.innerHTML = `<strong>Erro:</strong> Não foi possível conectar ao servidor.`;
    console.error('Erro no front-end:', error);
  }
});
