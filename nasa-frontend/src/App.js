import React from 'react';
import ApodViewer from './components/ApodViewer';

function App() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      backgroundColor: '#eef2ff',
      fontFamily: '"Segoe UI", "Roboto", "Helvetica Neue", sans-serif'
    }}>

      {/* Header */}
      <header style={{
        padding: '20px',
        backgroundColor: '#3f51b5',
        color: '#fff',
        textAlign: 'center',
        fontSize: 'clamp(1.5rem, 3vw, 2rem)',
        boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
      }}>
        NASA Data Explorer 🛰️
      </header>

      {/* Main Content */}
      <main style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingBottom: '20px',
        backgroundColor: '#f3efe5',
        color: '#3f51b5',
        fontSize: 'clamp(1rem, 2vw, 1.2rem)',
        lineHeight: '1.6'
      }}>
        <ApodViewer />
      </main>

      {/* Footer */}
      <footer style={{
        padding: '15px',
        backgroundColor: '#3f51b5',
        color: '#fff',
        textAlign: 'center',
        fontSize: 'clamp(0.8rem, 2vw, 1rem)'
      }}>
        © 2025 NASA Data Explorer | Created by Sanica Jawale 🚀
      </footer>

    </div>
  );
}

export default App;
