import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ApodViewer = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState('');
  const [aiFact, setAiFact] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  

  useEffect(() => {
    const url = date
    ? `${process.env.REACT_APP_BACKEND_URL}/api/apod?date=${date}`
    : `${process.env.REACT_APP_BACKEND_URL}/api/apod`;

    axios.get(url)
      .then((res) => {
        setData(res.data);
        setLoading(false);
        setAiFact('');
      })
      .catch((err) => {
        console.error("Error fetching APOD data:", err);
        setLoading(false);
      });
  }, [date]);

  const generateAiFact = async () => {
    setAiLoading(true);
    setAiFact('');

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
            'Authorization': 'Bearer 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',
            'Content-Type': 'application/json'
          }
        }
      );

      console.log("AI Response:", aiResponse.data);
      const message = aiResponse.data.choices[0]?.message?.content || "No poem generated.";
      setAiFact(message);
    } catch (error) {
      console.error("AI Fact error:", error);
      setAiFact("Sorry, could not generate poem.");
    } finally {
      setAiLoading(false);
    }
  };

  if (loading) return (
    <div style={{
      backgroundColor: '#eef2ff',
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

  if (!data) return <p style={{ textAlign: 'center' }}>Something went wrong.</p>;

  if (data.media_type !== 'image') {
    return (
      <div style={{
        backgroundColor: '#f3efe5',
        minHeight: '100vh',
        padding: '4vw',
        textAlign: 'center',
        color: '#f3efe5',
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

  return (
    <div style={{
      backgroundColor: '#f3efe5',
      minHeight: '100vh',
      padding: '4vw',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      fontFamily: '"Segoe UI", "Roboto", "Helvetica Neue", sans-serif',
      color: '#f3efe5 ',
    }}>
      <h1 style={{
        color: '#3f51b5',
        marginBottom: '10px',
        fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
        textAlign: 'center'
      }}>
        {data.title}
      </h1>

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

      <p style={{ color: '#666', marginBottom: '20px' }}>{data.date}</p>

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
