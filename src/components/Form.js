import React from "react";
import { useForm } from "react-hook-form";
import { Alert } from "reactstrap";

function Form(props) {
  const {
    register,
    handleSubmit,
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
          <input placeholder="Nombre" {...register("firstName")} /> {/* register an input */}
          <input placeholder="Apellido" {...register("lastName", { required: true })} />
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
