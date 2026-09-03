import './NavBar.css';
import {ReactComponent as IconoSVG} from "./icono.svg"
import {ReactComponent as SearchSVG} from "./search.svg"
import {ReactComponent as DowloadSVG} from "./dowload_arrow.svg"
import {ReactComponent as BellSVG} from "./bell.svg"
import {ReactComponent as HomeSVG} from "./home.svg"
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { FiLogOut } from 'react-icons/fi';
import { ChangeUserInfoFomr } from './NavBarComponents/ChangeUserInfoForm';

function NavBar({searcher, searchValue, setMainFilter}){
    const navigate = useNavigate();
    const [user, setUser] = useState(null)
    const [infoUser, setInfoUser] = useState(false)

        const infoUserRef = useRef()
    
        //Cerrar form de info
        useEffect(()=>{
            const handleClickOutside = (event) => {
                if(infoUserRef.current && !infoUserRef.current.contains(event.target)){
                    setInfoUser(false)
                }
            }
    
            document.addEventListener('mousedown', handleClickOutside);
    
            return () => {
                document.removeEventListener('mousedown', handleClickOutside)
            }
        },[])



    useEffect(()=>{
        const userData = localStorage.getItem('user');
        if(userData){
            setUser(JSON.parse(userData))
        }
    },[])

    const handleLogout = () =>{
        localStorage.removeItem('user');
        navigate('/login')
    }

    const editUser = () => {
        setInfoUser((prev) => !prev)

    }


    return(
        // nav left 
        <nav className='navBar bg-black d-flex align-items-center justify-content-between px-3 p-1'>


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
                        placeholder='¿Que quieres reproducir?'
                        onChange={(e) => searcher(e.target.value)}
                        value={searchValue}
                        onClick={()=> setMainFilter('todo')}
                        ></input>
                    </div>

                </div>
            </div>





            <div className='nav-right navBar_options d-flex align-items-center gap-4'>
                <button className='options_button '>
                    <BellSVG />
                </button>

                <button className='options_button d-flex gap-2 align-items-center'>
                    <DowloadSVG />
                    <span className='fw-bold'>Instalar app</span>
                </button>

                <div className='navbar-auth'>
                    {user ? (
                        <div 
                        style={{display:'flex', alignItems: 'center', gap: '10px', position: 'relative'}}
                        ref={infoUserRef}
                        >
                            <img
                                onClick={editUser}
                                className='auth-image'
                                src={user.image_url ? user.image_url : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2pRSTXl8Gjd0r-OKMTi7dGQlYh3BF9rosMTL0y-ZZ7g&s=10'}
                                alt={user.username}
                                style={{ width: '35px', height: '35px', borderRadius: '50%' }}
                            />
                            <span>{user.username}</span>


                            {infoUser && (
                                <ChangeUserInfoFomr
                                user = {user}
                                />
                            )}

                            <button className="button logout-btn" title='Log out'
                            onClick={handleLogout}
                            >
                                <span>
                                <FiLogOut size={20} />
                                </span>
                                <span className="text">Log out</span>
                            </button>

                        </div>
                    ) : (

                        <div>
                            <button 
                                className='options_button register_btn fw-bold'
                                onClick={() => navigate('/register')}
                            >
                                Registrarte
                            </button>

                            <button 
                                className='login_btn fw-bold'
                                onClick={() => navigate('/login')}
                            >
                                Iniciar sesión
                            </button>
                        </div>

                    )
                }
                </div>

            </div>


        </nav>
    )
}

export {NavBar}