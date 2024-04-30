import './InputItem.css';

interface InputItemProps {
  label: string;
  name: string;
  type: string;
  place: string;
  value?: string;
  readOnly?: boolean;
  isNoStar?: boolean;
  className?: string;
  handleInputChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    value: string
  ) => void;
}

const InputItem: React.FC<InputItemProps> = ({
  label,
  name,
  type,
  value,
  place,
  readOnly,
  isNoStar,
  className,
  handleInputChange,
}) => {
  return (
    <div className={`inputContainer ${className}`}>
      <label htmlFor={name}>
        {label}{' '}
        <span className={!readOnly && !isNoStar ? '' : 'hideSpan'}>*</span>
      </label>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        placeholder={place}
        onChange={(e) => handleInputChange?.(e, e.target.value)}
        readOnly={readOnly}
      ></input>
    </div>
  );
};

export default InputItem;
