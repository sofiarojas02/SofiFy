import React from "react";

const useLocalStorage = (itemName, initialValue) => {
    const [item, setItem] = React.useState([])
    const [loading, setLoading] = React.useState(true)
    const [error, setError] = React.useState(false)

    
    React.useEffect(()=>{
        
        try{
            const localStorageItems = localStorage.getItem(itemName)
            let parsedItem;
            setTimeout(()=>{
                if(!localStorageItems){
                    localStorage.setItem(itemName, JSON.stringify(initialValue))
                    parsedItem = initialValue
                    setLoading(false)
                    setItem(parsedItem)
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