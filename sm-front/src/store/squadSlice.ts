import {
  QueryStatusEnum,
  Squad,
  SquadMember,
  UserInterface,
} from '@/utils/types/index';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: any = {
  squads: [],
  status: QueryStatusEnum.idle,
  error: null,
  squad: null,
  squadMembers: [],
  users: [],
};

interface SquadState {
  squads?: Squad[];
  status?: QueryStatusEnum;
  error?: string | null | undefined;
  squad: Squad | null;
  squadMembers?: SquadMember[];
  users?: UserInterface[];
}

const squadsSlice = createSlice({
  name: 'squads',
  initialState,
  reducers: {
    setSquads(state, action: PayloadAction<Squad[]>) {
      state.squads = action.payload;
    },
    setSquad(state, action: PayloadAction<SquadState>) {
      state.squad = action.payload.squad;
      state.squadMembers = action.payload.squadMembers;
      state.users = action.payload.users;
    },
    addSquad(state, action: PayloadAction<Squad>) {
      state.squads.push(action.payload);
    },
    updateSquad(state, action: PayloadAction<Squad>) {
      const index: number = state.squads.findIndex(
        (squad: Squad) => squad.squadid === action.payload.squadid
      );
      if (index !== -1) {
        state.squads[index] = action.payload;
      }
    },
    deleteSquad(state, action: PayloadAction<number>) {
      state.squads = state.squads.filter(
        (squad: Squad) => squad.squadid !== action.payload
      );
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    setStatus(state, action: PayloadAction<QueryStatusEnum>) {
      state.status = action.payload;
    },
  },
});

export const {
  setSquads,
  addSquad,
  updateSquad,
  deleteSquad,
  setError,
  setStatus,
  setSquad,
} = squadsSlice.actions;
export default squadsSlice.reducer;
