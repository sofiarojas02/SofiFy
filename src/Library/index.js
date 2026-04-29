import './library.css'
import React, { useEffect } from 'react';
import { useRef } from 'react';
import {ReactComponent as LibraryIcon} from './library.svg'
import {ReactComponent as PlusIcon} from './plus.svg'
import {ReactComponent as ExpandIcon} from './expand.svg'
import {ReactComponent as SearchSVG} from "../assets/search.svg"
import {ReactComponent as ListSVG} from "./list.svg"


const items = [
    { 
        id: 1,
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
    
    { 
        id: 3,
        title: 'Rock Classics',
        subtitle: 'Playlist • Spotify',
        img: 'https://www.oldskull.net/wp-content/uploads/2015/01/Rock_Covers-ilustracion-oldskull-15.jpg',
        type: 'playlist',
    },
        { 
        id: 4,
        title: 'Raimbow alternativo',
        subtitle: 'Playlist • Spotify',
        img: 'https://www.oldskull.net/wp-content/uploads/2015/01/Rock_Covers-ilustracion-oldskull-15.jpg',
        type: 'playlist',
    },
        { 
        id: 5,
        title: 'Rock Poetico',
        subtitle: 'Playlist • Spotify',
        img: 'https://www.oldskull.net/wp-content/uploads/2015/01/Rock_Covers-ilustracion-oldskull-15.jpg',
        type: 'playlist',
    },
    { 
        id: 6,
        title: 'Bad Bunny',
        subtitle: 'Artista',
        img: 'https://www.oldskull.net/wp-content/uploads/2015/01/Rock_Covers-ilustracion-oldskull-15.jpg',
        type: 'artist',
    },
    { 
    id: 7,
    title: 'lolita Mix 1',
    subtitle: 'Hecho para Sofía',
    img: 'https://www.oldskull.net/wp-content/uploads/2015/01/Rock_Covers-ilustracion-oldskull-15.jpg',
    type: 'playlist',
},
    { 
    id: 8,
    title: 'lolita Mix 1',
    subtitle: 'Hecho para Sofía',
    img: 'https://www.oldskull.net/wp-content/uploads/2015/01/Rock_Covers-ilustracion-oldskull-15.jpg',
    type: 'playlist',
},
    { 
    id: 9,
    title: 'lolita Mix 1',
    subtitle: 'Hecho para Sofía',
    img: 'https://www.oldskull.net/wp-content/uploads/2015/01/Rock_Covers-ilustracion-oldskull-15.jpg',
    type: 'playlist',
},
    { 
    id: 10,
    title: 'lolita Mix 1',
    subtitle: 'Hecho para Sofía',
    img: 'https://www.oldskull.net/wp-content/uploads/2015/01/Rock_Covers-ilustracion-oldskull-15.jpg',
    type: 'playlist',
},

    { 
    id: 11,
    title: 'lolita Mix 1',
    subtitle: 'Hecho para Sofía',
    img: 'https://www.oldskull.net/wp-content/uploads/2015/01/Rock_Covers-ilustracion-oldskull-15.jpg',
    type: 'playlist',
},
    { 
    id: 12,
    title: 'lolita Mix 1',
    subtitle: 'Hecho para Sofía',
    img: 'https://www.oldskull.net/wp-content/uploads/2015/01/Rock_Covers-ilustracion-oldskull-15.jpg',
    type: 'playlist',
},
    { 
    id: 13,
    title: 'lolita Mix 1',
    subtitle: 'Hecho para Sofía',
    img: 'https://www.oldskull.net/wp-content/uploads/2015/01/Rock_Covers-ilustracion-oldskull-15.jpg',
    type: 'playlist',
},
];



function Library(){
    const [isSearchOpen, setIsSearchOpen] = React.useState(false); //estado para controlar si el input de busqueda en biblioteca esta abierto o cerrado
    const [lookingLibrary, setLookingLibrary] = React.useState(''); // estado del input de busqueda en biblioteca para 

    const inputRef = React.useRef(null); //detecta click afuera del input de busqueda en biblioteca para cerrarlo
    const searchLibraryRef = useRef(null); //

    
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


    const sortedItems = [...items].sort((a,b) => {
        if (a.type === 'playlist' && b.type === 'artist') return -1;
        if (a.type === 'artist' && b.type === 'playlist') return 1;
        return 0;
    }   )

    const filteredSongsLibrary = sortedItems.filter(item =>
        item.title.toLowerCase().includes(lookingLibrary.toLowerCase())
    )

    const onSearch = () => {
        setIsSearchOpen(!isSearchOpen)
    }

    return(
            <aside className="library__container h-100 rounded-3 flex-column overflow-hidden d-flex bg-#121212">

                <header className='library__header d-flex p-1 align-items-center w-100'>
                    <button className='rounded-5 bg-black border-0 text-secondary d-flex align-items-center justify-content-center p-2'>
                        <LibraryIcon className='library-icon'/>
                    </button>
                    <h2 className='fs-6 fw-bold m-0 p-2'>Tu biblioteca</h2>

                    <div className='library__header--buttons d-flex gap-1 ms-auto'>
                        <button className='header__button  bg-dark text-secondary rounded-5 '>
                            <PlusIcon className='library__icon plus-icon'/>
                        </button>
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
                        key={item.id}
                        className='list__item  d-flex p-2 pt-2 pb-2 align-items-center gap-2 rounded-3  bg-transparent text-white'
                        >
                            <div className='d-flex align-items-center'>
                                <img 
                                className={`list__item--img ${item.type === 'artist' ? 'rounded-circle' : 'rounded-3'}`}
                                src={item.img} 
                                alt={item.title} />
                            </div>

                            <div className=''>
                                <h3 className='list__item--title m-0 mb-1'> {item.title} </h3>
                                <p className='list__item--subtitle m-0'> {item.subtitle} </p>
                            </div>

                        </div>
                    ))}

                    
                </div>
            </aside>
    )


}

export {Library}