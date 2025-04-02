class Presets {
    constructor() {
        //style padrão para as mensagens de e-mail
        this.style = `<style>
      body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          margin: 0;
          padding: 20px;
      }
      .container {
          background-color: #ffffff;
          border-radius: 5px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          padding: 20px;
      }
      h1 {
          color: #333;
          text-transform: uppercase;
      }
      .ticket-info {
          margin-top: 20px;
      }
      .footer {
          margin-top: 20px;
          font-size: 12px;
          color: #777;
      }
  </style>`;
    }

    //preset para um novo ticket
    forSupport(name, type, description, email) {
        return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <title>Novo Ticket de Suporte</title>
  ${this.style}
</head>
<body>
  <div class="container">
      <h1>Novo Ticket de Suporte</h1>
      <div class="ticket-info">
          <p><strong>Data de Abertura: </strong>${new Date(Date.now()).toLocaleString()}</p>
          <p><strong>Nome do Usuário: </strong>${name}</p>
            <p><strong>Email do Usuário: </strong>${email}</p>
          <p><strong>Tipo: </strong>${type}</p>
          <p><strong>Descrição do Problema: </strong>${description}</p>
      </div>
      <div class="footer">
          <p>Por favor, responda a este e-mail para tratar do ticket.</p>
      </div>
  </div>
</body>
</html>
`;
    }

    //preset para enviar mensagem direto para usuário
    forUser() {
        //ainda em construção
    }
}

export default new Presets();
