const express = require('express'); //librería para crear rutas
const prisma = require('../prisma');

const router = express.Router();

router.get('/', async (req, res) => {
    try{
        const users = await prisma.users.findMany();
        res.json(users)
    }catch (error){
        res.status(500).json({error : error.message})
    }
})


//crear usuario

router.post('/', async (req, res) =>{
    try{
        const {username, email, password_hash, description, image_url} = req.body;

        if(!username || !email || !password_hash){
            return res.status(400).json({error: 'Faltan campos requeridos' })
        }

        const newUser = await prisma.users.create({
            data:{
                username,
                email,
                password_hash: password_hash,
                description,
                image_url
            }
        });

        res.status(200).json(newUser)
    }  catch (error) {
        console.error("ERROR REAL EN BD:", error);
        console.dir(error, { depth: null });
        
    if (error.code === 'P2002') {
        // Convierte todo el objeto meta a texto para encontrar el campo duplicado
        const metaStr = JSON.stringify(error.meta || {}).toLowerCase();

        let mensaje = 'Error en los datos';

        if (metaStr.includes('email')) {
            mensaje = 'Este email ya está registrado. Intenta con otro.';
        } else if (metaStr.includes('username')) {
            mensaje = 'Este nombre de usuario ya existe. Elige otro.';
        }

        return res.status(400).json({ error: mensaje });
    }

    res.status(500).json({ error: 'Error al crear la cuenta. Intenta de nuevo.' });
}
})

//get by id

router.get('/:id', async (req,res)=>{
    try{
        const {id} = req.params;

        const user = await prisma.users.findUnique({
            where: {id}
        })

        if(!user){
            return res.status(404).json({error: 'Usuario no encontrado'})
        }

        res.json(user)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})


router.put('/:id', async (req, res)=>{
    try{
        const {id} = req.params;
        const {username, description, imageUrl} = req.body;

        const updateUser = await prisma.users.update({
            where: {id: parseInt(id)},
            data: {
                username,
                description,
                image_url: imageUrl
            }
        })

        res.json(updateUser)
    } catch (error){
        res.status(500).json({error: error.message})
    }
})


router.delete('/:id', async (req, res)=>{
    try{
        const {id} = req.params;
        const deletedUser = await prisma.users.delete({
            where: {id}
        });

        res.json({message: 'Usuario eliminado', user: deletedUser});
    } catch (error){
        res.status(500).json({error: error.message})
    }
})

// POST: Asignar un rol a un usuario
router.post('/:id/roles', async (req, res) => {
  try {
    const { id } = req.params;
    const { roleId } = req.body;

    if (!roleId) {
      return res.status(400).json({ error: 'roleId es requerido' });
    }

    const userRole = await prisma.user_roles.create({
      data: {
        user_id: id,
        role_id: roleId
      }
    });

    res.status(201).json(userRole);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET: Obtener los roles de un usuario
router.get('/:id/roles', async (req, res) => {
  try {
    const { id } = req.params;

    const userRoles = await prisma.user_roles.findMany({
      where: { user_id: id },
      include: { role: true }
    });

    res.json(userRoles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;