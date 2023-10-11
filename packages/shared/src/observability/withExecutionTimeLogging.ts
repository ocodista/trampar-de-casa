import { timeSpan } from './timeSpan'

function isAsyncFunction(func: any) {
  return func.constructor.name === 'AsyncFunction'
}

export const withExecutionTimeLogging = <T extends (...args: any[]) => any>(
  func: T,
  props: { name?: string } = {}
): T => {
  const { seconds } = timeSpan()
  const logProfilingResult = () => {
    const execution = seconds()
    // eslint-disable-next-line turbo/no-undeclared-env-vars
    if (process?.env?.NODE_ENV !== 'test') {
      console.log(
        `✨ Function "${
          func.name || props.name
        }" executed in ${execution} seconds. ✨`
      )
    }
  }
  return ((...args: Parameters<T>): ReturnType<T> => {
    const isAsync = isAsyncFunction(func)
    if (isAsync) {
      const finishedFunc = func(...args).finally(() => {
        logProfilingResult()
      })
      return finishedFunc
    }
    const finishedFunction = func(...args)
    logProfilingResult()
    return finishedFunction
  }) as T
}
