import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

// const Portlet = ({ children, className = 'root-portal', el = 'div' }) => {

const Portlet = ({ children, idRoot, element = 'div' }) => {
    const [container] = React.useState(document.createElement(element))

    container.classList.add(idRoot)

    React.useEffect(() => {
        document.body.appendChild(container)
        return () => {
            document.body.removeChild(container)
        }
    }, [])

    return ReactDOM.createPortal(children, container)

    // var btn = document.createElement("div"); // Create a <button> element
    // btn.setAttribute("id", "test-id");
    // btn.innerHTML = "CLICK ME"; // Insert text
    // document.body.appendChild(btn);

    // let div = document.createElement("div");
    // div.setAttribute("id", "portlet-root");
    // document.body.appendChild(div);

    // const [element, setElement] = useState(document.createElement("div"));
    // // const [portletRoot, setPortetRoot] = useState(document.getElementById("portlet-root"));
    // const [portletRoot, setPortetRoot] = useState(div);
    // console.log(123, portletRoot);

    // useEffect(() => {
    //   // El elemento del portal se inserta en el árbol DOM después de
    //   // que se montan los hijos del Portal, lo que significa que los hijos
    //   // se montarán en un nodo DOM separado. Si un componente hijo
    //   // requiere estar conectado inmediatamente cuando se monta al árbol del DOM
    //   // por ejemplo, para medir un nodo DOM, o usar 'autoFocus' en un descendiente,
    //   // agrega el estado a Portlet y renderiza solo a los hijos
    //   // cuando se inserta Portlet en el árbol DOM.
    //   div.appendChild(element);

    //   // Eliminar el elemento del portal al salir
    //   return () => {
    //     // div.removeChild(element);
    //   };
    // }, []);

    // return ReactDOM.createPortal(props.children, element);
};

export default Portlet;