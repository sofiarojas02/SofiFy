import React from "react"
import { useRecentCards } from "../mainProcess"

function CardForm(props){    

    const [changeCardText, setChangeCardText] = React.useState(props.cardText)
    const [changeCardImg, setChangeCardImg] = React.useState('')


    const onSaveForm = (e) =>{
        e.preventDefault()

        props.onEdit({
            id: props.cardId,
            formTitle: changeCardText,
            formImg: changeCardImg,
        })
        props.setCardMenu(false)
    }

    return(
        <form 
        className="card__form position-absolute m-3 p-3 bg-dark d-flex flex-column"
        style={{
            left:props.left,
            top:props.top,
        }}
        ref={props.ref}
        >
            <h4>Change Info</h4>
            <label>Text</label>
            <input 
            className="form__info" placeholder='playlist name' 
            value={changeCardText}
            onChange={(e) => setChangeCardText(e.target.value)}
            />
            <label>Imagen URL</label>
            <textarea 
            className="form__info" placeholder='Direccion de la imagen'
            value={changeCardImg}
            onChange={(e) => setChangeCardImg(e.target.value)}
            ></textarea>

            <button
            onClick={onSaveForm}
            >
                Aceptar
            </button>
        </form>
    )
}

export {CardForm}