import './library.css'
import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import {ReactComponent as SearchSVG} from "../assets/search.svg"
import {ReactComponent as ListSVG} from "./list.svg"
import {ReactComponent as CloseSVG} from "./close.svg"
import { LibraryHeaderPills } from "./LibraryComponents/LibraryHeaderPills";

import { LibraryHeader } from './LibraryComponents/LibraryHeader';
import { LibrarySearch} from './LibraryComponents/LibrarySearch';
import { LibraryItem} from './LibraryComponents/LibraryItem';
import { LibraryList} from './LibraryComponents/LibraryList';

import {useLocalStorage} from '../App/useLocalStorage'
const userName = 'Sofia'
// const itemsList = [
//     { 
//         title: 'Tus me gusta',
//         subtitle: 'Playlist • 2 canciones',
//         img: 'https://www.oldskull.net/wp-content/uploads/2015/01/Rock_Covers-ilustracion-oldskull-15.jpg',
//         type: 'playlist'
//     },
//     { 
//         id: 2,
//         title: 'Daily Mix 1',
//         subtitle: 'Hecho para Sofía',
//         img: 'https://www.oldskull.net/wp-content/uploads/2015/01/Rock_Covers-ilustracion-oldskull-15.jpg',
//         type: 'playlist',
//     },
// ];


