import React, { useEffect } from "react"
import { useRecentCards } from "../mainProcess"
import { ReactComponent as TrashIcon } from '../MainSVG/trash.svg'
import { CardForm } from "./CardForm"

function RecentCard(props){

    const [rightClick, setRightClick] = React.useState(false)
    const [deletePosition, setDeletePosition] = React.useState({x: 0, y:0})
    const [cardMenu, setCardMenu] = React.useState(false)
    const [cardMenuPosition, setCardMenuPosition] = React.useState({x: 0, y:0})

    const recentCardDeleteRef = React.useRef()

    useEffect(()=>{
        const deleteOptionOutside = (e) =>{
            if(recentCardDeleteRef.current && !recentCardDeleteRef.current.contains(e.target)){
                setRightClick(false)
            }
        }

        document.addEventListener('mousedown', deleteOptionOutside);
        return () => document.removeEventListener('mousedown', deleteOptionOutside);
    },[])

    const recentFormRef = React.useRef()

    useEffect(()=>{
        const formOutside = (e) =>{
            if(recentFormRef.current && !recentFormRef.current.contains(e.target)){
                setCardMenu(false)
            }
        }

        document.addEventListener('mousedown', formOutside);
        return () => document.removeEventListener('mousedown', formOutside);
    },[])



    const cardContextMenu = (e) =>{
        e.preventDefault()
        setDeletePosition({x: e.clientX, y: e.clientY})
        setRightClick(true)
    }
    
    const changeCardInfo = (e) => {
        if(!cardMenu){
            setCardMenuPosition({x: e.clientX, y: e.clientY})
            setCardMenu(true)
        }
    }


    return(
        <div 
        className="recent__card d-flex align-items-center text-center rounded-2 w-100 overflow-hidden"
        onContextMenu={cardContextMenu}
        onClick={changeCardInfo}
        >

            {cardMenu && 
                <CardForm
                recentFormRef={recentFormRef}
                left={cardMenuPosition.x}
                top={cardMenuPosition.y}
                setCardMenu={setCardMenu}
                cardText={props.title}
                cardId = {props.cardId}
                onEdit={props.onEdit}
                />
            }

            {rightClick && 
            <button 
            className="recent__deletButton"
            style={{
                left: deletePosition.x,
                top: deletePosition.y,
            }}
            ref={recentCardDeleteRef}
            onClick={props.onDelete}
            >
                Eliminar <span> <TrashIcon className="TrashIcon"/> </span>
                </button>}
            <figure className="recent__imageContainer">
                <img src={props.img}/>
            </figure>
            <h6 className="recent__text text-white fw-bold text-truncate">{props.title}</h6>
        </div>
    )
}

export {RecentCard}