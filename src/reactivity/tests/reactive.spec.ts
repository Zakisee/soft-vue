import {
  reactive,
  isReactive,
  isReadonly,
  readonly,
  isProxy
} from '../reactive'

describe('reactive', () => {
  it('happy path', () => {
    const original = { foo: 1 }
    const observed = reactive(original)
    const readonlyObserved = readonly({ foo: 2 })
    expect(observed).not.toBe(original)
    expect(observed.foo).toBe(1)
    expect(isReactive(observed)).toBe(true)
    expect(isReactive(original)).toBe(false)
    expect(isReadonly(readonlyObserved)).toBe(true)
    expect(isProxy(observed)).toBe(true)
  })
  test('nested reactives', () => {
    const original = {
      // nested: {
      //   foo: 1,
      // },
      array: [{ bar: 2 }]
    }
    const observed = reactive(original)
    expect(isReactive(observed.nested)).toBe(true)
    expect(isReactive(observed.array)).toBe(true)
    expect(isReactive(observed.array[0])).toBe(true)
  })
})
