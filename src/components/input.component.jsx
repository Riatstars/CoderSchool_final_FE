import { useState } from "react";

const InputBox = ({
  name,
  type,
  id,
  value,
  placeholder,
  icon,
  disabled = false,
}) => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  return (
    <div className="relative w-[100%] mb-4">
      <input
        defaultValue={value}
        type={
          type == "password" ? (passwordVisibility ? "text" : "password") : type
        }
        placeholder={placeholder}
        name={name}
        id={id}
        className="input-box"
        disabled={disabled}
      />
      <i className={"fi " + icon + " input-icon"}></i>
      {type == "password" ? (
        <i
          className={
            "fi fi-rr-eye" +
            (passwordVisibility ? "" : "-crossed") +
            " input-icon left-[auto] right-4 cursor-pointer"
          }
          onClick={() => setPasswordVisibility((state) => !state)}
        ></i>
      ) : (
        ""
      )}
    </div>
  );
};
export default InputBox;
