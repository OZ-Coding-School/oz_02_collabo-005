import "../../styles/signup/component/InputFormItem.css";

const InputFormItem = ({ label, name, type }) => {
  return (
    <div className="input-container">
      <label>
        {label} <span>*</span>
      </label>
      <input type={type} name={name}></input>
    </div>
  );
};

export default InputFormItem;
