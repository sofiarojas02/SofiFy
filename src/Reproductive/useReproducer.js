import {React, useEffect, useRef , useState} from "react";

function useReproducer() {
    const song = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3')


    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState(0); // Segundo actual
    const [duration, setDuration] = useState(0);
    const progressSong = (currentTime / duration) * 100 || 0
    
    const songRef = useRef(song)


    useEffect(()=>{
        const song = songRef.current;

        const captureLoadedMetadata = () =>{
            setDuration(song.duration)
        }

        const captureTimeUpdate = () => {
            setCurrentTime(song.currentTime)
        }

        song.addEventListener('loadedmetadata',captureLoadedMetadata )
        song.addEventListener('timeupdate',captureTimeUpdate )

        return () => {
            song.removeEventListener('loadedmetadata',captureLoadedMetadata )
            song.removeEventListener('timeupdate',captureTimeUpdate )
        }
    },[])

        const onPlay = () => {
        if(isPlaying){
            songRef.current.pause()
            setIsPlaying(false)
        }else{
            songRef.current.play()
            .then(()=>{
                setIsPlaying(true)
            })
            .catch((err) => {
                alert('Reproduccion interrumpida')
            })
        }
    }

    const captureProgressChange = (e) => {
        const newTime = e.target.value;
        setCurrentTime(newTime)
        songRef.current.currentTime = newTime
        }

    return {isPlaying,
            songRef, 
            progressSong, 
            onPlay, 
            captureProgressChange, 
            duration, 
            currentTime}

}

export {useReproducer}