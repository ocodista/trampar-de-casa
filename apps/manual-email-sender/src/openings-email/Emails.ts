import { openings20230628 } from './2023-06-28/openings'
import { openings20230705 } from './2023-07-05/openings'
import { openings20230712 } from './2023-07-12/openings'
import { openings20230719 } from './2023-07-19/openings'
import { openings20230726 } from './2023-07-26/openings'
import { Openings } from './Openings'

enum EmailDate {
  '2023-06-28' = '2023-06-28',
  '2023-07-05' = '2023-07-05',
  '2023-07-12' = '2023-07-12',
  '2023-07-19' = '2023-07-19',
  '2023-07-26' = '2023-07-26',
}

export interface OpeningsEmail {
  feedbackForm: string
  openings: Openings
}

export const emailPropsByDate: Record<string, OpeningsEmail> = {
  [EmailDate['2023-06-28']]: {
    feedbackForm: 'https://forms.gle/X54fa7KkqVrZmn7q8',
    openings: openings20230628,
  },
  [EmailDate['2023-07-05']]: {
    feedbackForm: 'https://forms.gle/brzVhqv8g8C6kGJX8',
    openings: openings20230705,
  },
  [EmailDate['2023-07-12']]: {
    feedbackForm: 'https://forms.gle/Q6d15U5JzfNaah7b8',
    openings: openings20230712,
  },
  [EmailDate['2023-07-19']]: {
    feedbackForm: 'https://forms.gle/mBeW8w2kf1fEsiSS9',
    openings: openings20230719,
  },
  [EmailDate['2023-07-26']]: {
    feedbackForm: 'https://forms.gle/mBeW8w2kf1fEsiSS9',
    openings: openings20230726,
  },
}
