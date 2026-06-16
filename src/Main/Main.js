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
import { EmptyMain } from './Componentes/EmptyMain'
import { MainSkeleton } from './Componentes/MainSkeleton'

function Main({onSelectTrack, searchedMusic, mainFilter, setMainFilter}){
    const {recentCard, addRecent, deleteRecent, editRecent, loading} = useRecentCards()

    const pillTypes = [
        {name: 'Todo', value : 'todas'},
        {name: 'Playlist', value : 'playlist'},
        {name: 'Podcast', value : 'podcast'},
    ]


    const playlists = playlistData

    const playlistsFiltered = playlists.filter(album =>  {
        if(mainFilter === 'todo'){
            return album.name.toLocaleLowerCase().includes(searchedMusic.toLocaleLowerCase()) ||
            album.members.some(member => member.toLocaleLowerCase().includes(searchedMusic))
        }

        return album.type.toLocaleLowerCase() === mainFilter &&
        (album.name.toLocaleLowerCase().includes(searchedMusic.toLocaleLowerCase()) ||
        album.members.some(member => member.toLocaleLowerCase().includes(searchedMusic)))
    })

    
    return(
        <section className="main__container  overflow-auto rounded-3 bg-#121212 flex-grow-1">
            <MainPillsContainer addRecent={addRecent}>
                {pillTypes.map(pill => (
                    <MainPill 
                    key={pill.name}
                    pillName={pill.name} 
                    value = {pill.value}
                    onSelect = {setMainFilter}
                    mainFilter={mainFilter}
                    />
                ))}
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

                {loading && <MainSkeleton />}
            <MainMusic>

                {!loading && playlistsFiltered.map((album) => (
                    <MusicCard
                    key={album.name}
                    cardName = {album.name}
                    cardImage= {album.image}
                    cardMembers= {album.members}
                    onSelectTrack={() => onSelectTrack(album)}
                    />
                ))}

            </MainMusic>    

                {playlistsFiltered.length === 0 && 
                <EmptyMain 
                    valueNotFound = {searchedMusic}
                />}

        </section>
    )
}

export {Main}