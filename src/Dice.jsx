import React from "react"

const  Dice =({value,idNoter, isHeld})=> {
    // console.log(id)

    const styles = {
        backgroundColor: isHeld? '#59E391' : 'white'
    }
    return (
       
            <div className="die-face"  onClick={idNoter} style={styles} >
            <h2 className="die-num">{value}</h2>
        </div>
    )
}

export default Dice