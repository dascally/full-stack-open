import { createSlice } from '@reduxjs/toolkit';
import * as anecdoteService from '../services/anecdotes';
import { setTimedNotification } from './notificationReducer';

const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    vote(state, action) {
      return state.map((anecdote) =>
        anecdote.id === action.payload
          ? { ...anecdote, votes: anecdote.votes + 1 }
          : anecdote
      );
    },
    add(state, action) {
      state.push(action.payload);
    },
    addAll(state, action) {
      return action.payload;
    },
  },
});

export const { vote, add, addAll } = anecdotesSlice.actions;

export const addAnecdote = (content) => async (dispatch) => {
  const anecdote = await anecdoteService.addAnecdote(content);
  dispatch(add(anecdote));

  dispatch(setTimedNotification('Added a new anecdote.', 5));
};

export const voteForAnecdote = (anecdote) => async (dispatch) => {
  await anecdoteService.voteForAnecdote(anecdote);
  dispatch(vote(anecdote.id));

  dispatch(
    setTimedNotification(
      `Voted for the following anecdote: ${anecdote.content}`,
      5
    )
  );
};

export const initializeAnecdotes = () => async (dispatch) => {
  const anecdotes = await anecdoteService.getAll();
  dispatch(addAll(anecdotes));
};

export default anecdotesSlice.reducer;
