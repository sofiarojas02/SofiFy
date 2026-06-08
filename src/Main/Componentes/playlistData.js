const playlistData = [
    {
        name: "Timbaland Mix",
        image: "https://pickasso.spotifycdn.com/image/ab67c0de0000deef/dt/v1/img/artistmix/5Y5TRrQiqgUO4S36tzjIRZ/en",
        members: ["Nelly Furtado", "Lady Gaga", "Gwen Stefani"],
        author: "Zara",
        description: "Mezcla de éxitos producidos por Timbaland junto a grandes íconos del pop.",
        authorImage: "https://pickasso.spotifycdn.com/image/ab67c0de0000deef/dt/v1/img/artistmix/5Y5TRrQiqgUO4S36tzjIRZ/en",
        type: "Playlist"
    },
    {
        name: "Adrian Chandler Mix",
        image: "https://pickasso.spotifycdn.com/image/ab67c0de0000deef/dt/v1/img/radio/artist/7qJsLLT3iv2Uc0XbpnmEKz/en",
        members: ["Camille Saint-Saëns", "Karoly Botvay"],
        author: "Adrian Chandler",
        description: "Obras icónicas de la música clásica y barroca interpretadas con precisión.",
        authorImage: "https://pickasso.spotifycdn.com/image/ab67c0de0000deef/dt/v1/img/radio/artist/7qJsLLT3iv2Uc0XbpnmEKz/en",
        type: "Radio"
    },
    {
        name: "Radio de Paul Lewis",
        image: "https://pickasso.spotifycdn.com/image/ab67c0de0000deef/dt/v1/img/radio/artist/4LYCuV8d6rylb6zjv2k03l/en",
        members: ["Ludwig van Beethoven", "Johannes Brahms"],
        author: "Paul Lewis",
        description: "Estaciones de radio personalizadas con piezas clave de la era romántica.",
        authorImage: "https://pickasso.spotifycdn.com/image/ab67c0de0000deef/dt/v1/img/radio/artist/4LYCuV8d6rylb6zjv2k03l/en",
        type: "Radio"
    },
    {
        name: "Radio de Bad Bunny",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBtbJLAKENI7JQ0zze_IvVF1mOkx9oN-6fZUTrQFBzmQ&s",
        members: ["Arcángel", "KAROL G", "Feid"],
        author: "James",
        description: "Los mayores éxitos del género urbano y tus canciones favoritas del Conejo Malo.",
        authorImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBtbJLAKENI7JQ0zze_IvVF1mOkx9oN-6fZUTrQFBzmQ&s",
        type: "Radio"
    },
    {
        name: "Mix house",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMU18RNFSwZfY3kRQ4GCxcwKkJUyNubqzrmizKHhc1ZA&s=10",
        members: ["Bakermat", "MISERO", "bbno$"],
        author: "Sofia",
        description: "Ritmos electrónicos envolventes y deep house perfectos para mantener la energía arriba.",
        authorImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMU18RNFSwZfY3kRQ4GCxcwKkJUyNubqzrmizKHhc1ZA&s=10",
        type: "Playlist"
    },
    {
        name: "Mix de los 2000",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqD_-Jwexnn_nZU0MRLQlo5sd6wPt1qLBCswZV594kjg&s=10",
        members: ["Justin Timberlake", "Black Eyed Peas", "Gwen Stefani"],
        author: "Sofify",
        description: "Un viaje de nostalgia con los himnos del pop y hip-hop que marcaron el inicio del milenio.",
        authorImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqD_-Jwexnn_nZU0MRLQlo5sd6wPt1qLBCswZV594kjg&s=10",
        type: "Playlist"
    },
    {
        name: "Amanecer en la cosecha",
        image: "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000d72cc23361bc0302810d76562fdb",
        members: ["Kimberly González"],
        author: "Lee Conmigo",
        description: "Historias para los amantes de libros fantásticos. Un repaso profundo por los distritos.",
        authorImage: "https://pickasso.spotifycdn.com/image/ab67c0de0000deef/dt/v1/img/audiolibro/sunrise/en",
        type: "Audiolibro"
    },
    {
        name: "Latin Pop Today",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStjSyAxLG756SdexDccfpxI3fBW2BHj-oGrzn8ZS1qUQ&s",
        members: ["Shakira", "Camilo", "Rauw Alejandro"],
        author: "Sofify",
        description: "Los éxitos más importantes del pop latino sonando en este preciso momento.",
        authorImage: "https://pickasso.spotifycdn.com/image/ab67c0de0000deef/dt/v1/img/playlist/latinpop/en",
        type: "Playlist"
    },
    {
        name: "Hard Rock Classic",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRijmOd9uoCcug9bhggx-rrNNBXMzoOIYT5hfgsaN5C_w&s",
        members: ["AC/DC", "Guns N' Roses", "Led Zeppelin"],
        author: "Rocky",
        description: "Riffs legendarios y la energía pura del rock que definió a toda una generación.",
        authorImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_hard_rock_classic_example",
        type: "Playlist"
    },
    {
        name: "El Shot con Juanma",
        image: "https://pickasso.spotifycdn.com/image/ab67c0de0000deef/dt/v1/img/radio/artist/2KLh47Uxg5FDeDLDJ7Fz5h/es-419",
        members: ["Juanma Astorga"],
        author: "Infinita",
        description: "La dosis diaria de actualidad, análisis político y noticias que necesitas para empezar el día.",
        authorImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_el_shot_juanma_example",
        type: "Podcast"
    },
    {
        name: "Chill Lofi Beats",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-yihTqQUVU_mtgO_WIanaVEQDiUb6v8GvHx5-us4nVQ&s",
        members: ["Lofi Girl", "ChilledCow", "Idealism"],
        author: "Sofify",
        description: "Pistas instrumentales relajantes ideales para concentrarte al programar o estudiar.",
        authorImage: "https://pickasso.spotifycdn.com/image/ab67c0de0000deef/dt/v1/img/playlist/lofi/en",
        type: "Playlist"
    },
    {
        name: "Radio de Dua Lipa",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBN1UP-unWVC0klPDEr7egOs4xXN9P_kzNjMRv8l25SQ&s=10",
        members: ["The Weeknd", "Ava Max", "Miley Cyrus"],
        author: "Sofify",
        description: "Una estación diseñada con el mejor dance-pop, nu-disco y ritmos modernos del momento.",
        authorImage: "https://pickasso.spotifycdn.com/image/ab67c0de0000deef/dt/v1/img/radio/artist/dualipa/en",
        type: "Radio"
    },
    {
        name: "ASMR para Dormir",
        image: "https://pickasso.spotifycdn.com/image/ab67c0de0000deef/dt/v1/img/radio/artist/0xV8rJCPY4u9lAJio9r3Zf/en",
        members: ["Thibault", "Glow ASMR"],
        author: "Relax Studio",
        description: "Susurros, sonidos relajantes de ambiente y disparadores perfectos para combatir el insomnio.",
        authorImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_asmr_sleep_example",
        type: "Podcast"
    },
        {
        name: "Asesinos Seriales",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUXvzcgESf364zPtiPm2o7ZYWgJSIoujA2FMWdXgrhhUt1g7n4nE_DPzaX&s=10",
        members: ["Spotify Studios"],
        author: "Parcast",
        description: "Un viaje psicológico y analítico hacia las mentes de los criminales más oscuros de la historia.",
        authorImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7_podcast_asesinos_serial_example",
        type: "Podcast"
    }]

    export {playlistData}