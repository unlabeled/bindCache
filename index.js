const cached = new WeakMap()

/**
 * Check if arrays are equal
 *
 * @param {Array} firstParams
 * @param {Array} secondParams
 * @returns {boolean}
 */
function isEqual(firstParams, secondParams) {
  const lengthFirstParams = firstParams.length
  const lengthSecondParams = secondParams.length

  if (lengthFirstParams !== lengthSecondParams) {
    return false
  }

  let condition = true
  for (let i = 0; i < lengthFirstParams; i++) {
    if (firstParams[i] !== secondParams[i]) {
      condition = false
      break
    }
  }

  return condition
}

/**
 *
 * @param {Function} fn
 * @param {Array} args
 */
export function bindArgs(fn, ...args) {
  return bind(fn, undefined, args)
}

/**
 * Cache binded function result with its params
 *
 * @param {Function} fn
 * @param {Any} context
 * @param {Array} args
 * @returns {Function}
 */
export function bind(fn, context, ...args) {
  if (!fn) {
    throw new CaughtException(
      "You called BindCache utils with no or undefined function"
    )
  }
  const contextWithArgs = [context, ...args]
  if (!cached.has(fn)) {
    const bindedFunction = fn.bind(context, ...args)
    const argsFunction = new Map()
    argsFunction.set(bindedFunction, contextWithArgs)
    cached.set(fn, argsFunction)

    return bindedFunction
  }

  const found = cached.get(fn)
  for (const [bindedFunction, storedArgs] of found) {
    if (isEqual(storedArgs, contextWithArgs)) {
      return bindedFunction
    }
  }

  const bindedFunction = fn.bind(context, ...args)
  found.set(bindedFunction, contextWithArgs)
  return bindedFunction
}
