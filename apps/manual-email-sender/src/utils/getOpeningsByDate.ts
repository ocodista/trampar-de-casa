import { emailPropsByDate } from '../openings-email/Emails'

export const getOpeningsByDate = (selectedDate: string) => {
  const openingsProps = emailPropsByDate[selectedDate]
  if (!openingsProps) {
    console.log(
      `Props for ${selectedDate} not found, please check Emails.ts file!`
    )
    process.exit(1)
  }
  return openingsProps
}
