import React from "react";
import { Input, Button } from "antd";

export interface ErrorProps {
  isError: boolean;
  message: string;
}

interface IProps {
  leftIcon?: string;
  onFocus?: () => void;
  rightIcon?: string;
  onRightIconPress?: () => void;
  value: string;
  onChangeText: (val: string) => void;
  placeholder: string;
  onBlur?: () => void;
  style?: React.CSSProperties;
  onLeftIconPress?: () => void;
  isFocused?: boolean;
  countryCode?: string;
  error?: {
    isError: boolean;
    message: string;
  } | null;
  size?: "large" | "middle" | "small";
  inputType?: string;
}

const InputField: React.FC<IProps> = ({
  inputType,
  leftIcon,
  onFocus,
  rightIcon,
  onRightIconPress,
  value,
  onChangeText,
  placeholder,
  onBlur,
  onLeftIconPress,
  countryCode,
  error = null,
  style = {},
  isFocused = false,
  size = "middle",
}) => {
  const handleRightIconPress = () => {
    if (onRightIconPress) {
      onRightIconPress();
    }
  };

  const handleLeftIconPress = () => {
    if (onLeftIconPress) {
      onLeftIconPress();
    }
  };

  const handleBlur = () => {
    if (onBlur) {
      onBlur();
    }
  };

  const handleFocus = () => {
    if (onFocus) {
      onFocus();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeText(e.target.value);
  };

  return (
    <div>
      <div
        className={`inputContainer ${error?.isError ? "errorWrapper" : ""}`}
        style={{ ...style }}
      >
        {leftIcon && (
          <Button
            type="text"
            onClick={handleLeftIconPress}
            style={{ padding: 0, marginRight: 5 }}
          >
            <img src={leftIcon} alt="Left Icon" className="iconContainer" />
          </Button>
        )}
        {countryCode && <span style={{ marginRight: 5 }}>{countryCode}</span>}
        {inputType === "password" ? (
          <Input.Password
            autoFocus={isFocused}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            value={value}
            placeholder={placeholder}
            className="customInput"
            size={size}
          />
        ) : (
          <Input
            autoFocus={isFocused}
            type={inputType}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            value={value}
            placeholder={placeholder}
            className="customInput"
            size={size}
          />
        )}
        {rightIcon && (
          <Button type="text" onClick={handleRightIconPress}>
            <img src={rightIcon} alt="Right Icon" className="iconContainer" />
          </Button>
        )}
      </div>
      {error?.isError && <span style={{ color: "red" }}>{error.message}</span>}
    </div>
  );
};

export default InputField;
