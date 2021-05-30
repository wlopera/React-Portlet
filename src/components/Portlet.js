import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

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

};

export default Portlet;