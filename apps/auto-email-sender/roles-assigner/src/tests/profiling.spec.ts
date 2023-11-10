import { timeSpan } from 'shared/src/observability/timeSpan'
import { getEmailProps } from 'src/getEmailProps'
import { getRoleMockArray } from './factories/roleFactory'
import { getSubscriberMock } from './factories/subscriberFactory'

const getExecutionAverageTime = (func: () => void, numExecutions: number) => {
  let totalExecutionTime = 0

  // Execute the function multiple times and measure the time
  for (let i = 0; i < numExecutions; i++) {
    const { seconds } = timeSpan()
    func()
    const endTime = seconds()
    totalExecutionTime += endTime
  }

  // Calculate and log the average execution time
  const averageExecutionTime = totalExecutionTime / numExecutions

  return averageExecutionTime
}

describe('Function Execution Time Test', () => {
  describe('getEmailProps profiling', () => {
    test('Running 1 time', () => {
      const NUM_EXECUTIONS = 1
      const roles = getRoleMockArray(300)
      const averageTime = getExecutionAverageTime(() => {
        getEmailProps(getSubscriberMock(), roles)
      }, NUM_EXECUTIONS)

      console.log(
        `Running 1 time\n\tAverage Execution Time: ${averageTime} seconds`
      )
    })

    test('Running 10 times', () => {
      const NUM_EXECUTIONS = 10
      const roles = getRoleMockArray(300)
      const averageTime = getExecutionAverageTime(() => {
        getEmailProps(getSubscriberMock(), roles)
      }, NUM_EXECUTIONS)

      console.log(
        `Running 10 times\n\tAverage Execution Time: ${averageTime} seconds`
      )
    })

    test('Running 100 times', () => {
      const NUM_EXECUTIONS = 100
      const roles = getRoleMockArray(300)
      const averageTime = getExecutionAverageTime(() => {
        getEmailProps(getSubscriberMock(), roles)
      }, NUM_EXECUTIONS)

      console.log(
        `Running 100 times\n\tAverage Execution Time: ${averageTime} seconds`
      )
    })

    test('Running 1000 times', () => {
      const NUM_EXECUTIONS = 1000
      const roles = getRoleMockArray(300)
      const averageTime = getExecutionAverageTime(() => {
        getEmailProps(getSubscriberMock(), roles)
      }, NUM_EXECUTIONS)

      console.log(
        `Running 1000 times\n\tAverage Execution Time: ${averageTime} seconds`
      )
    })
  })
})
