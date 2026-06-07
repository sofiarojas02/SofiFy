import React from 'react'
import { MainPill } from './Componentes/MainPill'
import { MainPillsContainer } from './Componentes/MainPillsContainer'
import { MainRecent } from './Componentes/MainRecent'
import { RecentCard } from './Componentes/RecentCard'
import './main.css'
import { useRecentCards } from './mainProcess'
import { useLocalStorage } from '../App/useLocalStorage'
import { MainMusic } from './Componentes/MainMusic'
import { MusicCard } from './Componentes/MusicCard'
import { playlistData } from './Componentes/playlistData'

function Main({onSelectTrack}){
    const {recentCard, addRecent, deleteRecent, editRecent, loading} = useRecentCards()
    const playlists = playlistData
    
    return(
        <section className="main__container  overflow-auto rounded-3 bg-#121212 flex-grow-1">
            <MainPillsContainer addRecent={addRecent}>
                <MainPill pillName={'Todo'} />
                <MainPill pillName={'Musica'} />
                <MainPill pillName={'Podcast'} />
            </MainPillsContainer>

            <MainRecent>
                {!loading && recentCard.map((card) => (
                    <RecentCard
                    key={card.id}
                    img={card.img}
                    title={card.title}
                    onDelete={() => deleteRecent(card.id)}
                    onEdit={editRecent}
                    cardId={card.id}
                    
                    />
                ))}
            </MainRecent>

            <MainMusic>
                {playlists.map((album) => (
                    <MusicCard
                    key={album.name}
                    cardName = {album.name}
                    cardImage= {album.image}
                    cardMembers= {album.members}
                    onSelectTrack={() => onSelectTrack(album)}
                    />
                ))}
            </MainMusic>

        </section>
    )
}

export {Main}