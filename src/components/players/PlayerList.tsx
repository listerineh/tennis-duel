'use client';

import type { Player } from '@/types';
import { fetchPlayers } from '@/lib/tennisApi';
import { useEffect, useState } from 'react';
import { PlayerCard } from './PlayerCard';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Frown } from 'lucide-react';

interface PlayerListProps {
  selectedPlayers: Player[];
  onPlayerSelect: (player: Player) => void;
  maxSelection: number;
}

export function PlayerList({ selectedPlayers, onPlayerSelect, maxSelection }: PlayerListProps) {
  const [players, setPlayers] = useState<Player[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPlayers() {
      setIsLoading(true);
      setError(null);
      try {
        const fetchedPlayers = await fetchPlayers();
        setPlayers(fetchedPlayers);
      } catch (err) {
        setError('Failed to load players. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    loadPlayers();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <LoadingSpinner size={40} />
        <p className="ml-4 text-lg">Loading players...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="my-4">
        <Frown className="h-5 w-5" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (players.length === 0) {
    return <p className="text-center py-10 text-lg">No players available at the moment.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {players.map((player) => {
        const isSelected = selectedPlayers.some(p => p.id === player.id);
        const isDisabled = !isSelected && selectedPlayers.length >= maxSelection;
        return (
          <PlayerCard
            key={player.id}
            player={player}
            onSelect={() => onPlayerSelect(player)}
            isSelected={isSelected}
            isDisabled={isDisabled}
          />
        );
      })}
    </div>
  );
}
