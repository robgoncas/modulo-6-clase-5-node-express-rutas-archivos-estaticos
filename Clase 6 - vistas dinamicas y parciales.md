# Servicio de Contenido II

## Introducción a páginas parciales y despliegue de datos variables con Handlebars (HBS)

## Propósito de la clase

Esta clase tiene como objetivo **Avanzar correctamente en la actividad práctica**, introduciendo por primera vez el uso de:

* Motor de plantillas Handlebars (hbs)
* Variables dinámicas en vistas
* Páginas parciales (partials)
* Condicionales y helpers básicos

## Contexto técnico previo

Hasta este punto, el servidor Express:

* Servía archivos HTML estáticos
* Utilizaba `res.sendFile()`
* Usaba una carpeta `public/` para assets (CSS, imágenes)

Limitación detectada:

* Duplicación de HTML
* Imposibilidad de inyectar datos dinámicos
* Difícil reutilización de header, footer o navegación

Esto motiva la incorporación de un **motor de plantillas**.

## Concepto 1: Handlebars como motor de plantillas

Handlebars permite generar HTML dinámico combinando:

* Plantillas (`.hbs`)
* Datos enviados desde el servidor

En Express, Handlebars se integra como motor de vistas, reemplazando progresivamente el uso de HTML estático.

Para esta clase se utilizará el paquete oficial **hbs**, por ser:

* Simple
* Directo
* Ideal para introducción

## Concepto 2: Instalación del paquete hbs

Nuevo paquete a utilizar:

```bash
npm install hbs
```

Este paquete permite:

* Registrar vistas `.hbs`
* Usar parciales
* Definir helpers personalizados

## Concepto 3: Estructura profesional del proyecto

Estructura recomendada para esta etapa:

```txt
project/
 ├─ app.js
 ├─ package.json
 ├─ public/
 │   └─ style.css
 └─ views/
     ├─ perfil.hbs
     ├─ dashboard.hbs
     └─ partials/
         ├─ header.hbs
         └─ footer.hbs
```

Esta estructura separa claramente:

* Lógica del servidor
* Vistas
* Recursos estáticos

## Concepto 4: Configuración del motor de vistas HBS

Archivo `app.js`:

```js
const express = require('express');
const hbs = require('hbs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
```

A partir de esta configuración, Express puede renderizar archivos `.hbs` usando `res.render()`.

## Concepto 5: Primera vista dinámica con variables

Archivo `views/perfil.hbs`:

```html
<h1>Hola, mi nombre es {{nombre}}</h1>
<p>Soy {{profesion}}.</p>
```

Ruta asociada en `app.js`:

```js
app.get('/perfil', (req, res) => {
  res.render('perfil', {
    nombre: 'Ana',
    profesion: 'Desarrolladora Web'
  });
});
```

Aquí se introduce el concepto clave:

* **El servidor envía datos**
* **La vista los renderiza dinámicamente**

## Concepto 6: Qué son las páginas parciales

Las páginas parciales son fragmentos reutilizables de vistas.

Se utilizan para:

* Header
* Footer
* Menús

Beneficio principal:

* Evitar duplicación de HTML
* Mantener coherencia visual

## Concepto 7: Creación y registro de parciales

Carpeta:

```txt
views/partials/
```

Archivo `header.hbs`:

```html
<header>
  <h1>Dashboard de Proyectos</h1>
</header>
<hr>
```

Archivo `footer.hbs`:

```html
<hr>
<footer>
  <p>Copyright 2025 - Mi App Dinámica</p>
</footer>
```

Registro de parciales en `app.js`:

```js
hbs.registerPartials(path.join(__dirname, 'views/partials'));
```

## Concepto 8: Uso de parciales en una vista

Archivo `views/dashboard.hbs`:

```html
<!DOCTYPE html>
<html>
<head>
  <title>Dashboard</title>
  <link rel="stylesheet" href="/style.css">
</head>
<body>

  {{> header}}

  <h2>Bienvenido, {{user.name}}</h2>

  {{#if user.isAdmin}}
    <p style="color: green;"><strong>Acceso de Administrador</strong></p>
  {{/if}}

  <h3>Tus Proyectos:</h3>

  {{#each projects}}
    <div class="project-card">
      <h4>
        {{this.name}} -
        {{#if this.isCompleted}}Completado ✔{{else}}En Progreso ⏳{{/if}}
      </h4>

      {{#if this.tasks.length}}
        <ul>
          {{#each this.tasks}}
            <li class="{{priorityClass this.priority}}">{{this.description}}</li>
          {{/each}}
        </ul>
      {{else}}
        <p>Este proyecto no tiene tareas asignadas todavía.</p>
      {{/if}}
    </div>
  {{/each}}

  {{> footer}}

</body>
</html>
```

## Concepto 9: Helpers personalizados

Los helpers permiten ejecutar lógica simple desde las vistas.

Registro del helper en `app.js`:

```js
hbs.registerHelper('priorityClass', function(priority) {
  if (priority === 'alta') {
    return 'priority-high';
  } else if (priority === 'media') {
    return 'priority-medium';
  } else {
    return 'priority-low';
  }
});

<li class="{{priorityClass this.priority}}">
  {{this.description}}
</li>
```

CSS asociado en `public/style.css`:

```css
.priority-high { color: red; font-weight: bold; }
.priority-medium { color: orange; }
.priority-low { color: blue; }
```

## Concepto 10: Ruta dinámica con datos complejos

Ruta `/dashboard` en `app.js`:

```js
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
```

## Cierre de la clase

Con esta clase:

* Renderizar datos variables
* Reutilizar vistas mediante parciales
* Utilizar condicionales y helpers
* Comprender la relación entre servidor, vistas y datos
