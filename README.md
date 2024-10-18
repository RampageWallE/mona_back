<h1>EXECUTE THIS BACKEND</h1>
<h3>To be able to run this program you have to go to the root folder of the project and use </h3>
`
docker compose up -d --build
`

<h2>Available routes:</h2> 

<h3>POST http://localhost:8000/postUser</h3> 
  body: 
  `{
    "nombre": "Piero Valentino",
    "apellido": "Noa Chahuayo",
    "numeroTelefonico": "923789532",
    "dni": "71348123",
    "correo": "piero.noa@tecsup.edu.pe",
    "contraseña": "pepitoelcapo",
    "permisos": ["Repostería", "Misa", "Santa Catalina"]
}`
GET http://localhost:8000/listUsers

POST http://localhost:8000/postLogin
  body:
  `
  {
    "correo":"piero.noa@tecsup.edu.pe",
    "contraseña":"pepitoelcapo"
  }
  `
  Here you will receive a token, so you have to use it in this in the route GET /protected-route

DELETE http://localhost:8000/deleteUser 
  body:
  `
  {
    "_id": "here goes the userid"
  }
  `
GET http://localhost:8000/ruta-protegida
  Headers
    `Authorization: "Bearer <Here goes the token provided in when you use the login route correctly>"`
