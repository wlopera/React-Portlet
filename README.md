# React - Portlet

Este proyecto permite agregar portlets a un react de manera dinámica

## Available Scripts

 ## Link: https://es.reactjs.org/docs/portals.html

## Se genera tres Portlets:
  1. Modal en id="modal-root" hija de id="app-root"
  2. Portet Ventana: en idRoot='root-portal-1' hermana de id="app-root" (Se agrega el id de manera dinámica)
  3. Portet Formulario: en idRoot='root-portal-2' hermana de id="app-root" (Se agrega el id de manera dinámica)

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

### App.js
------
~~~ xml
import "./App.css";
import Parent from "./components/Parent";

function App() {
  return <Parent />;
}

export default App;
~~~ 
------


### Parent.js
------
~~~ xml
import React, { useState } from "react";
import Modal from "./Modal";
import Child from "./Child";
import Portlet from "./Portlet";
import Form from './Form'
import Window from './Window'

import "./styles.css";

const Parent = () => {
  const [clicks, setClicks] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    // Esto se activará cuando el botón en el Child sea cliqueado,
    // actualizando el estado de Parent,
    // aunque el botón no sea descendiente directo en el DOM.
    setClicks(clicks + 1);
    setShowModal(false);
  };

  return (
    <div>
      {/* <div onClick={handleClick}> */}
      <div>
        <p>Número de clicks: {clicks}</p>
        <p>
          Abra el navegador DevTools para observar que el botón no es un elemento secundario del div con el controlador
          onClick.
        </p>
        <button onClick={handleClick}>Incrementar desde id: app-root</button>

        {showModal && (
          <Modal>
            <Child click={handleClick} class="modal" title="Incrementar desde id: modal-root" />
          </Modal>
        )}
      </div>
      <div>
        <button onClick={setShowModal}>Modal</button>
        <Portlet idRoot='root-portal-1'>
          <Window  title='Portlet Ventana' class='portlet-root-1' style={{ backgroundColor: "green", padding: "2px" }}/>
        </Portlet>
        <Portlet idRoot='root-portal-2'>
          <Form title='Portlet Formulario' class='portlet-root-2' style={{ backgroundColor: "blue", padding: "2px" }} />
        </Portlet>
      </div>
    </div>
  );
};

export default Parent;

~~~ 
------

### Modal.js
------
~~~ xml
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

const Modal = (props) => {
  const [element, setElement] = useState(document.createElement("div"));
  const [modalRoot, setModalRoot] = useState(document.getElementById("modal-root"));

  useEffect(() => {
    // El elemento del portal se inserta en el árbol DOM después de
    // que se montan los hijos del Modal, lo que significa que los hijos
    // se montarán en un nodo DOM separado. Si un componente hijo
    // requiere estar conectado inmediatamente cuando se monta al árbol del DOM
    // por ejemplo, para medir un nodo DOM, o usar 'autoFocus' en un descendiente,
    // agrega el estado a Modal y renderiza solo a los hijos
    // cuando se inserta Modal en el árbol DOM.
    modalRoot.appendChild(element);

    // Eliminar el elemento del portal al salir
    return () => {
      modalRoot.removeChild(element);
    };
  }, []);

  return ReactDOM.createPortal(props.children, element);
};

export default Modal;

~~~ 
------

### Child.js
------
~~~ xml
import "./styles.css";

const Child = (props) => {
  // El evento de clic en este botón se propagará hasta el padre,
  // porque no hay un atributo 'onClick' definido.
  return (
    <div className={props.class} style={props.style}>
      <button onClick={props.click}>{props.title}</button>
    </div>
  );
};

export default Child;

~~~ 
------

### Window.js
------
~~~ xml
import React from "react";
import { useForm } from "react-hook-form";
import { Alert } from "reactstrap";

import "./styles.css";

function Window(props) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };

  console.log(watch("example")); // you can watch individual input by pass the name of the input

  return (
    <div>
      <Alert color="primary">{props.title}</Alert>
      <div className={props.class} style={props.style}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* register your input into the hook by invoking the "register" function */}
          <input
            defaultValue="test"
            placeholder="Introduzca texto"
            {...register("example")}
          />

          {/* include validation with required or other standard HTML validation rules */}
          <input
            placeholder="Introduzca texto"
            {...register("exampleRequired", { required: true })}
          />
          {/* errors will return when field validation fails  */}
          {errors.exampleRequired && <span>Campo Obligatorio</span>}

          <input type="submit" />
        </form>
      </div>
    </div>
  );
}

export default Window;

~~~ 
------
### Form.js
------
~~~ xml
import React from "react";
import { useForm } from "react-hook-form";
import { Alert } from "reactstrap";

function Form(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <div>
      <Alert color="primary">{props.title}</Alert>
      <div className={props.class} style={props.style}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input placeholder="Nombre" {...register("firstName")} />{" "}
          {/* register an input */}
          <input
            placeholder="Apellido"
            {...register("lastName", { required: true })}
          />
          {errors.lastName && <p>Apellido es obligatorio.</p>}
          <input placeholder="Edad" {...register("age", { pattern: /\d+/ })} />
          {errors.age && <p>Por favor introduzca la edad.</p>}
          <input type="submit" />
        </form>
      </div>
    </div>
  );
}

export default Form;

~~~ 
------


## Salida: Dos portlet's + Ventana y Formulario

![Captura](https://user-images.githubusercontent.com/7141537/120119672-9a9d0380-c15e-11eb-8716-fb48240e3d35.PNG)


