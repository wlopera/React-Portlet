import React, { useState } from "react";
import Modal from "./Modal";
import Child from "./Child";
import Portlet from "./Portlet";

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
        <Portlet>
          <Child click={handleClick} title="Incrementar desde id: portlet-root" />
        </Portlet>
      </div>
    </div>
  );
};

export default Parent;
