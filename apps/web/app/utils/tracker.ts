import { Tracker } from 'analytics'

let tracker: Tracker
export const getTracker = (): Tracker => {
  if (!tracker) tracker = new Tracker(process.env['NEXT_PUBLIC_MIXPANEL_KEY'])
  return tracker
}
