import { useState } from "react"; import { Button } from "@/components/ui/button"; import { Card, CardContent } from "@/components/ui/card"; import { Input } from "@/components/ui/input";

const randomModes = [ "Bank shots only", "Opposite hand only", "Call every shot", "No talking during turn", "Spin in a circle before each shot", "One eye closed", "Bridge stick only" ];

export default function PoolScoreboard() { const [players, setPlayers] = useState([ { name: "Player 1", wins: 0, stylePoints: 0, dares: 0, trickShots: 0 }, { name: "Player 2", wins: 0, stylePoints: 0, dares: 0, trickShots: 0 }, ]); const [history, setHistory] = useState([]); const [randomMode, setRandomMode] = useState("");

const addStat = (index, stat) => { const updated = [...players]; updated[index][stat]++; setPlayers(updated); setHistory(prev => [ ${updated[index].name} +1 ${stat}, ...prev ]); };

const resetStats = () => { setPlayers(players.map(p => ({ ...p, wins: 0, stylePoints: 0, dares: 0, trickShots: 0 }))); setHistory([]); setRandomMode(""); };

const updateName = (index, newName) => { const updated = [...players]; updated[index].name = newName; setPlayers(updated); };

const spinWheel = () => { const mode = randomModes[Math.floor(Math.random() * randomModes.length)]; setRandomMode(mode); setHistory(prev => [Wheel: ${mode}, ...prev]); };

return ( <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6"> {players.map((player, i) => ( <Card key={i} className="text-center"> <CardContent className="space-y-4"> <Input className="text-center" value={player.name} onChange={(e) => updateName(i, e.target.value)} /> <p>Wins: {player.wins}</p> <p>Style Points: {player.stylePoints}</p> <p>Dares Completed: {player.dares}</p> <p>Trick Shots: {player.trickShots}</p> <div className="flex flex-wrap justify-center gap-2"> <Button onClick={() => addStat(i, "wins")}>+1 Win</Button> <Button onClick={() => addStat(i, "stylePoints")}>+1 Style</Button> <Button onClick={() => addStat(i, "dares")}>+1 Dare</Button> <Button onClick={() => addStat(i, "trickShots")}>+1 Trick</Button> </div> </CardContent> </Card> ))}

<div className="col-span-full text-center space-y-4">
    <Button onClick={spinWheel} className="w-full">Spin the Wheel</Button>
    {randomMode && <p className="text-lg font-bold">Mode: {randomMode}</p>}
    <Button onClick={resetStats} variant="destructive" className="w-full">Reset All Stats</Button>
    <div className="mt-6 text-left max-h-64 overflow-y-auto border rounded p-4">
      <h3 className="font-bold mb-2">Match History</h3>
      <ul className="space-y-1 text-sm">
        {history.map((entry, idx) => <li key={idx}>• {entry}</li>)}
      </ul>
    </div>
  </div>
</div>

); }

import React, { useState } from 'react';
import './styles.css';

const App = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState('');

  const options = ["Normal Play", "Trick Shot", "Double Points", "One Handed", "Speed Round"];

  const spinWheel = () => {
    setIsSpinning(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * options.length);
      setResult(options[randomIndex]);
      setIsSpinning(false);
    }, 2000); // Spins for 2 seconds
  };

  return (
    <div className="App">
      <h1>Spin the Wheel</h1>
      <div className={`wheel ${isSpinning ? 'spinning' : ''}`}></div>
      <button onClick={spinWheel} disabled={isSpinning}>
        {isSpinning ? 'Spinning...' : 'Spin the Wheel'}
      </button>
      <p className="result">{result && `Result: ${result}`}</p>
    </div>
  );
};

export default App;


import React, { useState, useEffect } from 'react';
import './styles.css';

const App = () => {
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [matchHistory, setMatchHistory] = useState([]);

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem('matchHistory')) || [];
    setMatchHistory(savedHistory);
  }, []);

  const endMatch = () => {
    const winner = player1Score > player2Score ? 'Player 1' : 'Player 2';
    const match = { player1Score, player2Score, winner };
    const newHistory = [...matchHistory, match];
    setMatchHistory(newHistory);
    localStorage.setItem('matchHistory', JSON.stringify(newHistory));
    resetScores();
  };

  const resetScores = () => {
    setPlayer1Score(0);
    setPlayer2Score(0);
  };

  return (
    <div className="App">
      <h1>Pool Scoreboard</h1>
      <div className="scoreboard">
        <div>
          <h2>Player 1: {player1Score}</h2>
          <button onClick={() => setPlayer1Score(player1Score + 1)}>Add Point</button>
        </div>
        <div>
          <h2>Player 2: {player2Score}</h2>
          <button onClick={() => setPlayer2Score(player2Score + 1)}>Add Point</button>
        </div>
      </div>
      <button onClick={endMatch}>End Match</button>

      <h2>Match History</h2>
      <ul>
        {matchHistory.map((match, index) => (
          <li key={index}>
            {`Match ${index + 1}: ${match.winner} wins! - Player 1: ${match.player1Score}, Player 2: ${match.player2Score}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;

import React, { useState, useEffect } from 'react';
import './styles.css';

const App = () => {
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [matchHistory, setMatchHistory] = useState([]);
  
  const winSound = new Audio('/path/to/win.mp3');  // Replace with actual path
  const scoreSound = new Audio('/path/to/score.mp3');  // Replace with actual path

  const playWinSound = () => winSound.play();
  const playScoreSound = () => scoreSound.play();

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem('matchHistory')) || [];
    setMatchHistory(savedHistory);
  }, []);

  const endMatch = () => {
    const winner = player1Score > player2Score ? 'Player 1' : 'Player 2';
    const match = { player1Score, player2Score, winner };
    const newHistory = [...matchHistory, match];
    setMatchHistory(newHistory);
    localStorage.setItem('matchHistory', JSON.stringify(newHistory));
    playWinSound();  // Play win sound when match ends
    resetScores();
  };

  const resetScores = () => {
    setPlayer1Score(0);
    setPlayer2Score(0);
  };

  return (
    <div className="App">
      <h1>Pool Scoreboard</h1>
      <div className="scoreboard">
        <div>
          <h2>Player 1: {player1Score}</h2>
          <button onClick={() => { setPlayer1Score(player1Score + 1); playScoreSound(); }}>Add Point</button>
        </div>
        <div>
          <h2>Player 2: {player2Score}</h2>
          <button onClick={() => { setPlayer2Score(player2Score + 1); playScoreSound(); }}>Add Point</button>
        </div>
      </div>
      <button onClick={endMatch}>End Match</button>

      <h2>Match History</h2>
      <ul>
        {matchHistory.map((match, index) => (
          <li key={index}>
            {`Match ${index + 1}: ${match.winner} wins! - Player 1: ${match.player1Score}, Player 2: ${match.player2Score}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;

import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);