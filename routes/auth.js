const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const path = require('path')
const { verifyToken, SECRET } = require('../middleware/auth')

const DB = path.join(__dirname, '../data/users.json')

function readUsers() {
    return JSON.parse(fs.readFileSync(DB, 'utf-8'))
}

function saveUsers(users) {
    fs.writeFileSync(DB, JSON.stringify(users, null, 2))
}

// POST /auth/register — crear cuenta nueva
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body
    if (!name || !email || !password)
        return res.status(400).json({ error: 'Nombre, correo y contraseña son requeridos' })

    const users = readUsers()
    const exists = users.find(u => u.email === email)
    if (exists) return res.status(400).json({ error: 'El correo ya está registrado' })

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = {
        id: Date.now().toString(),
        name,
        email,
        password: hashedPassword,
        createdAt: new Date().toISOString()
    }

    users.push(newUser)
    saveUsers(users)

    res.status(201).json({ message: 'Usuario creado correctamente', id: newUser.id })
})

// POST /auth/login — iniciar sesión
router.post('/login', async (req, res) => {
    const { email, password } = req.body
    if (!email || !password)
        return res.status(400).json({ error: 'Correo y contraseña son requeridos' })

    const users = readUsers()
    const user = users.find(u => u.email === email)
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' })

    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) return res.status(401).json({ error: 'Contraseña incorrecta' })

    const token = jwt.sign(
        { id: user.id, email: user.email, name: user.name },
        SECRET,
        { expiresIn: '24h' }
    )

    res.json({ message: 'Login exitoso', token })
})

// GET /auth/profile — ruta protegida, requiere token
router.get('/profile', verifyToken, (req, res) => {
    res.json({
        message: 'Acceso autorizado',
        user: req.user
    })
})

module.exports = router