import "./InputFormItem.css";

interface InputFormIemProps {
  label: string;
  name: string;
  type: string;
  value: string;
  place: string;
  isMust: boolean;
  isEdit?: boolean;
  handleInputChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputFormItem: React.FC<InputFormIemProps> = ({
  label,
  name,
  type,
  value,
  place,
  isMust,
  isEdit,
  handleInputChange,
}) => {
  return (
    <div className="inputContainer">
      <label htmlFor={name}>
        {label} <span className={isMust ? "" : "hideSpan"}>*</span>
      </label>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        placeholder={place}
        onChange={handleInputChange}
        readOnly={!isEdit}
      ></input>
    </div>
  );
};

export default InputFormItem;
