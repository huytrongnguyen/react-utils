class PubSub {
  constructor() { }

  subscribers() {
    if (!this._subscribersMap) {
      this._subscribersMap = {}
    }
    return this._subscribersMap
  }

  subscribe(name, cb) {
    const subs = this.subscribers()
    if (!subs[name]) {
      subs[name] = [cb]
    } else {
      subs[name].push(cb)
    }
  }

  unsubscribe(name, cb) {
    const subs = this.subscribers()[name]
    for (let key in subs) {
      if (subs[key] == cb) {
        subs[key] = null
      }
    }
  }

  clear(name) {
    delete this.subscribers()[name]
  }

  publish() {
    const args = [].slice.call(arguments),
          name = args.shift(),
          subs = this.subscribers()[name]

    for (let key in subs) {
      let sub = subs[key]
      if (sub) {
        sub.apply(this, args)
      }
    }
  }
}

export default new PubSub