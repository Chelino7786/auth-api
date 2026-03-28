# Auth API

REST API con autenticación JWT construida con Node.js y Express.

## Tecnologías
- Node.js
- Express
- JSON Web Tokens (JWT)
- bcryptjs

## Instalación

1. Clona el repositorio
   git clone https://github.com/Chelino7786/auth-api.git

2. Instala las dependencias
   npm install

3. Corre el servidor
   node server.js

El servidor corre en http://localhost:3000

## Endpoints

| Método | URL | Descripción | Protegida |
|--------|-----|-------------|-----------|
| POST | /auth/register | Crear cuenta nueva | No |
| POST | /auth/login | Iniciar sesión y obtener token | No |
| GET | /auth/profile | Ver perfil del usuario | Sí |

## Autenticación

Las rutas protegidas requieren un token JWT en el header:
Authorization: Bearer TOKEN_AQUI

El token se obtiene al hacer login y tiene una duración de 24 horas.
```

Luego en la terminal:
```
cd C:\Users\cheli\Desktop\Proyectos\auth-api
```
```
git init
```
```
git add .
```
```
git commit -m "feat: REST API with JWT authentication"
```
```
git branch -M main
```
```
git remote add origin https://github.com/Chelino7786/auth-api.git
```
```
git push -u origin main
