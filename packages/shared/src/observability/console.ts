const runIfDebuggerIsEnable = (fn: (...args: unknown[]) => unknown) => {
  if (process.env['DEBUG'] === 'true') fn()
}

interface Logger {
  (...content: unknown[]): void
  time: (label: string) => void
  timeEnd: (label: string) => void
  error: (...content: unknown[]) => void
}

export const logger: Logger = (...content: unknown[]) => {
  return runIfDebuggerIsEnable(() => console.log(...content))
}
logger.error = (...content: unknown[]) =>
  runIfDebuggerIsEnable(() => console.log(...content))
logger.time = (label: string) =>
  runIfDebuggerIsEnable(() => console.time(label))
logger.timeEnd = (label: string) =>
  runIfDebuggerIsEnable(() => console.timeEnd(label))