function Library(){
    const {
        item: items, 
        saveItem: saveItems,
        loading,
        error,
    } = useLocalStorage('Items', [])

    //Estados 
    const [isSearchOpen, setIsSearchOpen] = React.useState(false); //estado para controlar si el input de busqueda en biblioteca esta abierto o cerrado
    const [lookingLibrary, setLookingLibrary] = React.useState(''); // estado del input de busqueda en biblioteca para filtrar la lista de canciones/artistas segun lo que el usuario escriba
    const [isColapsed, setIsCollapsed] = React.useState(false); // estado para controlar si la biblioteca esta colapsada o expandida
    const [libraryAdded, setLibraryAdded] = React.useState(false); // estado para controlar si se ha agregado una nueva canción o artista a la biblioteca (simulada)
    const [libraryModal, setLibraryModal] = React.useState(false) //Saber si el modal para añadir esta abierto o cerrado
    const [libraryModalType, setLibraryModalType] =React. useState('') //Saber el tipo de lo que se quiere añadir (playlist / artista)
    const [formData, setFormData] = React.useState({
        title: '',
        subtitle: '',
        img: '',
    })
    const [typeError, setTypeError] = React.useState('') // Estado para saber si se intento añadir un elemento con un titulo en uso
    const [showPlaylist, setShowPlaylist] = React.useState(false)
    const [showArtist, setShowArtist] = React.useState(false)
    const [selectItem, setSelectItem] = React.useState(null)
    const [menuPosition, setMenuPosition] = React.useState({x: 0, y:0})



    const plusRef = React.useRef(null)

    const inputRef = React.useRef(null); //detecta click afuera del input de busqueda en biblioteca para cerrarlo
    const searchLibraryRef = useRef(null); // detecta click afuera del contenedor del input de busqueda en biblioteca para cerrarlo y limpiar el estado del input de busqueda
    const libraryModalRef = React.useRef(null) //ref para el modal de añadir playlis o artist

    // efecto para detectar click afuera del contenedor del input de busqueda en biblioteca y cerrar el input de busqueda y limpiar el estado del input de busqueda
    useEffect(()=>{
        const libraryClickOutside = (e) => {
            if(searchLibraryRef.current && !searchLibraryRef.current.contains(e.target)){
                setIsSearchOpen(false);
                setLookingLibrary('');
            }
        }
        
            document.addEventListener('mousedown', libraryClickOutside);
            return () => document.removeEventListener('mousedown', libraryClickOutside);

        },[]);
        
        // Si se abre el buscador, pon el cursor ahí de una vez
        useEffect(() => {
            if(isSearchOpen){
                inputRef.current.focus();
            }
        }, [isSearchOpen])


        //Abrir modal de libreria
        useEffect(()=>{
            const libraryModalOutside = (e) => {
                if(libraryModalRef.current && !libraryModalRef.current.contains(e.target)){
                    setLibraryModal(false)
                    setFormData({title: '', subtitle: '', img: ''})
                    setTypeError('')
                }
            }

            document.addEventListener('mousedown', libraryModalOutside);
            return () => document.removeEventListener('mousedown', libraryModalOutside)

        },[])




    const sortedItems = [...items].sort((a,b) => {
        if (a.type === 'playlist' && b.type === 'artista') return -1;
        if (a.type === 'artista' && b.type === 'playlist') return 1;
        return 0;
    }   )

    const filteredSongsLibrary = sortedItems.filter(item =>{
        if(showPlaylist){
            return item.type === 'playlist' && item.title.toLowerCase().includes(lookingLibrary.toLowerCase())
        }
        else if(showArtist){
            return item.type === 'artista' && item.title.toLowerCase().includes(lookingLibrary.toLowerCase())
        }
        
        return item.title.toLowerCase().includes(lookingLibrary.toLowerCase())

    }
    )

    const onSearch = () => {
        setIsSearchOpen(!isSearchOpen)
    }

    const openLibraryModal = (type) =>{
        setLibraryAdded(false)
        setLibraryModal(true)
        setLibraryModalType(type)
    }

    const addItemToLibrary = (newItem)=>{
        if(newItem.title.trim() === ''){
            setTypeError('Titulo no puede estar vacio')
        }
        else if(items.some(item => item.title.toLowerCase() === formData.title.toLowerCase())){
            setTypeError('Ya existe un playlist con ese nombre')
        }
        else{
            saveItems([...items, {...newItem, type: libraryModalType}])
            setLibraryModal(false)
            setFormData({title: '', subtitle: '', img: ''})
        }
    }

    const deleteItemToLibrary = (deleteTitle)=>{
        const newItems = items.filter((item) => item.title !== deleteTitle)
        saveItems(newItems)
    }

    const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1)



    return(
            <aside className="library__container h-100 rounded-3 flex-column overflow-hidden d-flex bg-#121212">

                <LibraryHeader 
                    libraryAdded = {libraryAdded}
                    setLibraryAdded = {setLibraryAdded}
                    libraryModal = {libraryModal}
                    setLibraryModal = {setLibraryModal}
                    formData = {formData}
                    setFormData = {setFormData}
                    libraryModalRef = {libraryModalRef}
                    plusRef = {plusRef}
                    libraryModalType = {libraryModalType}
                    typeError = {typeError}
                    setTypeError = {setTypeError}
                    openLibraryModal = {openLibraryModal}
                    addItemToLibrary = {addItemToLibrary}
                
                />


                <LibraryHeaderPills 
                    showPlaylist = {showPlaylist}
                    setShowPlaylist = {setShowPlaylist}
                    showArtist = {showArtist}
                    setShowArtist = {setShowArtist}
                    CloseSVG={CloseSVG}
                />

                <div className='library__list  px-1 overflow-auto flex-grow-1'>

                    <div className='small-letter d-flex justify-content-between align-items-center mx-2 '
                    
                    >

                        <LibrarySearch 
                        searchLibraryRef = {searchLibraryRef}
                        onSearch = {onSearch}
                        SearchSVG = {SearchSVG}
                        inputRef = {inputRef}
                        isSearchOpen = {isSearchOpen}
                        lookingLibrary = {lookingLibrary}
                        setLookingLibrary = {setLookingLibrary}
                        ListSVG={ListSVG}
                        />
                    </div>

                    <LibraryList>

                        {(loading && !error) && <p>Cargando</p>}
                        {(error && !loading) && <p>Error</p>}
                        {(!loading && filteredSongsLibrary.length == 0) && <p>Añade tu primera playlist</p>}

                        {filteredSongsLibrary.map(item => (

                            <LibraryItem
                            key={item.title}
                            item={item}
                            capitalize={capitalize}
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