import { useCallback, useContext, useEffect, useState } from 'preact/hooks';
import { DotContext } from '../context/dotContext';
import { GameStateContext } from '../context/gameStateContext';

type Records = {
  [key: string]: { [key: string]: number };
};

export const useRecords = () => {
  const [recordsFromStorage, setRecordsFromStorage] = useState<Records>(JSON.parse(localStorage.getItem('records') || '{}'));
  const {
    gameState: { difficulty },
  } = useContext(GameStateContext);
  const {
    dotData: { collectionName, clickedDots },
  } = useContext(DotContext);

  const checkScoreAgainstRecords = useCallback(() => {
    const difficultyLabels = ['easy', 'medium', 'hard'];
    const thisDifficultyLabel = difficultyLabels[difficulty];
    const previousHighScore = recordsFromStorage[collectionName]?.[thisDifficultyLabel];
    if (!previousHighScore || clickedDots.length > previousHighScore) {
      const updatedRecords = {
        ...recordsFromStorage,
        [collectionName]: { ...recordsFromStorage[collectionName], [thisDifficultyLabel]: clickedDots.length },
      };
      localStorage.setItem('records', JSON.stringify(updatedRecords));
      setRecordsFromStorage((oldRecords: Records) => {
        return {
          ...oldRecords,
          [collectionName]: { ...oldRecords[collectionName], [thisDifficultyLabel]: clickedDots.length },
        };
      });
      return true;
    }
    return false;
  }, [clickedDots.length, collectionName, difficulty]);

  useEffect(() => {
    if (JSON.stringify(recordsFromStorage) === localStorage.getItem('records')) return;
    return localStorage.setItem('records', JSON.stringify(recordsFromStorage));
  }, [recordsFromStorage]);

  return { checkScoreAgainstRecords, recordsFromStorage };
};
