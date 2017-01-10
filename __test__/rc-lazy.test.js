import 'babel-polyfill'
import { Cache } from './../src/index'

test("set name into cache", () => {
  Cache.set('name', 'lionel')
  expect(Cache.get('name')).toBe('lionel')
  Cache.remove('name')
  expect(Cache.get('name')).toBe(undefined)
})