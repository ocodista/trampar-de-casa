// eslint-disable-next-line @typescript-eslint/no-var-requires
const { exec } = require('node:child_process');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('node:path');

const timeLog = 'Auto Email sender setup'

console.time(timeLog)
exec(path.resolve(__dirname,  'auto-email-sender-setup.sh'), (error, stdout, stderr) => {
  if(error) console.log(error)
  console.timeEnd(timeLog)
})