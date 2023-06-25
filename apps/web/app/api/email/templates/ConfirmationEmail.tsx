import { Body, Container, Head, Heading, Html, Link, Text, Preview } from "@react-email/components";

const main = {
  backgroundColor: '#ffffff',
};

const container = {
  paddingLeft: '12px',
  paddingRight: '12px',
  margin: '0 auto',
};

const h1 = {
  color: '#333',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '40px 0',
  padding: '0',
};

const link = {
  color: '#2754C5',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '14px',
  textDecoration: 'underline',
};

const text = {
  color: '#333',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '14px',
  margin: '24px 0',
};

interface ConfirmationEmail {
  url: string
}

export const ConfirmEmail = ({
  url
}: ConfirmationEmail) => (
  <Html style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  }}>
    <Head />
    <Preview>Confirme seu e-mail</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Confirme seu e-mail!</Heading>
        <Text style={text}>Salve, beleza?</Text>
        <Text style={text}>Bem-vindo(a) à nossa comunidade de trabalho remoto! Estamos quase prontos para te enviar vagas incríveis diretamente no seu e-mail.</Text>
        <Text style={text}>Mas primeiro, precisamos confirmar se este é realmente o seu e-mail.</Text>
        <Text style={text}>Por favor, clique no botão abaixo para confirmar:</Text>
        <Link
          href={url}
          target="_blank"
          style={{
            ...link,
            display: 'block',
            marginBottom: '16px',
          }}
        >
          Confirmar meu e-mail
        </Link>
        <Text
          style={{
            ...text,
            color: '#ababab',
            marginTop: '14px',
            marginBottom: '16px',
          }}
        >
          Se você não confirmar sua conta, não vai receber as vagas.
        </Text>
        <Text
          style={{
            ...text,
            color: '#ababab',
            marginTop: '12px',
            marginBottom: '38px',
          }}
        >
          P.S. Se você não se inscreveu para receber e-mails nossos ou acredita que recebeu esta mensagem por engano, por favor, ignore-a.
        </Text>
      </Container>
    </Body>
  </Html>
);