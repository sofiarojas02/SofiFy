import './NavBar.css';
import {ReactComponent as IconoSVG} from "./icono.svg"
import {ReactComponent as SearchSVG} from "./search.svg"
import {ReactComponent as DowloadSVG} from "./dowload_arrow.svg"
import {ReactComponent as BellSVG} from "./bell.svg"
import {ReactComponent as HomeSVG} from "./home.svg"


function NavBar(){
    return(
        // nav left 
        <nav className=' bg-black d-flex align-items-center justify-content-between px-3 p-1'>


            <div className='nav-left '>
                <span className='navBar_logo'>
                    <IconoSVG />
                </span>
            </div>


            {/* Buscador */}
            <div className='nav-center justify-content-center d-flex '>
                <div className='search-wrapper d-flex align-items-center gap-2'>
                    <span className='homeIcon rounded-circle bg-dark p-2 '>
                        <HomeSVG />
                    </span>

                    <div className='search_container d-flex rounded-pill p-1 px-3 bg-dark'>
                        <span className='searchIcon input-group-text bg-transparent border-0'>
                            <SearchSVG />
                        </span>
                        <input 
                        className='navBar-search form-control bg-transparent border-0 text-white shadow-none'
                        placeholder='¿Que quieres reproducir?'></input>
                    </div>

                </div>
            </div>




            <div className='nav-right navBar_options d-flex align-items-center gap-3'>

                <button 
                className='options_button d-flex gap-2 align-items-center'>
                    <DowloadSVG />
                    <span className='fw-bold'>
                        Instalar aplicacion</span>
                </button>

                <button className='options_button '>
                    <BellSVG />
                </button>

                <button className='options_button perfil'>
                    S
                </button>

            </div>


        </nav>
    )
}

export {NavBar}