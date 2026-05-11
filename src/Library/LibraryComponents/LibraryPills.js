import {ReactComponent as CloseSVG} from "../close.svg"

function LibraryPills({ showPlaylist, showArtist, setShowPlaylist, setShowArtist }){
    return (
        <div className='pills__container p-2 d-flex'>
            {(showPlaylist || showArtist) && (
                <button 
                onClick={()=>{
                    setShowArtist(false)
                    setShowPlaylist(false)
                }}
                className='pills__button rounded-circle d-flex align-items-center'
                >
                    <CloseSVG className='m-0 p-0'/>
                </button>
            )}
            <button 
            onClick={()=> {
                setShowPlaylist(true)
                setShowArtist(false)
            }}
            className='pills__button rounded-pill m-1'>Playlists</button>
            <button 
            onClick={()=> {
                setShowPlaylist(false)
                setShowArtist(true)
            }}
            className='pills__button rounded-pill m-1'>Artistas</button>
        </div>
    )
}

export { LibraryPills }