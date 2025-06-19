import React, { useEffect, useState } from 'react';
import axios from 'axios';

// NASA APOD Viewer Component
const ApodViewer = () => {

  // === React State Hooks ===
  const [data, setData] = useState(null);        // Stores NASA APOD data
  const [loading, setLoading] = useState(true);  // Controls main data loading state
  const [date, setDate] = useState('');          // User-selected date
  const [aiFact, setAiFact] = useState('');      // AI-generated cosmic poem
  const [aiLoading, setAiLoading] = useState(false);  // Controls AI thinking animation

  // === Fetch NASA APOD Data on Load or Date Change ===
  useEffect(() => {
    const url = date
  ? `${process.env.REACT_APP_BACKEND_URL}/api/apod?date=${date}`
  : `${process.env.REACT_APP_BACKEND_URL}/api/apod`;

    axios.get(url)
      .then((res) => {
        setData(res.data);         // Update APOD data
        setLoading(false);         // Stop loading screen
        setAiFact('');             // Reset AI fact when new date is chosen
      })
      .catch((err) => {
        console.error("Error fetching APOD data:", err);
        setLoading(false);
      });
  }, [date]); // Runs on first load + when date changes

  // === AI Fact Generator using OpenRouter GPT-3.5 Turbo ===
  const generateAiFact = async () => {
    setAiLoading(true);   // Start AI animation
    setAiFact('');        // Clear previous AI fact

    // Build prompt to send to GPT
    const prompt = `Generate an interesting cosmic complete poem of around 50 words of text about the following NASA image:\nTitle: "${data.title}"\nDescription: "${data.explanation}"`;

    try {
      const aiResponse = await axios.post(
        'https://openrouter.ai/api/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'user', content: prompt }
          ],
          max_tokens: 100
        },
        {
          headers: {
            'Authorization': 'Bearer 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', // OpenRouter Key
            'Content-Type': 'application/json'
          }
        }
      );

      console.log("AI Response:", aiResponse.data);

      // Update AI Fact output
      const message = aiResponse.data.choices[0]?.message?.content || "No poem generated.";
      setAiFact(message);

    } catch (error) {
      console.error("AI Fact error:", error);
      setAiFact("No Poem Generated.");
    } finally {
      setAiLoading(false);  // Stop AI animation
    }
  };

  // === Loading Screen ===
  if (loading) return (
    <div style={{
      backgroundColor: '#fef2ff',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '20px',
      color: '#3f51b5'
    }}>
      Loading NASA data...
    </div>
  );

  // === Error Screen ===
  if (!data) return <p style={{ textAlign: 'center' }}>Something went wrong.</p>;

  // === Non-image media fallback ===
  if (data.media_type !== 'image') {
    return (
      <div style={{
        backgroundColor: '#fef2ff',
        minHeight: '100vh',
        padding: '4vw',
        textAlign: 'center',
        color: '#3f51b5'
      }}>
        <h2 style={{
          fontSize: 'clamp(1.5rem, 4vw, 2.5rem)'
        }}>
          NASA APOD
        </h2>
        <p>Today's media is not an image. Please select another date.</p>
      </div>
    );
  }

  // === Main UI Return ===
  return (
    <div style={{
      backgroundColor: '#fef2ff',
      minHeight: '100vh',
      padding: '4vw',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      fontFamily: '"Segoe UI", "Roboto", "Helvetica Neue", sans-serif',
      color: '#333'
    }}>

      {/* NASA APOD Title */}
      <h1 style={{
        color: '#3f51b5',
        marginBottom: '10px',
        fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
        textAlign: 'center'
      }}>
        {data.title}
      </h1>

      {/* Date Picker */}
      <input
        type="date"
        value={date}
        onChange={(e) => {
          if (e.target.value !== date) {
            setLoading(true);
            setDate(e.target.value);
          }
        }}
        max={new Date().toISOString().split("T")[0]}
        style={{
          padding: '10px 15px',
          fontSize: '16px',
          borderRadius: '6px',
          border: '2px solid #ffd54f',
          backgroundColor: '#fff',
          marginBottom: '15px',
          color: '#3f51b5',
          outline: 'none',
          cursor: 'pointer'
        }}
      />

      {/* Image Date */}
      <p style={{ color: '#666', marginBottom: '20px' }}>{data.date}</p>

      {/* APOD Image */}
      <img
        src={data.url}
        alt={data.title}
        loading="lazy"
        style={{
          maxWidth: '100%',
          height: 'auto',
          borderRadius: '12px',
          boxShadow: '0 6px 20px rgba(0,0,0,0.2)',
          marginBottom: '20px'
        }}
      />

      {/* APOD Description */}
      <p style={{
        maxWidth: '700px',
        fontSize: 'clamp(1rem, 2.5vw, 1.1rem)',
        lineHeight: '1.6',
        color: '#444',
        padding: '0 10px',
        textAlign: 'justify'
      }}>
        {data.explanation.length > 300
          ? data.explanation.slice(0, 300) + '...'
          : data.explanation}
      </p>

      {/* AI Button */}
      <button
        onClick={generateAiFact}
        style={{
          marginTop: '20px',
          padding: '12px 24px',
          backgroundColor: '#3f51b5',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          fontSize: '16px',
          cursor: 'pointer',
          boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
          transition: 'transform 0.2s',
          maxWidth: '90%'
        }}
      >
        {aiLoading ? 'AI is thinking... 🤖✨' : 'Generate A Cool Cosmic Poem 🚀'}
      </button>

      {/* AI Fact / Poem */}
      {aiFact && (
        <div style={{
          marginTop: '20px',
          backgroundColor: '#ffd54f',
          padding: '4vw',
          borderRadius: '8px',
          width: '100%',
          maxWidth: '500px',
          color: '#333',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          animation: 'fadeIn 0.5s ease-in',
          fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
          fontStyle: 'italic',
          textAlign: 'center',
          lineHeight: '1.5',
          whiteSpace: 'break-spaces'
        }}>
          <strong>AI Says: </strong>{aiFact}
        </div>
      )}

    </div>
  );
};

export default ApodViewer;
