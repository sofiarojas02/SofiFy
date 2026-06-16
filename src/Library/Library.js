import './library.css'
import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import {ReactComponent as ListSVG} from "./list.svg"
import {ReactComponent as CloseSVG} from "./close.svg"
import { LibraryHeaderPills } from "./LibraryComponents/LibraryHeaderPills";

import { LibraryHeader } from './LibraryComponents/LibraryHeader';
import { LibrarySearch} from './LibraryComponents/LibrarySearch';
import { LibraryItem} from './LibraryComponents/LibraryItem';
import { LibraryList} from './LibraryComponents/LibraryList';

import{LoadingLibrary} from './LibraryComponents/LoadingLibrary'
import{ErrorLibrary} from './LibraryComponents/ErrorLibrary'
import{EmptyLibrary} from './LibraryComponents/EmptyLibrary'

import {useLocalStorage} from '../App/useLocalStorage'

import {LibraryProvider, useLibrary} from './LibraryContext/LibraryContext'


const userName = 'Sofia'


function Library(){

    const {
    filteredSongsLibrary,
    loading,
    error,
    deleteItemToLibrary,
} = useLibrary()


    //Estados 
    const [isSearchOpen, setIsSearchOpen] = React.useState(false); //estado para controlar si el input de busqueda en biblioteca esta abierto o cerrado
    const [selectItem, setSelectItem] = React.useState(null)
    const [menuPosition, setMenuPosition] = React.useState({x: 0, y:0})
    const [expandLibrary, setExpandLibrary] = useState(false)
    console.log(expandLibrary)






    const onSearch = () => {
        setIsSearchOpen(!isSearchOpen)
    }



    return(
            <aside className={`library__container h-100 rounded-3 flex-column overflow-hidden d-flex bg-#121212 ${expandLibrary ? "library--expand" : ""}`}>
                

                <LibraryHeader 
                setExpandLibrary={setExpandLibrary}
                />


                <LibraryHeaderPills />

                <div className='library__list  px-1 overflow-auto flex-grow-1'>

                    <div className='small-letter d-flex justify-content-between align-items-center mx-2 '
                    
                    >

                        <LibrarySearch 
                        onSearch = {onSearch}
                        isSearchOpen = {isSearchOpen}
                        setIsSearchOpen = {setIsSearchOpen}
                        />
                    </div>

                    <LibraryList>

                        {(loading && !error) && <LoadingLibrary />}
                        {(error && !loading) &&<ErrorLibrary />}
                        {(!loading && !error && filteredSongsLibrary.length == 0) && <EmptyLibrary />}

                        {filteredSongsLibrary.map(item => (

                            <LibraryItem
                            key={item.title}
                            item={item}
                            userName = {userName}
                            selectItem = {selectItem}
                            setSelectItem = {setSelectItem}
                            menuPosition = {menuPosition}
                            setMenuPosition = {setMenuPosition}
                            onDelete = {()=>deleteItemToLibrary(item.title)}
                            />
                            
                        ))}

                    </LibraryList>

                    
                </div>
            </aside>
    )


}

export {Library}