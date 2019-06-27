import { main } from '../src';
async function f(){
  const result = await main({
    command: ['identify', 'rose:'],
    inputFiles: []
  })
  assertEquals(result.stdout.join(''), 'ROSE PNM 70x46 70x46+0+0 8-bit sRGB 9673B 0.000u 0:00.000')
  log(result.stdout.join(''))
  // console.log('hi');  
}
f()


function assertEquals(a:any,b:any){
  assert(a!==b, 'Expected '+a+' to be equal to '+b)
}
function assert(t:boolean, msg: string){
  // assertInit()
  if(!t){
    document.getElementById('assert')!.innerHTML+=msg
  }
}
function log(msg: string){
    document.getElementById('logs')!.innerHTML+=msg+'<br/>'
}
// function assertInit(){
//   if(!document.getElementById('assert')){
//     var e = document.createElement('div')
//     e.id='assert'
//     e.innerHTML='**Empty**'
//     document.body.append(e)
//   }
// }