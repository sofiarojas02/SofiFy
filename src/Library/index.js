import './library.css'
import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import {ReactComponent as LibraryIcon} from './library.svg'
import {ReactComponent as PlusIcon} from './plus.svg'
import {ReactComponent as ExpandIcon} from './expand.svg'
import {ReactComponent as SearchSVG} from "../assets/search.svg"
import {ReactComponent as ListSVG} from "./list.svg"


const itemsList = [
    { 
        title: 'Tus me gusta',
        subtitle: 'Playlist • 2 canciones',
        img: 'https://www.oldskull.net/wp-content/uploads/2015/01/Rock_Covers-ilustracion-oldskull-15.jpg',
        type: 'playlist'
    },
    { 
        id: 2,
        title: 'Daily Mix 1',
        subtitle: 'Hecho para Sofía',
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
    const [error, setError] = React.useState(false)

    // const [items, setItems] = React.useState([{ 
    //     title: 'Tus me gusta',
    //     subtitle: '2 canciones',
    //     img: 'https://www.oldskull.net/wp-content/uploads/2015/01/Rock_Covers-ilustracion-oldskull-15.jpg',
    //     type: 'playlist'
    // }])
    


    const [items, saveItems] = useLocalStorage('Items', itemsList)




    const plusRef = React.useRef(null)

    useEffect(()=>{
        const plusRefClickOutside = (e) =>{
            if(plusRef.current && !plusRef.current.contains(e.target)){
                setLibraryAdded(false)
            }
        }

        document.addEventListener('mousedown', plusRefClickOutside)
        return () => document.removeEventListener('mousedown', plusRefClickOutside)
    },[libraryAdded])

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
                    setError(false)
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

    const filteredSongsLibrary = sortedItems.filter(item =>
        item.title.toLowerCase().includes(lookingLibrary.toLowerCase())
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
        if(items.some(item => item.title.toLowerCase() === formData.title.toLowerCase())){
            setError(true)
        }else{
            saveItems([...items, {...newItem, type: libraryModalType}])
            setLibraryModal(false)
            setFormData({title: '', subtitle: '', img: ''})
        }
    }

    const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1)

    return(
            <aside className="library__container h-100 rounded-3 flex-column overflow-hidden d-flex bg-#121212">

                <header className='library__header d-flex p-1 align-items-center w-100'>
                    <div className='library__trigger d-flex align-items-center'>
                        <button className=' library__button--toggle rounded-5 border-0 text-secondary d-flex align-items-center justify-content-center p-2'>
                            <LibraryIcon className='library-icon'/>
                        </button>
                        <h2 className='fs-6 fw-bold m-0 p-2'>Tu biblioteca</h2>

                    </div>

                    <div className='library__header--buttons d-flex gap-1 ms-auto'>

                        <div
                        className='plus__container'
                        ref={plusRef}
                        >
                        <button className='header__button  bg-dark text-secondary rounded-5 '
                        onClick={()=> setLibraryAdded(!libraryAdded)}
                        >
                            <PlusIcon className='library__icon plus-icon'/>
                        </button>

                        {libraryModal && (
                            <>
                                <div 
                                ref={libraryModalRef}
                                className='libraryModal__form p-3 bg-dark position-absolute m-3 rounded-2' >
                                    <p>Agregar {libraryModalType}</p>
                                    <form 
                                    onSubmit={(e) => {
                                            e.preventDefault()
                                            addItemToLibrary(formData)}}
                                    className='d-flex flex-column'>

                                        <div className='libraryModal__element'>
                                            {error && (
                                                <p className='text-danger'>Ya existe un {libraryModalType} con ese nombre</p>
                                            )}
                                            <label>Titulo:</label>
                                            <input
                                            value={formData.title}
                                            // onSubmit={}
                                            onChange={(e) => {
                                                setFormData({...formData, title: e.target.value})
                                                setError(false)
                                            }
                                                
                                            } 
                                            ></input>
                                        </div>

                                        <div
                                        className={`libraryModal__element ${libraryModalType === 'artista' && 'd-none'}`}
                                        >
                                            <label>Hecho por:</label>
                                            <input
                                            value={formData.subtitle}
                                            onChange={(e) => setFormData({...formData, subtitle: e.target.value})}
                                            ></input>
                                        </div>

                                        <div
                                        className='libraryModal__element'
                                        >
                                            <label>Imagen Url:</label>
                                            <input
                                            value={formData.img}
                                            onChange={(e) => setFormData({...formData, img: e.target.value})}
                                            ></input>
                                        </div>

                                        <div
                                        className='libraryModal__element'
                                        >
                                            <input 
                                            type='submit'
                                            className='btn btn-success'
                                            value={'Crear'}
                                            ></input>
                                        </div>
                                    </form>
                                </div>
                            </>
                        )}

                        {libraryAdded && (
                            <>
                                <div 
                                className='plus__menu '>
                                    <div className='plus__menu--option d-flex gap-3 align-items-center p-2'>
                                        <PlusIcon className='plus__option--icon library__icon plus-icon rounded-5 '/>
                                        <div 
                                        onClick={() => openLibraryModal('playlist')}
                                        className='plus__option--text '
                                        role='button'
                                        >
                                            <h3 className='m-0 p-0 '>Playlist</h3>
                                            <p className='m-0 p-0 text-secondary'>Crea una playlist con canciones o episodios</p>
                                        </div>

                                        
                                    </div>

                                    <div className='plus__menu--option d-flex gap-3 align-items-center p-2'>
                                        <PlusIcon className='plus__option--icon library__icon plus-icon rounded-5 '/
                                        >
                                        <div 
                                        className='plus__option--text'
                                        role='button'
                                        onClick={() => openLibraryModal('artista')}
                                        >
                                            <h3 className='m-0 p-0 '>Artista</h3>
                                            <p className='m-0 p-0 text-secondary'>Guarda las canciones de tus artitas favoritos</p>
                                        </div>

                                        
                                    </div>

                                </div>
                            </>
                        )}

                        </div>
                        <button className='header__button  bg-dark text-secondary rounded-5 '>
                            <ExpandIcon className='library__icon expand-icon'/>
                        </button>
                    </div>
                </header>

                <div className='pills__container p-2 '>
                    <button className='pills__button rounded-pill m-1 '>Playlists</button>
                    <button className='pills__button rounded-pill m-1 '>Artistas</button>
                </div>

                <div className='library__list  px-1 overflow-auto flex-grow-1'>

                    <div className='small-letter d-flex justify-content-between align-items-center mx-2 '
                    
                    >

                        <div className='librarySearch d-flex'
                        ref={searchLibraryRef}
                        >
                            <button className='librarySearch__button hover-icon rounded-5 p-2 border-0 bg-transparent text-secondary d-flex align-items-center justify-content-center'
                            onClick={onSearch}
                            >
                                <SearchSVG 
                                className='SearchIcon'
                                />
                                </button>

                                <input 
                                ref={inputRef}
                                className= {`librarySearch__input ${isSearchOpen ? 'librarySearch__input--open':''}`}
                                placeholder='Buscar...' 
                                value={lookingLibrary}
                                onChange={(e)=>(
                                    setLookingLibrary(e.target.value)
                                )}
                                />
                                
                        </div>

                        {isSearchOpen && (
                            <p className='hover-text text-secondary m-1'>
                                <span> <ListSVG /> </span> </p>
                        )}
                        {!isSearchOpen && (
                            <p className=' hover-text text-secondary m-1'>Recientes <span> <ListSVG /> </span> </p>
                        )}
                        

                    </div>

                    {filteredSongsLibrary.map(item => (
                        
                        <div
                        key={item.title}
                        className='list__item  d-flex p-2 pt-2 pb-2 align-items-center gap-2 rounded-3  bg-transparent text-white'
                        >
                            <div className='d-flex align-items-center'>
                                <img 
                                className={`list__item--img ${item.type === 'artista' ? 'rounded-circle' : 'rounded-3'}`}
                                src={item.img ? item.img: 'https://www.oldskull.net/wp-content/uploads/2015/01/Rock_Covers-ilustracion-oldskull-15.jpg'} 
                                alt={item.title} />
                            </div>

                            <div className=''>
                                <h3 className='list__item--title m-0 mb-1'> {capitalize(item.title)} </h3>
                                <p className='list__item--subtitle m-0'> {capitalize(item.type) + ' • ' + item.subtitle} </p>
                            </div>

                        </div>
                    ))}

                    
                </div>
            </aside>
    )


}

export {Library}