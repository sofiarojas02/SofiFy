const express = require('express'); //librería para crear rutas
const prisma = require('../prisma');

const router = express.Router();

router.get('/', async (req, res) => {
    try{
        const playlists = await prisma.playlist.findMany();
        res.json(playlists)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})


//crear playlist

router.post('/', async (req, res) =>{
    try{
        const { userId, name, description, imageUrl } = req.body;

        if(!userId || !name || !description){
            return res.status(400).json({error: 'Faltan campos requeridos' })
        }

        const newPlaylist = await prisma.playlist.create({
            data:{
                user_id :userId,
                name,
                description,
                image_url: imageUrl
            }
        });

        res.status(201).json(newPlaylist)
    }  catch (error) {
        res.status(500).json({ error: error.message });
    }
})

//get playlist by id

router.get('/:id', async (req, res) =>{
    try{
        const {id} = req.params;
        const playlists = await prisma.playlist.findUnique({
            where: {id}
        })

        if(!playlists){
            return res.status(404).json({error: 'Playlist no encontrada'})
        }

        res.json(playlists)
    } catch (error){
        res.status(500).json({error: error.message})
    }
})

//update playlist

router.put('/:id', async (req, res) =>{
    try{
        const {id} = req.params;
        const { name, description, imageUrl } = req.body;

        const updatePlaylist = await prisma.playlist.update({
            where: {id},
            data: {
                name,
                description,
                image_url: imageUrl
            }
        })

        res.json({message: 'Playlist actualizada', updatePlaylist})
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ error: 'Canción no encontrada' });
        }
        res.status(500).json({error: error.message})
    }
})

//delete playlist

router.delete('/:id', async (req,res)=>{
    try{
        const {id} = req.params;
        const deletePlaylist = await prisma.playlist.delete({
            where:{id}
        })
        res.json({message: 'Playlist eliminada', deletePlaylist})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

module.exports = router;
