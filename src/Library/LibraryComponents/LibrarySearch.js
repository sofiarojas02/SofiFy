import React from "react"
import { useLibrary } from "../LibraryContext/LibraryContext"
import {ReactComponent as ListSVG} from "../list.svg"
import {ReactComponent as SearchSVG} from "../search.svg"
import { useRef, useEffect } from "react"

function LibrarySearch({
    isSearchOpen,
    setIsSearchOpen,
    onSearch,
    
}){
    const {
        lookingLibrary,
        setLookingLibrary,
    } = useLibrary()

    const inputRef = React.useRef(null); //detecta click afuera del input de busqueda en biblioteca para cerrarlo
    const searchLibraryRef = useRef(null); // detecta click afuera del contenedor del input de busqueda en biblioteca para cerrarlo y limpiar el estado del input de busqueda

        //Efectos
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





    return(
        <>

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
        </>
                        
    )
}

export {LibrarySearch}