type TimeMeasureProps = 'milliseconds' | 'nanoseconds' | 'seconds'

const conversionFactors: Record<TimeMeasureProps, number> = {
  nanoseconds: 1,
  milliseconds: 1e6,
  seconds: 1e9,
}
export const timeSpan = () => {
  const start = process.hrtime.bigint()

  const end = (timeMeasure: TimeMeasureProps) => {
    const diff = process.hrtime.bigint() - start
    const factor = conversionFactors[timeMeasure]
    return Number(diff) / factor
  }

  const returnValue = () => end('milliseconds')
  returnValue.rounded = () => Math.round(end('milliseconds'))
  returnValue.seconds = () => end('seconds')
  returnValue.nanoseconds = () => end('nanoseconds')

  return returnValue
}
