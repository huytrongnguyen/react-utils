import 'babel-polyfill'
import { Xhr } from './../src/index'

test("test", () => {
  console.log(Xhr)
  expect(1).toBe(1)
})