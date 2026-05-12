import './App.css';
import {NavBar} from '../NavBar'
import { Library } from '../Library/Library';
import { RightPanel } from '../RightPanel';
import { Main } from '../Main';
import { Reproductive } from '../Reproductive';


function App() {
  return (
    <>

      <div className='page__container vh-100  d-flex flex-column bg-black text-white'>
        <NavBar />

        <div className='page__body d-flex  overflow-hidden flex-grow-1 gap-2 p-1'>
          
          <Library />
          <Main />
          <RightPanel />
        </div>

        <Reproductive />
      </div>
    
    </>
  );
}

export default App;
