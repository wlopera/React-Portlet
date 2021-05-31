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
    props.submit(data);
  };

  const closeView = () => {
    props.close(props.id);
  };

  return (
    <div>
      <Alert color="primary" toggle={closeView}>
        {props.title}
      </Alert>
      <div className={props.class} style={props.style}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* register your input into the hook by invoking the "register" function */}
          <input defaultValue="test" placeholder="Introduzca texto" {...register("example")} />

          {/* include validation with required or other standard HTML validation rules */}
          <input placeholder="Introduzca texto" {...register("exampleRequired", { required: true })} />
          {/* errors will return when field validation fails  */}
          {errors.exampleRequired && <span>Campo Obligatorio</span>}

          <input type="submit" />
        </form>
      </div>
    </div>
  );
}

export default Window;
