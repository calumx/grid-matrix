import { ComponentChildren, createContext } from 'preact';
import { useReducer, Dispatch } from 'preact/hooks';

type StateType = {
  gameActive: boolean;
  gameComplete: boolean;
  countdownActive: boolean;
  countdown: number;
  difficulty: number;
  displayTime: number;
  records: object;
};

type ActionType = {
  type: 'BEGIN_GAME' | 'STOP_GAME' | 'END_GAME' | 'RESET_GAME_STATE' | 'START_COUNTDOWN' | 'DECREMENT_COUNTDOWN' | 'SET_DIFFICULTY';
  payload?: any;
};

const initialState = {
  gameActive: false,
  gameComplete: false,
  countdownActive: false,
  countdown: 3,
  difficulty: 0,
  displayTime: 1000,
  records: JSON.parse(localStorage.getItem('records') || '{}'),
};

export const GameStateContext = createContext({ gameState: initialState, updateGameState: {} as Dispatch<ActionType> });

const gameStateReducer = (state: StateType, action: ActionType): StateType => {
  switch (action.type) {
    case 'BEGIN_GAME':
      return { ...state, gameActive: true, gameComplete: false };
    case 'STOP_GAME':
    case 'END_GAME':
      return { ...state, gameActive: false, countdownActive: false, countdown: 3, ...(action.type === 'END_GAME' && { gameComplete: true }) };
    case 'RESET_GAME_STATE':
      return initialState;
    case 'START_COUNTDOWN':
      return { ...state, countdownActive: true };
    case 'DECREMENT_COUNTDOWN':
      return { ...state, countdown: state.countdown - 1 };
    case 'SET_DIFFICULTY': {
      const displayTimes = [1250, 900, 600];
      return { ...state, difficulty: action.payload, displayTime: displayTimes[action.payload] };
    }
    default:
      return state;
  }
};

export const GameStateProvider = ({ children }: { children: ComponentChildren }) => {
  const [gameState, updateGameState] = useReducer(gameStateReducer, initialState);

  return <GameStateContext.Provider value={{ gameState, updateGameState }}>{children}</GameStateContext.Provider>;
};
