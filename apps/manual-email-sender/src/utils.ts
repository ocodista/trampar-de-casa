export const todayISODate = (): string => new Date().toISOString().split('T')[0]

export const getSelectedDate = (): string => {
  const args = process.argv.slice(2)
  const result = args.length ? args[0] : todayISODate()
  return result
}

export const sleep = async (ms: number) => {
  console.log(`Waiting ${ms}s...`)
  await new Promise((r) => setTimeout(r, ms))
}
