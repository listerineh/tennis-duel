import type { Player } from '@/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { BarChart3, CheckSquare, Square } from 'lucide-react';

interface PlayerCardProps {
  player: Player;
  onSelect: (player: Player) => void;
  isSelected: boolean;
  isDisabled: boolean; // True if this card cannot be selected (e.g., 2 players already selected and this is not one of them)
}

export function PlayerCard({ player, onSelect, isSelected, isDisabled }: PlayerCardProps) {
  return (
    <Card className={cn(
      "overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg",
      isSelected ? "ring-2 ring-primary shadow-primary/30" : "ring-1 ring-border",
      isDisabled && !isSelected ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
    )}
    onClick={() => !isDisabled && onSelect(player)}
    >
      <CardHeader className="p-4">
        <div className="flex items-center gap-4">
          <Image
            src={player.avatarUrl}
            alt={player.name}
            width={60}
            height={60}
            className="rounded-full border-2 border-primary"
            data-ai-hint="player avatar"
          />
          <div>
            <CardTitle className="font-headline text-xl">{player.name}</CardTitle>
            <CardDescription className="flex items-center text-sm">
              <BarChart3 className="mr-1 h-4 w-4 text-accent" /> Ranking: {player.ranking}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <Button
          variant={isSelected ? "default" : "outline"}
          className="w-full mt-2"
          onClick={(e) => {
            e.stopPropagation(); // Prevent card click event
            onSelect(player);
          }}
          disabled={isDisabled && !isSelected}
          aria-pressed={isSelected}
        >
          {isSelected ? <CheckSquare className="mr-2 h-5 w-5" /> : <Square className="mr-2 h-5 w-5" />}
          {isSelected ? 'Selected' : 'Select Player'}
        </Button>
      </CardContent>
    </Card>
  );
}
