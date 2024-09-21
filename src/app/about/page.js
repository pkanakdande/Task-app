import { resolve } from "styled-jsx/css"

export default async function About(){

   await TakeTime()
  
    return(
        <h1>About Page</h1>
    )
}

async function TakeTime(){
    await new Promise((resolve)=>{
setTimeout(resolve,3000)
    })
   
}