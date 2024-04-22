import "../../styles/signup/component/InputFormItem.css";

interface InputFormIemProps {
  label: string;
  name: string;
  type: string;
}

const InputFormItem: React.FC<InputFormIemProps> = ({ label, name, type }) => {
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
