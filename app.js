
const express = require("express");
const hbs = require("hbs");
const path = require("path");
const app = express();

const PORT = 3000;

//middleware : implementación de nuevas funciones
app.use(express.static(path.join(__dirname, "public")));

//Implementación de Motor de vistas Handlebar
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

//Registramos dónde se encuentran las vistas parciales en mi proy Node
hbs.registerPartials(path.join(__dirname, 'views/partials'));

//Registro los helpers o ayudantes (se cargan antes de la renderización)
hbs.registerHelper('priorityClass', function(priority) {
  if (priority === 'alta') {
    return 'priority-high';
  } else if (priority === 'media') {
    return 'priority-medium';
  } else {
    return 'priority-low';
  }
});


//Rutas
app.get("/perfil",(request, response)=>{
    response.render("perfil",{
        nombre: "Alberto Castillo",
        profesion:"Marinero"
    })
});

app.get('/dashboard', (req, res) => {
  const data = {
    user: {
      name: 'Carlos',
      isAdmin: true
    },
    projects: [
      {
        name: 'API Gateway',
        isCompleted: false,
        tasks: [
          { description: 'Diseñar endpoints', priority: 'alta' },
          { description: 'Implementar JWT', priority: 'alta' },
          { description: 'Crear documentación', priority: 'media' }
        ]
      },
      {
        name: 'Refactor del Frontend',
        isCompleted: true,
        tasks: [
          { description: 'Migrar a React 18', priority: 'baja' },
          { description: 'Actualizar dependencias', priority: 'baja' }
        ]
      },
      {
        name: 'Base de Datos',
        isCompleted: false,
        tasks: []
      }
    ]
  };

  res.render('dashboard', data);
});



app.get("/home", (request, response)=>{
    response.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/contacto", (request, response)=>{
    response.sendFile(path.join(__dirname, "public","contactanos.html"));
});

app.get("/servicios", (request, response)=>{
    response.sendFile(path.join(__dirname, "public","servicios.html"));
});

app.listen(PORT, ()=>{
    console.log(`Iniciando el servidor de contenido estático
        http://localhost:3000/home
        http://localhost:3000/contacto
        http://localhost:3000/servicios`);
})





