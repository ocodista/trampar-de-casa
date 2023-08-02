import { OpeningsEmail } from '../openings-email/Emails'

export const generateSubjectEmail = (props: OpeningsEmail) => {
  const {
    openings: { globalOpenings, localOpenings },
  } = props
  const subject = `🔥 ${
    globalOpenings.length + localOpenings.length
  } vagas para você Trampar de Casa`

  return subject
}
