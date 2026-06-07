import React, { useContext } from "react"
import { useLocalStorage } from "../../App/useLocalStorage"

const LibraryContext = React.createContext()

function useLibrary(){
    return useContext(LibraryContext)
}


function LibraryProvider({children}){
        const {
            item: items, 
            saveItem: saveItems,
            loading,
            error,
        } = useLocalStorage('Items', [])

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

    const [lookingLibrary, setLookingLibrary] = React.useState(''); // estado del input de busqueda en biblioteca para filtrar la lista de canciones/artistas segun lo que el usuario escriba
    

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



    const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1)


    //Funciones
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

    const value = {
            libraryAdded,
            setLibraryAdded,
            libraryModal,
            setLibraryModal,
            formData,
            setFormData,
            libraryModalType,
            typeError,
            setTypeError,
            openLibraryModal,
            addItemToLibrary,
            showPlaylist,
            setShowPlaylist,
            showArtist,
            setShowArtist,
            capitalize,
            filteredSongsLibrary,
            lookingLibrary,
            setLookingLibrary,
            deleteItemToLibrary,
            loading,
            error,

    }

    return (
        <LibraryContext.Provider value={value}>
            {children}
        </LibraryContext.Provider>
    )
}

export{LibraryContext, LibraryProvider, useLibrary}