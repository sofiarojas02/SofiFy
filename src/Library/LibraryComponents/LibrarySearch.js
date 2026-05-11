import React, { useEffect, useRef } from 'react';
import {ReactComponent as SearchSVG} from "../../assets/search.svg"
import {ReactComponent as ListSVG} from "../list.svg"

function LibrarySearch({ lookingLibrary, setLookingLibrary }){
    const [isSearchOpen, setIsSearchOpen] = React.useState(false)

    const inputRef = useRef(null)
    const searchLibraryRef = useRef(null)

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

    useEffect(() => {
        if(isSearchOpen){
            inputRef.current.focus();
        }
    }, [isSearchOpen])

    const onSearch = () => {
        setIsSearchOpen(!isSearchOpen)
    }

    return (
        <div className='small-letter d-flex justify-content-between align-items-center mx-2'>
            <div className='librarySearch d-flex' ref={searchLibraryRef}>
                <button className='librarySearch__button hover-icon rounded-5 p-2 border-0 bg-transparent text-secondary d-flex align-items-center justify-content-center'
                onClick={onSearch}
                >
                    <SearchSVG className='SearchIcon'/>
                </button>

                <input 
                ref={inputRef}
                className={`librarySearch__input ${isSearchOpen ? 'librarySearch__input--open':''}`}
                placeholder='Buscar...' 
                value={lookingLibrary}
                onChange={(e)=>(
                    setLookingLibrary(e.target.value)
                )}
                />
            </div>

            {isSearchOpen && (
                <p className='hover-text text-secondary m-1'>
                    <span><ListSVG /></span>
                </p>
            )}
            {!isSearchOpen && (
                <p className='hover-text text-secondary m-1'>Recientes <span><ListSVG /></span></p>
            )}
        </div>
    )
}

export { LibrarySearch }