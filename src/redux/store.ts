import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import userReducer from './slices/userSlices/userSlices';

const combinedReducer = combineReducers({
  userReducer,
});

const masterReducer = (state: any, action: any) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      //   counter: {
      //     count: state.counter.count + action.payload.counter.count,
      //   },
      userReducer: {
        user: { ...state.userReducer.user, ...action.payload.userReducer.user }, //[...action.payload.user, ...state.user],
      },
    };
    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};

export const makeStore = () =>
  configureStore({
    reducer: masterReducer, //masterReducer,
  });
// export const wrapper = createWrapper(makeStore, { debug: true });
export const wrapper = createWrapper(makeStore);

const store = configureStore({
  reducer: combinedReducer,
});

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
