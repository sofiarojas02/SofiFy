import React from 'react'
import { MainPill } from './Componentes/MainPill'
import { MainPillsContainer } from './Componentes/MainPillsContainer'
import { MainRecent } from './Componentes/MainRecent'
import { RecentCard } from './Componentes/RecentCard'
import './main.css'
import { useRecentCards } from './mainProcess'
import { useLocalStorage } from '../App/useLocalStorage'

function Main(){
    const {recentCard, addRecent, deleteRecent, editRecent, loading} = useRecentCards()
    
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

        </section>
    )
}

export {Main}