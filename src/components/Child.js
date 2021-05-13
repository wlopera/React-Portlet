import "./styles.css";

const Child = (props) => {
  // El evento de clic en este botón se propagará hasta el padre,
  // porque no hay un atributo 'onClick' definido.

  return (
    <div className={props.class}>
      <button onClick={props.click}>{props.title}</button>
    </div>
  );
};

export default Child;
