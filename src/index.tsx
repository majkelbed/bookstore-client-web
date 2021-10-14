import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Button } from "react-bootstrap";
import { store } from "./app/store";
import { Layout } from "./features/layout/layout.component";
import "./app/styles.scss";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Layout>
        <Button>Hello</Button>
      </Layout>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
