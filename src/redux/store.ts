import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import stadiumUserReducer from './slices//stadiums/stadiumByUserSlice';
import navbarReducer from './slices/navbars/navbarSlice';
import stadiumReducer from './slices/stadiums/allStadiumsSlice';
import stadiumIdReducer from './slices/stadiums/stadiumSlice';
import userReducer from './slices/userSlices/userSlices';
const combinedReducer = combineReducers({
  userReducer,
  navbarReducer,
  stadiumIdReducer,
  stadiumReducer,
  stadiumUserReducer,
});

const masterReducer = (state: any, action: any) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      userReducer: {
        user: { ...state.userReducer.user, ...action.payload.userReducer.user },
      },
      navbarReducer: {
        menus: [...action.payload.navbarReducer.menus],
      },
      stadiumReducer: {
        stadiums: { ...action.payload.stadiumReducer.stadiums },
      },
      stadiumUserReducer: {
        stadiums: { ...action.payload.stadiumUserReducer.stadiums },
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
