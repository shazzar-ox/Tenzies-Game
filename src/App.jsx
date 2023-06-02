import React, { useEffect } from "react"
import Dice from "./Dice"
import { nanoid } from "nanoid"
import { useState} from "react"
import Confetti from 'react-confetti'
import './App.css'


const  App =()=> {

const generateNewDie = ()=>{
 return { id:nanoid(), value: Math.ceil(Math.random() * 6), isHeld : false }
}
    const  allNewDice =()=> {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie())
        }
        // console.log(newDice)
        return newDice
        
    }
    
const [random, setRandom] = useState(allNewDice())
const [tenzies, setTenzies] = useState(false)
const [scoreCounter, setScoreCounter] = useState(1)
const [count, setCount] = useState(0)
const [upload, setUpload] = useState({})
const [download, setDownload]  =  useState({})


// // get local storage

useEffect(()=>{
  // console.log(localStorage.getItem('Highscore'))
  if(localStorage.getItem('Highscore')=== null)
  {
    setUpload(prev=> prev= localStorage.setItem('Highscore', JSON.stringify({'DiceRolled':0, 'timer': 0})) )
    // console.log('here')
  }
  else{
    setDownload((prev)=> prev =JSON.parse(localStorage.getItem('Highscore')))
    //     console.log(scoreboard.timer)ev)=> prev =JSON.parse(localStorage.getItem('Highscore')))
        // console.log(download)
  }
  
},[count])
// console.log(upload)

//timer
useEffect(()=>
{
  if(tenzies)
  {

  }else{
    const timed = setTimeout(() => { 
      setCount(prev => {
        return prev+1
      })     
      
    }, 1000)
  }
    

},[count])






const holdDice = (id) => {
  // console.log(id)
  setRandom((prev)=> prev.map((each)=>{
      return each.id === id ? {...each, isHeld: !each.isHeld} : each
  }))
}




const data = random.map((each)=> <Dice key={each.id} idNoter={()=>holdDice(each.id)} value={each.value} isHeld={each.isHeld}/>)


// roll dice
const rollDice= ()=>{
  
setScoreCounter(prev=> prev+1)
// console.log(scoreCounter)
  if(tenzies)
  {
   
    setTenzies(false)
    setCount(0)
    setRandom(allNewDice())
   
  }
  else{
    setRandom((prev)=> prev.map((each)=>{
    return each.isHeld? each : generateNewDie()
  }))
  }
  
}

useEffect(()=>{
  const isHeldChecker = random.every((each)=> each.isHeld)
  // console.log(random[0].value)
  const valueChecker = random.every((each)=> each.value === random[0].value)
  if(isHeldChecker && valueChecker)
  {
    setTenzies((prev)=> prev = true)
    // console.log(tenzies)


    if((download.DiceRolled ===  0 ) && (download.timer === 0)){
      // setStorage(prev=> 
      //   {
      //     return { ...prev , Highscore:scoreCounter, timer: count}
      //   })
      setUpload(prev=> prev= localStorage.setItem('Highscore', JSON.stringify({'DiceRolled':scoreCounter, 'timer': count})) )
      // localStorage.setItem('Highscore',JSON.stringify( {'DiceRolled': scoreCounter, 'timer': count}))

    }
    else if((scoreCounter < download.DiceRolled ) && (count < download.timer))
    {
      setUpload(prev=> prev= localStorage.setItem('Highscore', JSON.stringify({'DiceRolled':scoreCounter, 'timer': count})) )
      // localStorage.setItem('Highscore',JSON.stringify( {'DiceRolled': scoreCounter, 'timer': count}))
    }
   
    
  }

},[random])



    return (
        <main> { tenzies && <Confetti/>}
        
           <h1 className="title">TENZIES GAME</h1>
           <h3 className="timer">TIMER: {count}s </h3>
        <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-container">
              {data}
               
            </div>
            <button onClick={rollDice}>{tenzies ? 'New game': 'Roll Dice' }</button>
            <h2 className="highscore-indicator">Your High Score is {download.DiceRolled} Dice Rolls in {download.timer} seconds </h2>
        </main>
    )
}
export default App