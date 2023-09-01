import { ComponentChildren, createContext } from 'preact';
import { useReducer, Dispatch } from 'preact/hooks';
import { classicGrid } from '../helpers/dotLibrary';
import { calculateDotPositions } from '../helpers/calculateDotPositions';

export type ActiveDot = {
  id: string;
  degreeX: number;
  degreeY: number;
  top?: number;
  left?: number;
};

type StateType = {
  collectionName: string;
  allDots: ActiveDot[];
  activeDot: ActiveDot;
  clickedDots: string[];
  shownDots: ActiveDot[];
  lineLength: number;
};

type ActionType = {
  type: 'UPDATE_DOTS_USED' | 'SET_ALL_DOTS' | 'SET_ACTIVE_DOT' | 'ADD_SEEN_DOT' | 'MARK_DOT_SHOWN' | 'SET_LINE_LENGTH' | 'RESET_DOTS';
  payload?: any;
};

const initialState = {
  collectionName: 'Classic',
  allDots: classicGrid.dots,
  activeDot: {} as ActiveDot,
  clickedDots: [] as string[],
  shownDots: [] as ActiveDot[],
  lineLength: 0,
};

export const DotContext = createContext({ dotData: initialState, updateDotData: {} as Dispatch<ActionType> });

const dotReducer = (state: StateType, action: ActionType): StateType => {
  switch (action.type) {
    case 'UPDATE_DOTS_USED': {
      const { collectionName: newName, dots: newDots } = action.payload;
      return updateDotPositions({ ...state, collectionName: newName }, newDots, state.lineLength);
    }
    case 'SET_ALL_DOTS':
      return updateDotPositions(state, action.payload, state.lineLength);
    case 'SET_ACTIVE_DOT':
      return { ...state, activeDot: action.payload };
    case 'ADD_SEEN_DOT':
      return { ...state, clickedDots: [...state.clickedDots, action.payload] };
    case 'MARK_DOT_SHOWN': {
      const filteredDots = state.allDots.filter((dot) => dot.id !== action.payload.id);
      return { ...state, shownDots: [...state.shownDots, action.payload], allDots: filteredDots };
    }
    case 'SET_LINE_LENGTH':
      return updateDotPositions({ ...state, lineLength: action.payload }, state.allDots, action.payload);
    case 'RESET_DOTS':
      return updateDotPositions({ ...initialState, lineLength: state.lineLength }, classicGrid.dots, state.lineLength);
    default:
      return state;
  }
};

const updateDotPositions = (state: StateType, allDots: ActiveDot[], lineLength: number) => {
  const dotsWithPositions = calculateDotPositions({ lineLength, allDots });
  return { ...state, allDots: dotsWithPositions };
};

export const DotProvider = ({ children }: { children: ComponentChildren }) => {
  const [dotData, updateDotData] = useReducer(dotReducer, initialState);

  return <DotContext.Provider value={{ dotData, updateDotData }}>{children}</DotContext.Provider>;
};
