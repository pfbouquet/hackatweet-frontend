import "../styles/globals.css";
import Head from "next/head";
import "antd/dist/antd.css";

import { Provider } from "react-redux";
import user from "../reducers/user";
import kicksData from "../reducers/kicksData";
import trendsData from "../reducers/trendsData";
import likedKicks from "../reducers/likedKicks";
import trend from "../reducers/trend";

import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import storage from "redux-persist/lib/storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

const reducers = combineReducers({
  user,
  kicksData,
  trendsData,
  likedKicks,
  trend,
});
const persistConfig = { key: "JCVKick", storage };
const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
const persistor = persistStore(store);

function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Head>
          <title>JCVkicks</title>
        </Head>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}

export default App;
