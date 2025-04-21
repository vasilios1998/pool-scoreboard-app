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

