import React, { useState } from 'react';
// The main App component that manages the application state.
// It uses useState hooks to store the counts for good, neutral, and bad feedback.
// It also contains the event handlers for updating these counts.
export default function App() {
  // Save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  // Event handlers to update the state when a button is clicked.
  const handleGoodClick = () => setGood(good + 1);
  const handleNeutralClick = () => setNeutral(neutral + 1);
  const handleBadClick = () => setBad(bad + 1);

  // Calculate the total number of feedback.
  const total = good + neutral + bad;

  // The main UI structure using Tailwind CSS for a modern look.
  return (
    <div className="font-sans flex flex-col items-center justify-center min-h-screen bg-slate-100 p-4">
      <div className="w-full max-w-xl bg-white shadow-xl rounded-2xl p-8 space-y-8">
        <h1 className="text-4xl font-extrabold text-slate-800 text-center">Give Feedback</h1>
        
        {/* Buttons for giving feedback. These are styled nicely with Tailwind. */}
        <div className="flex justify-center space-x-4">
          <Button handleClick={handleGoodClick} text="Good" />
          <Button handleClick={handleNeutralClick} text="Neutral" />
          <Button handleClick={handleBadClick} text="Bad" />
        </div>

        
        <h2 className="text-3xl font-bold text-slate-800 text-center pt-4">Statistics</h2>
        {total === 0 ? (
          <p className="text-center text-lg text-slate-600">No feedback given</p>
        ) : (
          <Statistics good={good} neutral={neutral} bad={bad} total={total} />
        )}
      </div>
    </div>
  );
}

// A reusable Button component that takes a click handler and text as props.
// This was extracted in exercise 1.10.
const Button = ({ handleClick, text }) => (
  <button 
    onClick={handleClick}
    className="px-6 py-2 rounded-full font-semibold text-white bg-blue-600 hover:bg-blue-700 transition duration-300 transform hover:scale-105 shadow-md active:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
  >
    {text}
  </button>
);

// The Statistics component displays all calculated statistics in a table.
// This was extracted in exercise 1.8 and then refactored to use a table in 1.11.
const Statistics = ({ good, neutral, bad, total }) => {
  // Calculate average score: good=1, neutral=0, bad=-1.
  const average = (good - bad) / total;
  // Calculate positive percentage. Ensure no division by zero.
  const positive = total > 0 ? (good / total) * 100 : 0;

  return (
    <div className="p-4 bg-slate-50 rounded-xl shadow-inner">
      <table className="w-full text-left text-slate-700">
        <tbody>
          <StatisticLine text="Good" value={good} />
          <StatisticLine text="Neutral" value={neutral} />
          <StatisticLine text="Bad" value={bad} />
          <StatisticLine text="Total" value={total} />
          <StatisticLine text="Average" value={average.toFixed(2)} />
          <StatisticLine text="Positive" value={`${positive.toFixed(2)} %`} />
        </tbody>
      </table>
    </div>
  );
};

// The StatisticLine component displays a single statistic as a table row.
// This was extracted in exercise 1.10.
const StatisticLine = ({ text, value }) => (
  <tr className="border-b last:border-b-0 border-slate-200">
    <td className="p-3 font-medium">{text}</td>
    <td className="p-3 text-right">{value}</td>
  </tr>
);