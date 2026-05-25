import React from 'react';
import CaptureInput from './components/CaptureInput';

function App() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#ffffff',
      color: '#000000',
      padding: '80px 20px',
      boxSizing: 'border-box'
    }}>
      <div style={{ maxWidth: '650px', margin: '0 auto' }}>
        <CaptureInput />
      </div>
    </div>
  );
}

export default App;