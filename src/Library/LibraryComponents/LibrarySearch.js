function LibrarySearch({
    searchLibraryRef,
    onSearch,
    SearchSVG,
    inputRef,
    isSearchOpen,
    lookingLibrary,
    setLookingLibrary,
    ListSVG,
}){
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