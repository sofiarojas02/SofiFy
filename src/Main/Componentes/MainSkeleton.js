import React from 'react';

function MainSkeleton() {

  return (
    <main className='main-esqueleto'>
      <section className='recent-skeleton__container'>
        <div className='recent-skeleton__card'></div>
        <div className='recent-skeleton__card'></div>
        <div className='recent-skeleton__card'></div>
        <div className='recent-skeleton__card'></div>
        <div className='recent-skeleton__card'></div>
        <div className='recent-skeleton__card'></div>
      </section>

      <section>
        <div className='album-card-skeleton'></div>
        <div className='album-card-skeleton'></div>
        <div className='album-card-skeleton'></div>
        <div className='album-card-skeleton'></div>
        <div className='album-card-skeleton'></div>
      </section>
    </main>

  );
}

export { MainSkeleton };