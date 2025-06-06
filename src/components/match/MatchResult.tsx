import type { SimulateTennisMatchOutput } from '@/ai/flows/simulate-tennis-match';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, Zap } from 'lucide-react'; // Zap for energy/key factors

interface MatchResultProps {
  result: SimulateTennisMatchOutput;
  player1Name: string;
  player2Name: string;
}

export function MatchResult({ result, player1Name, player2Name }: MatchResultProps) {
  const winnerIsPlayer1 = result.predictedWinner === player1Name;
  const loserName = winnerIsPlayer1 ? player2Name : player1Name;

  return (
    <Card className="w-full max-w-2xl mx-auto my-8 shadow-xl border-accent animate-in fade-in-50 duration-500">
      <CardHeader className="text-center items-center">
        <Trophy className="w-16 h-16 text-accent mb-4" />
        <CardTitle className="font-headline text-3xl">Match Result</CardTitle>
        <CardDescription>Simulation Complete!</CardDescription>
      </CardHeader>
      <CardContent className="text-center space-y-4">
        <p className="text-2xl">
          Predicted Winner: <strong className="text-primary">{result.predictedWinner}</strong>
        </p>
        <div className="bg-card-foreground/5 p-4 rounded-md">
          <h3 className="text-lg font-semibold flex items-center justify-center mb-2">
            <Zap className="w-5 h-5 mr-2 text-primary" />
            Key Factors & Summary
          </h3>
          <p className="text-muted-foreground text-left whitespace-pre-line">{result.matchSummary}</p>
        </div>
      </CardContent>
    </Card>
  );
}
