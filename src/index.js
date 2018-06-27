// Demo class
class Demo {
  constructor () {
    this.prefix = 'Log::'
  }

  log (msg) {
    // output message
    console.log(`${this.prefix} ${msg} ${XXX}222`)
  }
}

function test () {}

export default function libDemo () {
  const demo = new Demo()
  demo.log('lib demo')
}
