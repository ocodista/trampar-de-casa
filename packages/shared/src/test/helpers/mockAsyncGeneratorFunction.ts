export function mockAsyncGenerator<Data>(batches: Data[][]) {
  let i = 0
  return {
    [Symbol.asyncIterator]() {
      return this
    },
    next() {
      if (i < batches.length) {
        return Promise.resolve({ value: batches[i++], done: false })
      } else {
        return Promise.resolve({ done: true })
      }
    },
  }
}
