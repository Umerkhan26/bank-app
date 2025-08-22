import React, { forwardRef, useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import styled from "styled-components";

interface InputProps {
  id?: string;
  label?: string;
  name?: string;
  type: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  maxLength?: number;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  registration?: UseFormRegisterReturn;
  autoComplete?: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  isPassword?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({
    id,
    label,
    name,
    error,
    type,
    placeholder,
    required = false,
    value,
    onChange,
    onKeyDown,
    registration,
    autoComplete,
    maxLength,
    isPassword = false,
  }) => {
    const [showPassword, setShowPassword] = useState(false);
    const togglePassword = () => setShowPassword((prev) => !prev);

    return (
      <InputWrapper>
        {label && (
          <StyledLabel htmlFor={name}>
            {label} {required && <span className="text-red-500">*</span>}
          </StyledLabel>
        )}

        <InputContainer>
          <StyledInput
            id={id}
            {...registration} // This spreads `ref` and other necessary props correctly
            type={isPassword && showPassword ? "text" : type}
            placeholder={placeholder}
            required={required}
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
            autoComplete={autoComplete}
            maxLength={maxLength}
            aria-invalid={!!error}
            className={error ? "error" : ""}
          />

          {isPassword && (
            <ToggleButton type="button" onClick={togglePassword}>
              {showPassword ? "🙈" : "👁️"}
            </ToggleButton>
          )}
        </InputContainer>

        {error && <ErrorMessage>{error}</ErrorMessage>}
      </InputWrapper>
    );
  }
);

export default Input;

// Styled Components
const InputWrapper = styled.div`
  width: 100%;
  margin-bottom: 1rem;
`;

const StyledLabel = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.25rem;
`;

const InputContainer = styled.div`
  position: relative;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 8px 10px; /* Increased left & right padding */
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  &:focus {
    border-color: #2563eb;
    box-shadow: 0 0 5px rgba(37, 99, 235, 0.3);
  }

  &.error {
    border-color: #ef4444;
  }
`;

const ToggleButton = styled.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 1rem;
`;

const ErrorMessage = styled.p`
  font-size: 0.75rem;
  color: #ef4444;
  margin-top: 0.25rem;
`;
