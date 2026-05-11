import './library.css'
import React, { useEffect } from 'react';
import { useRef } from 'react';
import { LibraryList } from './LibraryComponents/LibraryList';
import { LibraryItem } from './LibraryComponents/LibraryItem';
import { LibraryHeader } from './LibraryComponents/LibraryHeader';
import { LibraryPills } from './LibraryComponents/LibraryPills';

import { LibrarySearch } from './LibraryComponents/LibrarySearch';

const userName = 'Sofia'
const itemsList = [
    { 
        title: 'Tus me gusta',
        subtitle: ' 2 canciones',
        img: 'https://www.oldskull.net/wp-content/uploads/2015/01/Rock_Covers-ilustracion-oldskull-15.jpg',
        type: 'playlist'
    },
    { 
        title: 'Daily Mix 1',
        img: 'https://www.oldskull.net/wp-content/uploads/2015/01/Rock_Covers-ilustracion-oldskull-15.jpg',
        type: 'playlist',
    },
];

const useLocalStorage = (itemName, initialValue) => {
    const localStorageItems = localStorage.getItem(itemName)
    let parsedItem;
    
    if(!localStorageItems){
        localStorage.setItem(itemName, JSON.stringify(initialValue))
        parsedItem = initialValue
    }else {
        parsedItem = JSON.parse(localStorageItems)
    }
    
    const [item, setItem] = React.useState(parsedItem)

    const saveItem = (newItem) => {
        localStorage.setItem(itemName, JSON.stringify(newItem))
        setItem(newItem)
    }

    return [item, saveItem];
}

function Library(){
    const [lookingLibrary, setLookingLibrary] = React.useState('')
    const [isColapsed, setIsCollapsed] = React.useState(false)
    const [showPlaylist, setShowPlaylist] = React.useState(false)
    const [showArtist, setShowArtist] = React.useState(false)
    const [selectItem, setSelectItem] = React.useState(null)
    const [menuPosition, setMenuPosition] = React.useState({x: 0, y: 0})

    const [items, saveItems] = useLocalStorage('Items', itemsList)

    const deleteItemRef = React.useRef(null)


    useEffect(()=>{
        const deleteButtonClickOutside = (e)=>{
            if(deleteItemRef.current && !deleteItemRef.current.contains(e.target)){
                setSelectItem(null)
            }
        }
        document.addEventListener('mousedown', deleteButtonClickOutside)
        return () => document.removeEventListener('mousedown', deleteButtonClickOutside)
    },[])

    const sortedItems = [...items].sort((a,b) => {
        if (a.type === 'playlist' && b.type === 'artista') return -1;
        if (a.type === 'artista' && b.type === 'playlist') return 1;
        return 0;
    })

    const filteredSongsLibrary = sortedItems.filter(item =>{
        if(showPlaylist){
            return item.type === 'playlist' && item.title.toLowerCase().includes(lookingLibrary.toLowerCase())
        }
        else if(showArtist){
            return item.type === 'artista' && item.title.toLowerCase().includes(lookingLibrary.toLowerCase())
        }
        return item.title.toLowerCase().includes(lookingLibrary.toLowerCase())
    })


    // Solo recibe el item nuevo y lo agrega
    const onAddItem = (newItem) => {
        saveItems([...items, newItem])
    }

    const onDeleteItem = ()=>{
        const newItems = items.filter(item => item.title !== selectItem)
        saveItems(newItems)
    }

    return(
        <aside className="library__container h-100 rounded-3 flex-column overflow-hidden d-flex bg-#121212">

            <LibraryHeader 
                onAddItem={onAddItem}
                items={items}
            />

            <LibraryPills
                showPlaylist={showPlaylist}
                showArtist={showArtist}
                setShowPlaylist={setShowPlaylist}
                setShowArtist={setShowArtist}
            />

            <div className='library__list px-1 overflow-auto flex-grow-1'>
                <LibrarySearch
                    lookingLibrary={lookingLibrary}
                    setLookingLibrary={setLookingLibrary}
                />

                <LibraryList>
                    {filteredSongsLibrary.map(item => (
                        <LibraryItem
                        key={item.title}
                        item={item}
                        selectItem={selectItem}
                        menuPosition={menuPosition}
                        deleteItemRef={deleteItemRef}
                        onDeleteItem={onDeleteItem}
                        setSelectItem={setSelectItem}
                        setMenuPosition={setMenuPosition}
                        userName={userName}
                        />
                    ))}
                </LibraryList>
            </div>
        </aside>
    )
}

export {Library}