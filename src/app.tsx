import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { store } from "./app/store";
import { Layout } from "./features/layout/layout.component";
import { Product } from "./features/products/product/product.component";
import { ProductsGrid } from "./features/products/products-grid/products-grid.component";
import { Cart } from "./features/cart/cart.component";
import "./app/styles.scss";

export const App = () => {
  return (
    <Provider store={store}>
    <Router>
      <Layout>
        <Switch>
          <Route path="/cart" component={Cart} />
          <Route path="/product/:id" component={Product} />
          <Route path="/" component={ProductsGrid} />
        </Switch>
      </Layout>
    </Router>
  </Provider>
  )
}