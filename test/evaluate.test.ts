import { makeEvaluator } from '../src'

const context = {
  foo: {
    x: 5,
    y: 'foo',
    z: true,
    test1: 'yes',
    test2: 'no',
  },
  bar: {
    x: 42,
    y: 'bar',
    z: false,
    test1: 'no',
    test2: 'yes',
    testarray: ['yes', 'no'],
  },
}

describe('evaluate', () => {
  test('number', () => {
    const expression = '".foo.x" == 5'
    const evaluate = makeEvaluator(expression)
    expect(evaluate(context)).toEqual(true)
  })

  test('number false', () => {
    const expression = '".foo.x" == 6'
    const evaluate = makeEvaluator(expression)
    expect(evaluate(context)).toEqual(false)
  })

  test('string', () => {
    const expression = '".bar.y" == "bar"'
    const evaluate = makeEvaluator(expression)
    expect(evaluate(context)).toEqual(true)
  })

  test('arraystrings', () => {
    const expression = '"yes" in ".bar.testarray"'
    const evaluate = makeEvaluator(expression)
    expect(evaluate(context)).toEqual(true)
  })
})
