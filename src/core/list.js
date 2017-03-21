const EMPTY_LIST = []

export default class List {
  constructor(value) {
    this.array = EMPTY_LIST
    if (value && value.length > 0) {
      this.array = value.length > 1 ? value : (value[0] ? value[0] : EMPTY_LIST)
    }
    return this
  }

  static of(/*...values*/) {
    return new List(arguments)
  }

  each(fn) {
    for (let index = 0; index < this.array.length; ++index) {
      fn(this.array[index], index)
    }
  }
}