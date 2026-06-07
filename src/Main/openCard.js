import React, { useState } from "react"

function useOpenCard(){
    const [isOpenCard, setIsOpenCard] = useState(false)


    const openCard = () => {
        setIsOpenCard(true)
        console.log('abierto')
    }

    return {openCard}
}


export {useOpenCard}