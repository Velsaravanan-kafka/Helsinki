import React, { useState } from 'react';


export default function App() {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients',
    'The only way to go fast, is to go well.'
  ];

  const [selected, setSelected] = useState(
    Math.floor(Math.random() * anecdotes.length)
  );

  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));

  const handleNextAnecdote = () => {
    let nextSelected = selected;
    while (nextSelected === selected) {
      nextSelected = Math.floor(Math.random() * anecdotes.length);
    }
    setSelected(nextSelected);
  };

  const handleVote = () => {
    const newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes);
  };

  const maxVotes = Math.max(...votes);
  const mostVotedIndex = votes.indexOf(maxVotes);

  return (
    <div className="font-sans flex flex-col items-center justify-center min-h-screen bg-slate-100 p-4">
      <div className="w-full max-w-xl bg-white shadow-xl rounded-2xl p-8 space-y-8">
        <h1 className="text-4xl font-extrabold text-slate-800 text-center">Anecdote of the Day</h1>
        
        <div className="text-center">
          <p className="text-lg text-slate-600 italic">
            "{anecdotes[selected]}"
          </p>
          <p className="text-sm text-slate-500 mt-2">
            has {votes[selected]} votes
          </p>
        </div>

        <div className="flex justify-center space-x-4">
          <Button handleClick={handleVote} text="Vote" />
          <Button handleClick={handleNextAnecdote} text="Next anecdote" />
        </div>

        <h2 className="text-3xl font-bold text-slate-800 text-center pt-4">Anecdote with Most Votes</h2>
        {maxVotes === 0 ? (
          <p className="text-center text-lg text-slate-600">No votes yet</p>
        ) : (
          <div className="text-center p-4 bg-slate-50 rounded-xl shadow-inner">
            <p className="text-lg text-slate-700 font-medium italic">
              "{anecdotes[mostVotedIndex]}"
            </p>
            <p className="text-sm text-slate-500 mt-2">
              has {maxVotes} votes
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

const Button = ({ handleClick, text }) => (
  <button
    onClick={handleClick}
    className="px-6 py-2 rounded-full font-semibold text-white bg-green-600 hover:bg-green-700 transition duration-300 transform hover:scale-105 shadow-md active:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
  >
    {text}
  </button>
);
