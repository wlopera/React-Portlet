# React - Portlet

Este proyecto permite crear Portlets desde React

## Available Scripts

 ## Link: https://es.reactjs.org/docs/portals.html

## Tres Id, uno para cada contenedor o portlet

CODIGO:
------
### index.html
~~~ xml
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <title>React Portlet</title>
</head>

<body>
    <div id="app-root"></div>
    <div id="modal-root"></div>
</body>

</html>
~~~ 
------

### index.js
------
~~~ xml
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

// Estos dos contenedores son hermanos en el DOM.
const appRoot = document.getElementById("app-root");
// const modalRoot = document.getElementById("modal-root");

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  appRoot
);
~~~ 
------

## Salida: Dos portlet's + Ventana y Formulario

![Captura](https://user-images.githubusercontent.com/7141537/120119672-9a9d0380-c15e-11eb-8716-fb48240e3d35.PNG)


