import React, { useState } from "react";
import Modal from "./Modal";
import Child from "./Child";
import Portlet from "./Portlet";
import Form from "./Form";
import Window from "./Window";

import "./styles.css";

const Parent = () => {
  const [clicks, setClicks] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [portlet, setPortlet] = useState([
    {
      id: "root-portal-1",
      show: false,
      class: "portlet-root-1",
      title: "Portlet Ventana",
      styles: { backgroundColor: "green", padding: "2px" },
    },
    {
      id: "root-portal-2",
      show: false,
      class: "portlet-root-2",
      title: "Portlet Formulario",
      styles: { backgroundColor: "blue", padding: "2px" },
    },
  ]);

  const handleClick = () => {
    // Esto se activará cuando el botón en el Child sea cliqueado,
    // actualizando el estado de Parent,
    // aunque el botón no sea descendiente directo en el DOM.
    setClicks(clicks + 1);
    setShowModal(false);
  };

  const handleClosePortlet = (id) => {
    let portletChange = [...portlet];
    let newPortlet = portletChange.find((value) => value.id === id);
    newPortlet.show = false;
    portletChange = [...portletChange, newPortlet];
    setPortlet(portletChange);
  };

  const handleSubmit = (data) => {
    console.log("Data a procesar: ", data);
  };

  const handleShowPortlet = (id) => {
    let portletChange = [...portlet];
    let newPortlet = portletChange.find((value) => value.id === id);
    newPortlet.show = true;
    portletChange = [...portletChange, newPortlet];
    setPortlet(portletChange);
  };

  return (
    <div>
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
        <button
          onClick={() => {
            handleShowPortlet(portlet[0].id);
          }}
        >
          Mostrar Portlet Ventana
        </button>

        <button onClick={() => handleShowPortlet(portlet[1].id)}>Mostrar Portlet Formulario</button>
      </div>
      <div>
        <button onClick={setShowModal}>Modal</button>
        {portlet[0].show && (
          <Portlet idRoot={portlet[0].id}>
            <Window
              id={portlet[0].id}
              title={portlet[0].title}
              class={portlet[0].class}
              styles={portlet[0].style}
              close={handleClosePortlet}
              submit={handleSubmit}
            />
          </Portlet>
        )}
        {portlet[1].show && (
          <Portlet idRoot={portlet[1].id}>
            <Form
              id={portlet[1].id}
              title={portlet[1].title}
              class={portlet[1].class}
              styles={portlet[1].style}
              close={handleClosePortlet}
              submit={handleSubmit}
            />
          </Portlet>
        )}
      </div>
    </div>
  );
};

export default Parent;
