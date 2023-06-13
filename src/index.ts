import { BooleanExpressionAST, BooleanExpressionEvaluator } from './ast'
import { parse } from './parser'

export function checkScript(script: string): boolean {
  try {
    parse(script)
    return true
  } catch (e) {
    return false
  }
}

export function checkExpression(source: string): boolean {
  try {
    const ast = new BooleanExpressionAST(source)
    return true
  } catch (e) {
    return false
  }
}

export function makeEvaluator(source: string) {
  const ast = new BooleanExpressionAST(source)
  const evaluator = new BooleanExpressionEvaluator()
  return function evaluate(context: any) {
    return evaluator.evaluate(ast, context)
  }
}

export { default as executeScript } from './execute'
export { parse } from './parser'
