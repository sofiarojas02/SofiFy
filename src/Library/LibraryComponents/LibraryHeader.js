import React, { useEffect, useState } from 'react';
import {ReactComponent as LibraryIcon} from '../library.svg'
import {ReactComponent as PlusIcon} from '../plus.svg'
import {ReactComponent as ExpandIcon} from '../expand.svg'




function LibraryHeader({
    libraryAdded,
    setLibraryAdded,
    libraryModal,
    setLibraryModal,
    formData,
    setFormData,
    libraryModalRef,
    plusRef,
    libraryModalType,
    typeError,
    setTypeError,
    openLibraryModal,
    addItemToLibrary,

})

{

        useEffect(()=>{
            const plusRefClickOutside = (e) =>{
                if(plusRef.current && !plusRef.current.contains(e.target)){
                    setLibraryAdded(false)
                }
            }
    
            document.addEventListener('mousedown', plusRefClickOutside)
            return () => document.removeEventListener('mousedown', plusRefClickOutside)
        },[libraryAdded])


    return(
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
                                            {typeError && (
                                                <p className='text-danger'>{typeError}</p>
                                            )}
                                            <label>Titulo:</label>
                                            <input
                                            value={formData.title}
                                            // onSubmit={}
                                            onChange={(e) => {
                                                setFormData({...formData, title: e.target.value})
                                                setTypeError('')
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
    )
}

export {LibraryHeader}