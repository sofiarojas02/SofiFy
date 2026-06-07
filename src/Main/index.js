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

function Main(){
    const {recentCard, addRecent, deleteRecent, editRecent, loading} = useRecentCards()

    const playlists = [
    {
        name: "Timbaland Mix",
        image: "https://pickasso.spotifycdn.com/image/ab67c0de0000deef/dt/v1/img/artistmix/5Y5TRrQiqgUO4S36tzjIRZ/en",
        members: ["Nelly Furtado", "Lady Gaga", "Gwen Stefani"]
    },
    {
        name: "Adrian Chandler Mix",
        image: "https://pickasso.spotifycdn.com/image/ab67c0de0000deef/dt/v1/img/radio/artist/7qJsLLT3iv2Uc0XbpnmEKz/en",
        members: ["Camille Saint-Saëns", "Karoly Botvay"]
    },
    {
        name: "Radio de Paul Lewis",
        image: "https://pickasso.spotifycdn.com/image/ab67c0de0000deef/dt/v1/img/radio/artist/4LYCuV8d6rylb6zjv2k03l/en",
        members: ["Ludwig van Beethoven", "Johannes Brahms"]
    },
    {
        name: "Radio de Bad Bunny",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBtbJLAKENI7JQ0zze_IvVF1mOkx9oN-6fZUTrQFBzmQ&s",
        members: ["Arcángel", "KAROL G", "Feid"]
    },
    {
        name: "Mix house",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMU18RNFSwZfY3kRQ4GCxcwKkJUyNubqzrmizKHhc1ZA&s=10",
        members: ["Bakermat", "MISERO", "bbno$"]
    },
    {
        name: "Mix de los 2000",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqD_-Jwexnn_nZU0MRLQlo5sd6wPt1qLBCswZV594kjg&s=10",
        members: ["Justin Timberlake", "Black Eyed Peas", "Gwen Stefani"]
    }
];
    
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
                    cardName = {album.name}
                    cardImage= {album.image}
                    cardMembers= {album.members}
                    />
                ))}
            </MainMusic>

        </section>
    )
}

export {Main}