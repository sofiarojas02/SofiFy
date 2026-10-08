const express = require('express'); //librería para crear rutas
const prisma = require('../prisma');

const router = express.Router();

router.get('/', async (req, res) => {
    try{
        const songs = await prisma.songs.findMany();
        res.json(songs)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})


//crear cancion

router.post('/', async (req, res) =>{
    try{
        const { userId, title, duration, imageUrl } = req.body;

        if(!userId || !title || !duration){
            return res.status(400).json({error: 'Faltan campos requeridos' })
        }

        const newSong = await prisma.songs.create({
            data:{
                user_id :userId,
                title,
                duration,
                image_url: imageUrl
            }
        });

        res.status(201).json(newSong)
    }  catch (error) {
        res.status(500).json({ error: error.message });
    }
})

//get song by id

router.get('/:id', async (req, res) =>{
    try{
        const {id} = req.params;
        const song = await prisma.songs.findUnique({
            where: {id}
        })

        if(!song){
            return res.status(404).json({error: 'Cancion no encontrada'})
        }

        res.json(song)
    } catch (error){
        res.status(500).json({error: error.message})
    }
})

//update song

router.put('/:id', async (req, res) =>{
    try{
        const {id} = req.params;

        const { title, duration, imageUrl } = req.body;

        const updatedSong = await prisma.songs.update({
            where: {id},
            data: {
                title,
                duration,
                image_url: imageUrl
            }
        })

        res.json({message: 'Cancion actualizada', updatedSong})
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ error: 'Canción no encontrada' });
        }
        res.status(500).json({error: error.message})
    }
})

//delete song

router.delete('/:id', async (req,res)=>{
    try{
        const {id} = req.params;
        const deleteSong = await prisma.songs.delete({
            where:{id}
        })
        res.json({message: 'Cancion eliminada', deleteSong})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

module.exports = router;
