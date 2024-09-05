import { spawn } from 'child_process'

export const spawnPromise = (command: string, args: string[]) => {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      stdio: 'inherit',
      shell: true,
    })

    child.on('error', (err) => reject(err))
    child.on('exit', (code) => {
      if (code === 0) {
        resolve(code)
      } else {
        reject(new Error(`Process exited with code ${code}`))
      }
    })
  })
}
