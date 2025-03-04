import React from 'react';

interface TextInputProps {
  inputText: string;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  placeholder?: string;
}

const TextInput: React.FC<TextInputProps> = ({ 
  inputText, 
  onInputChange, 
  onSubmit,
  placeholder = "Enter text for API request" 
}) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSubmit();
    }
  };

  return (
    <div className="text-input">
      <input
        type="text"
        value={inputText}
        onChange={onInputChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
      />
      <button onClick={onSubmit}>Send</button>
    </div>
  );
};

export default TextInput;
