import { useEffect, useState } from "react";
import { api } from "../Api/api";

export const useSongs = () => {
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(()=>{
        fetchSongs()
    },[])

    const fetchSongs = async () => {
        try{
            setLoading(true)
            const res = await api.get('/songs')
            setSongs(res.data)
        } catch (err){
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return {songs, loading, error, fetchSongs}

}