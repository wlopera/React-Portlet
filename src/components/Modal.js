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
