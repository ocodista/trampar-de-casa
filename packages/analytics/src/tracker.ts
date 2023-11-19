import Mixpanel from 'mixpanel'

export class Tracker {
  key: string
  mixpanel: typeof Mixpanel
  constructor(key: string) {
    if (!key) {
      console.warn('MIXPANEL_KEY is empty!')
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      this.mixpanel = { track: () => {} } as unknown as typeof Mixpanel
      return
    }
    this.mixpanel = Mixpanel.init(key)
  }

  track(event: string, props?: Mixpanel.PropertyDict) {
    this.mixpanel.track(event, props || {})
  }
}
