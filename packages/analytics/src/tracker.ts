import Mixpanel from 'mixpanel'

export class Tracker {
  key: string
  mixpanel: typeof Mixpanel
  constructor(key: string) {
    this.mixpanel = Mixpanel.init(key)
  }

  track(event: string, props?: Mixpanel.PropertyDict) {
    this.mixpanel.track(event, props || {})
    console.log('TRACKING!', { event, props })
    console.log('Mixpanel!', { mixpanel: this.mixpanel })
  }
}
