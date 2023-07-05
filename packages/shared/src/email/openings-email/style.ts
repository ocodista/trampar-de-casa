// Ideally we should be using TailwindCSS and not CssInJs like this file
// But it was copyed from the template at React.Email, so there wasn't much time
// To refactor this for tailwindcss
// TODO: refactor this file with tailwindcss on the OpeningsEmail.tsx file

export const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
}

export const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
}

export const box = {
  padding: '0 48px',
}

export const hr = {
  borderColor: '#e6ebf1',
  margin: '20px 0',
}

export const paragraph = {
  color: '#525f7f',

  fontSize: '16px',
  lineHeight: '24px',
  textAlign: 'left' as const,
}

export const h1 = {
  fontSize: '24px',
}

export const anchor = {
  color: '#556cd6',
}
