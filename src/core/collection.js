const EMPTY_LIST = []

export class List {
  constructor(value) {
    if (!value || value.length === 0) {
      return EMPTY_LIST
    }
    this.array = value.length > 1 ? value : value[0]
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