import './App.css';
import {NavBar} from '../NavBar'
import { Library } from '../Library/Library';
import { RightPanel } from '../RightPanel';
import { Main } from '../Main/Main';
import { Reproductive } from '../Reproductive';
import { LibraryProvider } from '../Library/LibraryContext/LibraryContext';
import React from 'react';


function App() {

  const [activeTrack, setActiveTrack] = React.useState(null);
  const [navSearch, setNavSearch] = React.useState('');
    const [mainFilter, setMainFilter] = React.useState('todo')




  return (
    <>

      <div className='page__container vh-100  d-flex flex-column bg-black text-white'>
        <NavBar 
        searcher = {setNavSearch}
        searchValue = {navSearch}
        setMainFilter={setMainFilter}
        />

        <div className='page__body d-flex  overflow-hidden flex-grow-1 gap-2 p-1'>
          
          <LibraryProvider>
              <Library />
          </LibraryProvider>
          <Main 
          onSelectTrack={setActiveTrack}
          searchedMusic = {navSearch}
          mainFilter={mainFilter}
          setMainFilter={setMainFilter}
          />

          {activeTrack && 
            <RightPanel 
              title = {activeTrack.name}
              type = {activeTrack.type}
              subtittle = {activeTrack.author}
              author = {activeTrack.author}
              description = {activeTrack.description}
              coverImage = {activeTrack.image}
              authorImage= 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyiqeyfo4W94byruTLSCU8maw187wOqtgPPU-uMu0hN26GVtwbBkuoIXfH&s=10'
              onClose = {() => setActiveTrack(null)}
            />
          }
          
          
        </div>

        <Reproductive />
      </div>
    
    </>
  );
}

export default App;
