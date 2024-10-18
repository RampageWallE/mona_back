# EXECUTE THIS BACKEND

## To be able to run this program, go to the root folder of the project and use:

```bash
docker compose up -d --build
```

## Available Routes:

### POST `http://localhost:8000/postUser`

**Body:**
```json
{
  "nombre": "Piero Valentino",
  "apellido": "Noa Chahuayo",
  "numeroTelefonico": "923789532",
  "dni": "71348123",
  "correo": "piero.noa@tecsup.edu.pe",
  "contraseña": "pepitoelcapo",
  "permisos": ["Repostería", "Misa", "Santa Catalina"]
}
```

---

### GET `http://localhost:8000/listUsers`

---

### POST `http://localhost:8000/postLogin`

**Body:**
```json
{
  "correo": "piero.noa@tecsup.edu.pe",
  "contraseña": "pepitoelcapo"
}
```

*Here you will receive a token. You need to use it in the route `GET /protected-route`.*

---

### DELETE `http://localhost:8000/deleteUser`

**Body:**
```json
{
  "_id": "here goes the userid"
}
```

---

### GET `http://localhost:8000/ruta-protegida`

**Headers:**
```
Authorization: "Bearer <Here goes the token provided when you use the login route correctly>"
```
