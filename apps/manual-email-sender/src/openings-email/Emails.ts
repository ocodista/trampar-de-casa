import { openings20230628 } from './2023-06-28/openings'
import { openings20230705 } from './2023-07-05/openings'
import { Openings } from './Openings'

enum EmailDate {
  '2023-06-28' = '2023-06-28',
  '2023-07-05' = '2023-07-05',
}

interface Email {
  feedbackForm: string
  openings: Openings
}

export const emailPropsByDate: Record<string, Email> = {
  [EmailDate['2023-06-28']]: {
    feedbackForm: 'https://forms.gle/X54fa7KkqVrZmn7q8',
    openings: openings20230628,
  },
  [EmailDate['2023-07-05']]: {
    feedbackForm: 'https://forms.gle/brzVhqv8g8C6kGJX8',
    openings: openings20230705,
  },
}
