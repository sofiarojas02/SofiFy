import { useSongs } from "../hooks/useSongs";

export const SongsList = () => {
    const {songs, loading, error} = useSongs();

    if(loading) return <p>Cargando usuarios</p>
    if(error) return <p>Error: {error} </p>


    return (
        <div>
            <h2>Biblioteca</h2>
            <ul>
                {songs.map((song) => (
                    <li key={song.id}>
                        <p>{song.title}</p>
                        <p>{song.duration} </p>
                    </li>
                )
                )}
            </ul>
        </div>
    )
};