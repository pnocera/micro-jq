// @ts-ignore
import executeScript from './execute'
import { parse } from './grammar'

export class BooleanExpressionAST {
  // =methods
  root: any

  /**
   * Takes a raw boolean expression string and parses it into an AST.
   */
  constructor(source: string) {
    this.root = parse(source)
  }
}

export class BooleanExpressionEvaluator {
  // =methods

  /**
   * Evalutes an AST against the given context and returns true/false.
   * @param {BooleanExpressionAST} ast
   * @param {object} context
   * @return {boolean}
   */
  evaluate(ast: BooleanExpressionAST, context: object): boolean {
    return this.evaluateNode(ast.root, context)
  }

  /**
   * Evaluates a binary expression node.
   * @param {object} node
   * @param {string} node.operator - name of operator (e.g. "equals", "and")
   * @param node.left
   * @param node.right
   * @return {boolean}
   */
  evaluateNode(node: any, context: any): boolean {
    const operator: string = node.operator
    switch (operator) {
      case 'and':
        return this.and(node.left, node.right, context)
        break
      case 'or':
        return this.or(node.left, node.right, context)
        break
      case 'equals':
        return this.equals(node.left, node.right, context)
        break
      case 'notEquals':
        return this.notEquals(node.left, node.right, context)
        break
      case 'in':
        return this.in(node.left, node.right, context)
        break
      case 'notIn':
        return this.notIn(node.left, node.right, context)
        break

      default:
        break
    }
    return false
  }

  /**
   * @param {object} left - binary expression node
   * @param {object} right - binary expression node
   * @param context
   * @return {boolean}
   */
  and(left: any, right: any, context: any) {
    const leftResult = this.evaluateNode(left, context)
    const rightResult = this.evaluateNode(right, context)
    return leftResult && rightResult
  }

  /**
   * @param {object} left - binary expression node
   * @param {object} right - binary expression node
   * @param context
   * @return {boolean}
   */
  or(left: any, right: any, context: any) {
    const leftResult = this.evaluateNode(left, context)
    const rightResult = this.evaluateNode(right, context)
    return leftResult || rightResult
  }

  /**
   * @param {string} selector
   * @param {string} value
   * @param context
   * @return {boolean}
   */
  equals(selector: any, value: undefined, context: undefined) {
    const realValue = this.lookup(context, selector)
    return realValue == value
  }

  /**
   * @param {string} selector
   * @param {string} value
   * @param context
   * @return {boolean}
   */
  notEquals(selector: any, value: any, context: any) {
    return !this.equals(selector, value, context)
  }

  /**
   * @param {string} value
   * @param {string} selector
   * @param context
   * @return {boolean}
   */
  in(value: any, selector: undefined, context: undefined) {
    const realValue = this.lookup(context, selector)
    if (realValue == null) {
      return false
    }
    if (typeof realValue == 'string') {
      return realValue.includes(value)
    }

    if (Array.isArray(realValue)) {
      return realValue.includes(value)
    }

    if (typeof realValue == 'object') {
      return Object.values(realValue).includes(value)
    }

    if (typeof realValue == 'number') {
      return realValue == value
    }

    if (typeof realValue == 'boolean') {
      return realValue == value
    }

    if (typeof realValue == 'undefined') {
      return false
    }

    return false
  }

  /**
   * @param {string} value
   * @param {string} selector
   * @param context
   * @return {boolean}
   */
  notIn(value: any, selector: any, context: any) {
    return !this.in(value, selector, context)
  }

  /**
   * Returns the value in a context found by the given selector.
   * If not found, returns undefined.
   * @param {object} context
   * @param {string} selector
   */
  lookup(context: any, selector: any) {
    //if (pointer.has(context, selector))
    return executeScript(context, selector)
  }
}
