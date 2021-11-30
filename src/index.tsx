import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { store } from "./app/store";
import { Layout } from "./features/layout/layout.component";
import { Product } from "./features/products/product/product.component";
import { ProductsGrid } from "./features/products/products-grid/products-grid.component";
import "./app/styles.scss";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Layout>
          <Switch>
            <Route path="/product/:id" component={Product} />
            <Route path="/">
              <ProductsGrid />
            </Route>
          </Switch>
        </Layout>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
