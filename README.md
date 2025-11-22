# 🌙 MoonState - Backend API

API REST para la aplicación GameTracker. Gestiona videojuegos, reseñas y estadísticas.

## 🚀 Tecnologías

- **Node.js** - Runtime de JavaScript
- **Express** - Framework web
- **MongoDB** - Base de datos
- **Mongoose** - ODM para MongoDB
- **Cors** - Manejo de solicitudes cross-origin

## 📋 Requisitos previos

- Node.js (v14 o superior)
- MongoDB Atlas (cuenta gratuita)
- npm o yarn

## 🔧 Instalación

1. **Clona el repositorio**
```bash
git clone https://github.com/tu-usuario/moonstate-backend.git
cd moonstate-backend
```

2. **Instala las dependencias**
```bash
npm install
```

3. **Crea el archivo `.env`**
```bash
cp .env.example .env
```

4. **Configura las variables de entorno**
Edita `.env` con tus credenciales:
```
MONGODB_URL=mongodb+srv://usuario:contraseña@cluster.mongodb.net/moonstate
PORT=4000
```

5. **Inicia el servidor**
```bash
npm run dev
```

El servidor estará disponible en `http://localhost:4000`

## 📚 Endpoints disponibles

### Juegos

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/juegos` | Obtener todos los juegos |
| GET | `/api/juegos/:id` | Obtener un juego por ID |
| POST | `/api/juegos` | Crear un nuevo juego |
| PUT | `/api/juegos/:id` | Actualizar un juego |
| DELETE | `/api/juegos/:id` | Eliminar un juego |

### Reseñas

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/resenas` | Obtener todas las reseñas |
| GET | `/api/resenas/:id` | Obtener una reseña por ID |
| POST | `/api/resenas` | Crear una nueva reseña |
| PUT | `/api/resenas/:id` | Actualizar una reseña |
| DELETE | `/api/resenas/:id` | Eliminar una reseña |

## 💡 Ejemplos de uso

### Crear un juego

**Request:**
```bash
POST http://localhost:4000/api/juegos
Content-Type: application/json

{
  "nombre": "Valorant",
  "genero": "Acción",
  "desarrollador": "Riot Games",
  "año": 2020,
  "plataforma": "PC",
  "portadaURL": "https://example.com/valorant.jpg",
  "descripcion": "Shooter táctico en primera persona",
  "completado": false,
  "horasJugadas": 50
}
```

**Response:**
```json
{
  "mensaje": "Juego creado exitosamente",
  "juego": {
    "_id": "507f1f77bcf86cd799439011",
    "nombre": "Valorant",
    "genero": "Acción",
    ...
  }
}
```

### Obtener todos los juegos

**Request:**
```bash
GET http://localhost:4000/api/juegos
```

**Response:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "nombre": "Valorant",
    "genero": "Acción",
    ...
  },
  {
    "_id": "507f1f77bcf86cd799439012",
    "nombre": "Elden Ring",
    "genero": "RPG",
    ...
  }
]
```

### Actualizar un juego

**Request:**
```bash
PUT http://localhost:4000/api/juegos/507f1f77bcf86cd799439011
Content-Type: application/json

{
  "nombre": "Valorant",
  "horasJugadas": 100,
  "completado": true
}
```

### Eliminar un juego

**Request:**
```bash
DELETE http://localhost:4000/api/juegos/507f1f77bcf86cd799439011
```

### Crear una reseña

**Request:**
```bash
POST http://localhost:4000/api/resenas
Content-Type: application/json

{
  "juego": "507f1f77bcf86cd799439011",
  "texto": "¡Excelente juego! La mecánica es perfecta.",
  "puntuacion": 5,
  "autor": "JuanGamer92"
}
```

## 📁 Estructura del proyecto

```
backend/
├── routes/
│   ├── juegoRoutes.js      # Rutas de juegos
│   └── resenaRoutes.js     # Rutas de reseñas
├── models/
│   ├── Juego.js            # Modelo de juego
│   └── Resena.js           # Modelo de reseña
├── server.js               # Archivo principal
├── .env.example            # Variables de entorno (ejemplo)
├── package.json            # Dependencias
└── README.md               # Este archivo
```

## ✅ Validaciones

El API valida automáticamente:
- ✓ Nombre de juego (3-100 caracteres)
- ✓ Género (solo valores permitidos)
- ✓ Año (1950-actual)
- ✓ Plataforma (PC, PS5, Xbox, etc)
- ✓ Horas jugadas (número positivo)
- ✓ URL válida de portada
- ✓ No permite duplicados

## 🐛 Manejo de errores

El API devuelve códigos HTTP apropiados:

| Código | Significado |
|--------|------------|
| 200 | OK - Solicitud exitosa |
| 201 | Created - Recurso creado |
| 400 | Bad Request - Datos inválidos |
| 404 | Not Found - Recurso no encontrado |
| 409 | Conflict - Recurso duplicado |
| 500 | Server Error - Error del servidor |

## 🤝 Contribuir

1. Fork el repositorio
2. Crea una rama (`git checkout -b feature/miFeature`)
3. Commit tus cambios (`git commit -m 'Agregar miFeature'`)
4. Push a la rama (`git push origin feature/miFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la licencia MIT.

## 👨‍💻 Autor

Sara Valentina Benavides

---

**¡Gracias por usar MoonState! 🌙**