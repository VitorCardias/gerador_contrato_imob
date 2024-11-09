import React, { useRef } from 'react';

function AutoResizeTextarea() {
  const textareaRef = useRef(null);

  const autoResize = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto'; // Reseta a altura
      textarea.style.height = `${textarea.scrollHeight}px`; // Ajusta a altura para o conteúdo
    }
  };

  return (
    <div className="preview_container">
      <textarea
        ref={textareaRef}
        
        onInput={autoResize}
        style={{
          textAlign: 'justify',
          backgroundColor: 'rgb(47, 68, 108)',
          color: 'white',
          padding: '0.8rem',
          borderRadius: '0.3rem',
          borderColor: '#f8f8f8',
          width: '100%',
          height: 'auto',
          maxHeight: 'max-content',
          border: '1px solid',
          fontSize: '1rem',
          lineHeight: '1.5',
          fontFamily: 'Arial, sans-serif',
          overflow: 'hidden',
          resize: 'none',
        }}
      ></textarea>
    </div>
  );
}

export default AutoResizeTextarea;
