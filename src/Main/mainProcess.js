import React from "react"
import { useLocalStorage } from "../App/useLocalStorage"

const recentData = [
        {
        id: 1,
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVHip2XOFus5DlQxQttUr0b0EjEP95a8ZUXQnWIQomzQ&s",
        title: 'Justin Bieber'
    },
    {
        id: 2,
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6cFzHAF0bq25rtlrhyYaaOowv5vyMyoRqSm22Ig5czBP4XzZ97l-DJEI&s=10",
        title: 'Dua lipa'
    },
        {
        id: 3,
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThE-ioozv9afp6WCl8pD8lHpgXJTGWAi_MTGo3FxVtBQ&s",
        title: 'Latin Pop Today'
    },
        {
        id: 4,
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzARMNQ8onFTjjtCYxQAoNmNUyr9UG15afS5-PBl4rEQ&s=10",
        title: 'Hard Rock'
    },
    ]

    function useRecentCards(){
        const {
            item: recentCard,
            saveItem: saveRecentCard,
            loading,
        } = useLocalStorage('Recent_List',recentData)
    
        const addRecent = () =>{
            if (recentCard.length >= 8) {
                return null
            }else{
                const newCard = {
                    id: Date.now(),
                    img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU6jBFkKj_yXKgeKGFSosvCbfCL0nQiNWBpimrqq7SuQ&s=10",
                    title: 'New card'
                }
                saveRecentCard([...recentCard, newCard])
            }
        }

        const deleteRecent = (id) => {
            const newList = recentCard.filter(card => card.id !== id)
            saveRecentCard(newList)
        }

        const editRecent = ({id, formTitle, formImg}) =>{
            const newList = recentCard.map(card => {
                if(card.id === id){
                    return {
                        ...card,
                        title: formTitle !== ''? formTitle : card.title,
                        img: formImg !== ''? formImg : card.img,
                    }
                }
                return card;
            })

            saveRecentCard(newList)
        }


        return{recentCard, addRecent, deleteRecent, editRecent, loading}
    }

    export {useRecentCards}

