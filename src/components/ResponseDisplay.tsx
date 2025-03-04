import React from 'react';

interface ResponseDisplayProps {
  responseText?: string;
  imageUrl?: string | null;
  isImageMode: boolean;
  error?: string | null;
}

const ResponseDisplay: React.FC<ResponseDisplayProps> = ({
  responseText,
  imageUrl,
  isImageMode,
  error
}) => {
  return (
    <div className="response-display">
      {error && (
        <div className="error">
          Error: {error}
        </div>
      )}

      {responseText && (
        <div className="response">
          <div 
            style={{ 
              backgroundColor: 'black',
              color: '#00ff00', // Terminal green
              fontFamily: 'monospace',
              padding: '20px',
              borderRadius: '4px',
              margin: '20px 0',
              border: '1px solid #003300',
              maxWidth: '600px',
              maxHeight: '400px',
              wordWrap: 'break-word',
              whiteSpace: 'pre-wrap',
              overflowY: 'auto',
            }}
          >
            {responseText}
          </div>
        </div>        
      )}
      
      {isImageMode && imageUrl && (
        <div className="image-response">
          <img src={imageUrl} alt="Generated" style={{ maxWidth: '100%', height: 'auto' }} />
        </div>
      )}
    </div>
  );
};

export default ResponseDisplay;
