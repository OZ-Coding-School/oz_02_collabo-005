import { forwardRef } from 'react';
import './InputItem.css';

interface InputItemProps {
  label: string;
  name: string;
  type: string;
  place: string;
  value?: string;
  readOnly?: boolean;
  isNoStar?: boolean;
  handleInputChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputItem: React.FC<
  InputItemProps & React.InputHTMLAttributes<HTMLInputElement>
> = forwardRef(
  (
    { label, type, place, readOnly, isNoStar, handleInputChange, ...props },
    ref
  ) => {
    return (
      <div className="inputContainer">
        <label htmlFor={props.name}>
          {label}{' '}
          <span className={!readOnly && !isNoStar ? '' : 'hideSpan'}>*</span>
        </label>
        <input
          ref={ref}
          type={type}
          value={props.value}
          id={props.name}
          placeholder={place}
          onChange={(e) => {
            handleInputChange?.(e);
            props.onChange?.(e);
          }}
          readOnly={readOnly}
          {...props}
        ></input>
      </div>
    );
  }
);

export default InputItem;
