import Mixpanel from 'mixpanel'

export class Tracker {
  key: string
  mixpanel: typeof Mixpanel
  constructor(key: string) {
    this.mixpanel = Mixpanel.init(key)
  }

  track(event: string, props?: unknown) {
    this.mixpanel.track(event, props || {})
  }
}
