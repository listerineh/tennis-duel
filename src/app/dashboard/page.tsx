'use client';

import type { Player } from '@/types';
import { simulateTennisMatch, type SimulateTennisMatchOutput } from '@/ai/flows/simulate-tennis-match';
import { useState } from 'react';
import { PlayerList } from '@/components/players/PlayerList';
import { MatchResult } from '@/components/match/MatchResult';
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Swords, UserCheck, UserX, Info } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';

const MAX_PLAYERS_SELECTED = 2;

export default function DashboardPage() {
  const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([]);
  const [simulationResult, setSimulationResult] = useState<SimulateTennisMatchOutput | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationError, setSimulationError] = useState<string | null>(null);
  const { toast } = useToast();

  const handlePlayerSelect = (player: Player) => {
    setSelectedPlayers((prevSelected) => {
      const isAlreadySelected = prevSelected.some(p => p.id === player.id);
      if (isAlreadySelected) {
        return prevSelected.filter(p => p.id !== player.id);
      }
      if (prevSelected.length < MAX_PLAYERS_SELECTED) {
        return [...prevSelected, player];
      }
      // If trying to select a 3rd player, replace the first selected one
      // This provides a slightly better UX than just blocking.
      // Or, show a toast message. For now, let's allow replacing the first.
      toast({
        title: "Maximum Players Selected",
        description: `You can only select ${MAX_PLAYERS_SELECTED} players. ${player.name} replaced ${prevSelected[0].name}.`,
        variant: "default",
      });
      return [...prevSelected.slice(1), player];
    });
    setSimulationResult(null); // Clear previous results when selection changes
    setSimulationError(null);
  };

  const handleSimulateMatch = async () => {
    if (selectedPlayers.length !== MAX_PLAYERS_SELECTED) {
      toast({
        title: "Selection Incomplete",
        description: `Please select ${MAX_PLAYERS_SELECTED} players to simulate a match.`,
        variant: "destructive",
      });
      return;
    }

    setIsSimulating(true);
    setSimulationResult(null);
    setSimulationError(null);

    const [player1, player2] = selectedPlayers;

    try {
      const result = await simulateTennisMatch({
        player1Name: player1.name,
        player1Ranking: player1.ranking,
        player1HistoricalData: player1.historicalData,
        player1CurrentForm: player1.currentForm,
        player1PlayingStyle: player1.playingStyle,
        player2Name: player2.name,
        player2Ranking: player2.ranking,
        player2HistoricalData: player2.historicalData,
        player2CurrentForm: player2.currentForm,
        player2PlayingStyle: player2.playingStyle,
      });
      setSimulationResult(result);
    } catch (error) {
      console.error("Match simulation failed:", error);
      setSimulationError("An error occurred during match simulation. Please try again.");
       toast({
        title: "Simulation Error",
        description: "Failed to simulate the match. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSimulating(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <section id="player-selection" className="mb-12">
        <h1 className="text-4xl font-headline font-bold mb-2 text-center text-primary">Select Your Duelists</h1>
        <p className="text-lg text-muted-foreground mb-8 text-center">
          Choose two tennis stars from the list below to see who our AI predicts as the winner.
        </p>
        
        {selectedPlayers.length > 0 && (
           <Card className="mb-8 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Selected Players</CardTitle>
              <CardDescription>
                {selectedPlayers.length === MAX_PLAYERS_SELECTED 
                  ? "Ready to duel! Click 'Simulate Match' below."
                  : `Select ${MAX_PLAYERS_SELECTED - selectedPlayers.length} more player(s).`}
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Array.from({ length: MAX_PLAYERS_SELECTED }).map((_, index) => {
                const player = selectedPlayers[index];
                if (player) {
                  return (
                    <div key={player.id} className="flex items-center gap-3 p-3 border rounded-md bg-background">
                      <Image src={player.avatarUrl} alt={player.name} width={40} height={40} className="rounded-full" data-ai-hint="player avatar" />
                      <div>
                        <p className="font-semibold">{player.name}</p>
                        <p className="text-sm text-muted-foreground">Ranking: {player.ranking}</p>
                      </div>
                       <Button variant="ghost" size="sm" onClick={() => handlePlayerSelect(player)} className="ml-auto text-destructive hover:text-destructive-foreground hover:bg-destructive/90">
                        <UserX className="w-4 h-4 mr-1" /> Remove
                      </Button>
                    </div>
                  );
                }
                return (
                  <div key={`placeholder-${index}`} className="flex items-center justify-center gap-3 p-3 border rounded-md border-dashed h-[74px] bg-muted/30">
                    <UserCheck className="w-6 h-6 text-muted-foreground" />
                    <p className="text-muted-foreground">Player {index + 1}</p>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        )}

        <PlayerList
          selectedPlayers={selectedPlayers}
          onPlayerSelect={handlePlayerSelect}
          maxSelection={MAX_PLAYERS_SELECTED}
        />
      </section>

      {selectedPlayers.length === MAX_PLAYERS_SELECTED && (
        <section id="simulation-controls" className="text-center mb-12">
          <Button
            size="lg"
            onClick={handleSimulateMatch}
            disabled={isSimulating}
            className="px-8 py-6 text-lg shadow-lg hover:shadow-primary/40 transition-shadow"
          >
            {isSimulating ? (
              <>
                <LoadingSpinner size={24} className="mr-2" /> Simulating...
              </>
            ) : (
              <>
                <Swords className="mr-2 h-6 w-6" /> Simulate Match
              </>
            )}
          </Button>
        </section>
      )}
      
      {isSimulating && (
         <div className="flex flex-col items-center justify-center my-8 p-6 border border-dashed rounded-md">
            <LoadingSpinner size={48} />
            <p className="mt-4 text-xl text-muted-foreground">Our AI is predicting the outcome...</p>
            <p className="text-sm text-muted-foreground">This might take a moment.</p>
        </div>
      )}

      {simulationError && !isSimulating && (
        <Alert variant="destructive" className="my-8">
          <Info className="h-5 w-5" />
          <AlertTitle>Simulation Error</AlertTitle>
          <AlertDescription>{simulationError}</AlertDescription>
        </Alert>
      )}

      {simulationResult && !isSimulating && selectedPlayers.length === MAX_PLAYERS_SELECTED && (
        <section id="match-results">
          <MatchResult 
            result={simulationResult} 
            player1Name={selectedPlayers[0].name} 
            player2Name={selectedPlayers[1].name}
          />
        </section>
      )}
    </div>
  );
}
