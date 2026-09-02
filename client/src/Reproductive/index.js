import './reproductive.css'
import React, { useEffect, useRef, useState } from 'react'
import {ReactComponent as VerifySVG} from './reproductivSVG/verify.svg'
import {ReactComponent as PauseSVG} from './reproductivSVG/pause.svg'
import {ReactComponent as PreviousSVG} from './reproductivSVG/previous.svg'
import {ReactComponent as NextSVG} from './reproductivSVG/next.svg'

import {ReactComponent as ListenSVG} from './reproductivSVG/listen.svg'
import {ReactComponent as ListSVG} from './reproductivSVG/list.svg'
import {ReactComponent as MicrophoneSVG} from './reproductivSVG/microphone.svg'
import {ReactComponent as SpeakerSVG} from './reproductivSVG/speaker.svg'
import {ReactComponent as VolumeSVG} from './reproductivSVG/volume.svg'
import {ReactComponent as PlaySVG} from './reproductivSVG/play.svg'
import { useReproducer } from './useReproducer'

function Reproductive(){
    const {songRef,
        progressSong,  
        onPlay, 
        captureProgressChange, 
        duration, 
        currentTime,
        isPlaying,
    } = useReproducer()


    const [volume, setVolume] = React.useState(50)

    const volumeControl = (e) => {
        setVolume(e.target.value)
    }

    useEffect(()=>{
        songRef.current.volume = volume / 100
    },[volume])


    return(
        <section className="reproductive__section  ">
            <div className="reproductive__container d-grid bg-black">

                <div className='reproductive reproductive__info'>
                    <figure className='info__image-container'>
                        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyiqeyfo4W94byruTLSCU8maw187wOqtgPPU-uMu0hN26GVtwbBkuoIXfH&s=10'/>
                    </figure>
                    <div>
                        <h6 className='info--tittle'>React.JS</h6>
                        <p className='info--subtittle text-secondary'>Sofia Rojas</p>
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
                        <button 
                        className='box__button bg-white rounded-circle d-flex align-items-center justify-content-center'
                        onClick={onPlay}
                        >
                            {isPlaying ? 
                            <PauseSVG className='box__button--svg isPlaying'/> :
                            <PlaySVG className='box__button--svg isPlaying'/> }
                        </button>
                        <button className='box__button'>
                            <NextSVG className='box__button--svg'/>
                        </button>
                    </div>

                    <div className='d-flex align-items-center gap-2 fs-7 text-secondary'>
                        <span>{Math.floor(currentTime / 60)}:{"0" + Math.floor(currentTime % 60).toString().slice(-2)}</span>
                        
                        <input 
                            type='range'
                            className='progress-slider flex-grow-1'
                            min={0}
                            max={duration || 0}
                            value={currentTime}
                            onChange={captureProgressChange}
                            style={{
                                '--progressSong' : `${progressSong}%`
                            }}
                        />

                        <span className='reproductive--duration'>{duration ? `${Math.floor(duration / 60)}:${"0" + Math.floor(duration % 60).toString().slice(-2)}` : "0:00"}</span>
                    </div>
                </div>

                <div className='reproductive reproductive__options'>
                    <div className='options__buttons '>
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

                        <div className='d-flex align-items-center justify-content-center'>
                            <button>
                                <VolumeSVG />
                            </button>

                            <input 
                            type='range'
                            className='progress-volumen mx-2'
                            value={volume}
                            onChange={volumeControl}
                            style={{
                                '--progressVolume' : `${volume}%`
                            }}
                            />

                        </div>
                    </div>
                </div>
            </div>

            
        </section>
    )
}

export {Reproductive}