import React from 'react'

export function ConfirmationEmail() {
  return (
    <div
      style={{
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
      }}
    >
      <h1
        style={{
          color: '#333',
          fontSize: '24px',
          fontWeight: 'bold',
          padding: '0',
        }}
      >
        Confirme seu e-mail!
      </h1>
      <p
        style={{
          fontSize: '14px',
          lineHeight: '24px',
          margin: '24px 0',
          color: '#333',
        }}
      >
        Salve, beleza?
      </p>
      <p
        style={{
          fontSize: '14px',
          lineHeight: '24px',
          margin: '24px 0',
          color: '#333',
        }}
      >
        Bem-vindo(a) à nossa comunidade de trabalho remoto! Estamos quase
        prontos para te enviar vagas incríveis diretamente no seu e-mail.
      </p>
      <p
        style={{
          fontSize: '14px',
          lineHeight: '24px',
          margin: '24px 0',
          color: '#333',
        }}
      >
        Mas primeiro, precisamos confirmar se este é realmente o seu e-mail.
      </p>
      <p
        style={{
          fontSize: '14px',
          lineHeight: '24px',
          margin: '24px 0',
          color: '#333',
        }}
      >
        Por favor, clique no botão abaixo para confirmar:
      </p>
      <a
        href="###URL"
        target="_blank"
        style={{
          color: '#2754C5',
          textDecoration: 'underline',
          fontSize: '14px',
          display: 'block',
          marginBottom: '16px',
        }}
      >
        Confirmar meu e-mail
      </a>
      <p
        style={{
          fontSize: '14px',
          lineHeight: '24px',
          margin: '24px 0',
          color: '#ababab',
          marginTop: '14px',
          marginBottom: '16px',
        }}
      >
        Se você não confirmar sua conta, não vai receber as vagas.
      </p>
      <p
        style={{
          fontSize: '14px',
          lineHeight: '24px',
          margin: '24px 0',
          color: '#ababab',
          marginTop: '12px',
          marginBottom: '38px',
        }}
      >
        P.S. Se você não se inscreveu para receber e-mails nossos ou acredita
        que recebeu esta mensagem por engano, por favor, ignore-a.
      </p>
    </div>
  )
}
