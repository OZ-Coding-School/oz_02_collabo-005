import "../../styles/signup/component/InputFormItem.css";

interface InputFormIemProps {
  label: string;
  name: string;
  type: string;
}

const InputFormItem: React.FC<InputFormIemProps> = ({ label, name, type }) => {
  return (
    <div className="input-container">
      <label htmlFor={name}>
        {label} <span>*</span>
      </label>
      <input
        type={type}
        name={name}
        id={name}
        placeholder={
          name === "password"
            ? "Please set the password to a minimum of 8 characters"
            : name
        }
      ></input>
    </div>
  );
};

export default InputFormItem;
