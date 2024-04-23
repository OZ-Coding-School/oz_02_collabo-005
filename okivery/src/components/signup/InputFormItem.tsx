import "./InputFormItem.css";

interface InputFormIemProps {
  label: string;
  name: string;
  type: string;
  value: string;
  place: string;
  handleInputChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputFormItem: React.FC<InputFormIemProps> = ({
  label,
  name,
  type,
  value,
  place,
  handleInputChange,
}) => {
  return (
    <div className="inputContainer">
      <label htmlFor={name}>
        {label} <span>*</span>
      </label>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        placeholder={place}
        onChange={handleInputChange}
      ></input>
    </div>
  );
};

export default InputFormItem;
