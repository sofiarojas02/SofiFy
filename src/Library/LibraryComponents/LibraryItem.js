import { useLibrary } from '../LibraryContext/LibraryContext'
import '../LibraryCss/LibraryItem.css'
import React, { useEffect } from 'react'


function LibraryItem({
    item,
    userName,
    selectItem,
    setSelectItem,
    menuPosition,
    setMenuPosition,
    onDelete,
}){
    
    const {
        capitalize,

    } = useLibrary()

    const deleteOptionRef = React.useRef()

    useEffect(()=>{
        const deleteOptionOutside = (e) =>{
            if(deleteOptionRef.current && !deleteOptionRef.current.contains(e.target)){
                setSelectItem(null)
            }
        }

        document.addEventListener('mousedown', deleteOptionOutside);
        return () => document.removeEventListener('mousedown', deleteOptionOutside);
    },[])



    return(
        <li
        onContextMenu={(e) =>{
            e.preventDefault()
            setMenuPosition({x: e.clientX, y: e.clientY})
            setSelectItem(item.title)
            
        }}
        className='list__item  d-flex p-2 pt-2 pb-2 align-items-center gap-2 rounded-3  bg-transparent text-white'
        >
                {selectItem === item.title && <button className="delete__option"
                style={{
                    left :menuPosition.x,
                    top: menuPosition.y,
                }}
                onClick={onDelete}
                ref={deleteOptionRef}
                
                >Eliminar</button>}
                
                <div className='d-flex align-items-center'>
                    <img 
                    className={`list__item--img ${item.type === 'artista' ? 'rounded-circle' : 'rounded-3'}`}
                    src={item.img ? item.img: 'https://www.oldskull.net/wp-content/uploads/2015/01/Rock_Covers-ilustracion-oldskull-15.jpg'} 
                    alt={item.title} />
                </div>


                <div className=''>
                    <h3 className='list__item--title m-0 mb-1'> {capitalize(item.title)} </h3>
                    <p className='list__item--subtitle m-0'> {capitalize(item.type) + ' • ' + (item.subtitle ? item.subtitle: userName)} </p>
                </div>

            </li>
    )
}

export {LibraryItem}