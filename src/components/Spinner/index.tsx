import './styles.css';

const Spinner = (): JSX.Element => {
  return (
    <div className="Spinner__container">
      <svg className="Spinner" viewBox="25 25 50 50">
        <circle className="Spinner__circle" cx="50" cy="50" r="20"></circle>
      </svg>
    </div>
  );
};

export default Spinner;
