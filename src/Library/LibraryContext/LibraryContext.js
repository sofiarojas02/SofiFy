import React from "react"

const LibraryContext = React.createContext()

function LibraryProvider({Children}){

    



    return (
        <LibraryContext.Provider>
            {Children}
        </LibraryContext.Provider>
    )
}