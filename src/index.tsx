import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { Layout } from "./features/layout/layout.component";
import { ProductsGrid } from "./features/products-grid/products-grid.component";
import "./app/styles.scss";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Layout>
        <ProductsGrid />
      </Layout>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
