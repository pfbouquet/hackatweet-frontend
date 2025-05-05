import "../styles/globals.css";
import Head from "next/head";
import "antd/dist/antd.css";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import user from "../reducers/user";
import kicksData from "../reducers/kicksData";
import trendsData from "../reducers/trendsData";
import likedKicks from "../reducers/likedKicks";

const store = configureStore({
  reducer: { user, kicksData, trendsData, likedKicks },
});

function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Head>
        <title>JCVkicks</title>
      </Head>
      <Component {...pageProps} />
    </Provider>
  );
}

export default App;
