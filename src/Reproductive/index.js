import './reproductive.css'
import React from 'react'
import {ReactComponent as VerifySVG} from './reproductivSVG/verify.svg'
import {ReactComponent as PauseSVG} from './reproductivSVG/pause.svg'
import {ReactComponent as PreviousSVG} from './reproductivSVG/previous.svg'
import {ReactComponent as NextSVG} from './reproductivSVG/next.svg'

import {ReactComponent as ListenSVG} from './reproductivSVG/listen.svg'
import {ReactComponent as ListSVG} from './reproductivSVG/list.svg'
import {ReactComponent as MicrophoneSVG} from './reproductivSVG/microphone.svg'
import {ReactComponent as SpeakerSVG} from './reproductivSVG/speaker.svg'


function Reproductive(){
    return(
        <section className=" bg-black ">
            <div className="reproductive__container d-grid">

                <div className='reproductive reproductive__info'>
                    <figure className='info__image-container'>
                        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyiqeyfo4W94byruTLSCU8maw187wOqtgPPU-uMu0hN26GVtwbBkuoIXfH&s=10'/>
                    </figure>
                    <div>
                        <h6 className='info--tittle'>Nombre</h6>
                        <p className='info--subtittle'>Artista</p>
                    </div>
                    <div>
                        <span>
                            <VerifySVG 
                            className='verify-svg'
                            />
                        </span>
                    </div>
                    
                </div>

                <div className='reproductive reproductive__box'>
                    <div>
                        <button className='box__button'>
                            <PreviousSVG className='box__button--svg'/>
                        </button>
                        <button className='box__button bg-white rounded-circle d-flex align-items-center justify-content-center'>
                            <PauseSVG className='box__button--svg pause-svg'/>
                        </button>
                        <button className='box__button'>
                            <NextSVG className='box__button--svg'/>
                        </button>
                    </div>

                    <div>
                        <p>Reproductor</p>
                    </div>
                </div>

                <div className='reproductive reproductive__options'>
                    <div className='options__buttons'>
                        <button>
                            <ListenSVG />
                        </button>
                        <button>
                            <ListSVG />
                        </button>
                        <button>
                            <MicrophoneSVG />
                        </button>
                        <button>
                            <SpeakerSVG />
                        </button>

                        <button>volumen</button>
                    </div>
                </div>
            </div>

            
        </section>
    )
}

export {Reproductive}