'use client';
import React, { ChangeEvent, useState, FC } from 'react';

interface TitleWithInputProps {
  title: string;
  placeholder: string;
  onInputChange: (value: string) => void;
}

const TitleWithInput: FC<TitleWithInputProps> = ({
  title,
  placeholder,
  onInputChange,
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onInputChange(newValue);
  };

  return (
    <div className="flex items-center">
      <h1 className="mr-4">{title}</h1>
      <input
        className="border-black border-2"
        type="text"
        value={inputValue}
        placeholder={placeholder}
        onChange={handleChange}
      />
    </div>
  );
};

export default TitleWithInput;
