'use client';

import React, { useState } from 'react';

// B1 Intermediate Data
const b1Data = [
  {
    type: "Multiple Choice Cloze",
    question: "If you want to keep fit, walking to work is a good option _____ taking the bus.",
    options: ["A) instead of", "B) in spite of", "C) apart from", "D) except for"],
    answer: "A) instead of"
  },
  {
    type: "Sentence Completion",
    question: "Sarah enjoys _____ (read) books in her spare time.",
    options: ["A) to read", "B) reading", "C) read", "D) reads"],
    answer: "B) reading"
  }
];

// C1 Advanced (CAE) Data extracted from Cambridge materials
const c1Data = [
  {
    type: "Multiple Choice Cloze (Part 1)",
    question: "If you want your daughter to succeed, buy her a toy construction set. That is the _____ from Britain's foremost female engineers.",
    options: ["A) instruction", "B) information", "C) opinion", "D) advice"],
    answer: "D) advice"
  },
  {
    type: "Word Formation (Part 3)",
    question: "Sigmund Freud is regarded as the _____ (FOUND) of psychoanalysis.",
    options: ["A) Founder", "B) Foundation", "C) Founding", "D) Unfounded"],
    answer: "A) Founder"
  },
  {
    type: "Multiple Choice (Reading)",
    question: "In 'Girls and Technology', why should constructional toys be accessible to girls early on?",
    options: [
      "A) To force them into engineering roles",
      "B) To prevent stereotypical gender role socialization",
      "C) To increase sales of microchips",
      "D) To make them better at pure mathematics"
    ],
    answer: "B) To prevent stereotypical gender role socialization"
  }
];

export default function Home() {
  const [level, setLevel] = useState<'B1' | 'C1'>('B1');
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});

  const currentQuestions = level === 'B1' ? b1Data : c1Data;

  const handleSelect = (qIdx: number, opt: string) => {
    setSelectedAnswers(prev => ({ ...prev, [qIdx]: opt }));
  };

  return (
    <main style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px', fontFamily: 'sans-serif' }}>
      <header style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 style={{ fontSize: '2.5rem', color: '#1e293b' }}>Future English Platform</h1>
        <p style={{ color: '#64748b' }}>Master English from Intermediate to Advanced levels</p>
        
        {/* Level Switcher Buttons */}
        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
          <button
            onClick={() => { setLevel('B1'); setSelectedAnswers({}); }}
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 'bold',
              backgroundColor: level === 'B1' ? '#2563eb' : '#e2e8f0',
              color: level === 'B1' ? '#ffffff' : '#475569',
            }}
          >
            B1 Intermediate
          </button>

          <button
            onClick={() => { setLevel('C1'); setSelectedAnswers({}); }}
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 'bold',
              backgroundColor: level === 'C1' ? '#2563eb' : '#e2e8f0',
              color: level === 'C1' ? '#ffffff' : '#475569',
            }}
          >
            C1 Advanced (CAE)
          </button>
        </div>
      </header>

      {/* Question List */}
      <section>
        <h2 style={{ borderBottom: '2px solid #e2e8f0', paddingBottom: '10px', color: '#0f172a' }}>
          {level === 'B1' ? 'B1 Practice Exercises' : 'C1 Advanced Practice Exercises'}
        </h2>

        {currentQuestions.map((q, idx) => (
          <div key={idx} style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px', margin: '20px 0', border: '1px solid #e2e8f0' }}>
            <span style={{ fontSize: '0.8rem', background: '#dbeafe', color: '#1e40af', padding: '4px 8px', borderRadius: '4px', fontWeight: 'bold' }}>
              {q.type}
            </span>
            <p style={{ fontSize: '1.1rem', fontWeight: '600', margin: '15px 0', color: '#1e293b' }}>
              {idx + 1}. {q.question}
            </p>

            <div style={{ display: 'grid', gap: '8px' }}>
              {q.options.map((opt, oIdx) => {
                const isSelected = selectedAnswers[idx] === opt;
                const isCorrect = opt === q.answer;
                
                let bgColor = '#ffffff';
                if (isSelected) {
                  bgColor = isCorrect ? '#dcfce7' : '#fee2e2';
                }

                return (
                  <button
                    key={oIdx}
                    onClick={() => handleSelect(idx, opt)}
                    style={{
                      textAlign: 'left',
                      padding: '12px 16px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      backgroundColor: bgColor,
                      cursor: 'pointer',
                      fontSize: '1rem'
                    }}
                  >
                    {opt}
                    {isSelected && (isCorrect ? '  ✅ Correct!' : '  ❌ Try again')}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}