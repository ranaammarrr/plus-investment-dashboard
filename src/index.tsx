import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "./Redux/store";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./Theme/theme";
// import "antd/dist/antd.css";
import "./index.css";
import { ConfigProvider, Spin } from "antd";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
  <Suspense
              fallback={
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Spin size="large" />
                </div>
              }
            >
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <ConfigProvider
          theme={{
            token: {
              fontFamily: "Poppins",
            },
            components: {
              Menu: {
                darkItemSelectedBg: "#000000e0",
              },
            },
          }}
        >
          <App />
        </ConfigProvider>
      </ThemeProvider>
    </Provider>
    </Suspense>
  </BrowserRouter>
);
