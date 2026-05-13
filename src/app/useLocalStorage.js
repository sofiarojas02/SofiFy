import React from "react";

const useLocalStorage = (itemName, initialValue) => {
    const [item, setItem] = React.useState(initialValue)
    const [loading, setLoading] = React.useState(true)
    const [error, setError] = React.useState(false)

    const localStorageItems = localStorage.getItem(itemName)
    let parsedItem;


    React.useEffect(()=>{
        try{
            setTimeout(()=>{
                if(!localStorageItems){
                    localStorage.setItem(itemName, initialValue)
                    parsedItem = initialValue
                }else {
                    parsedItem = JSON.parse(localStorageItems)
                    setLoading(false)
                    setItem(parsedItem)
                }
            },2000)
        }catch(e){
            setLoading(false)
            setError(true)
        }
    },[])
    
    


    const saveItem = (newItem) => {
    localStorage.setItem(itemName, JSON.stringify(newItem))

    setItem(newItem)
    }



    return {
        item, 
        saveItem,
        loading,
        error,
    };

}


export {useLocalStorage}