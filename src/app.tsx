import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { store } from "./app/store";
import { Layout } from "./features/layout/layout.component";
import { Product } from "./features/products/product/product.component";
import { ProductsGrid } from "./features/products/products-grid/products-grid.component";
import { Cart } from "./features/cart/cart.component";
import { Orders } from "./features/order/orders.component";
import "./app/styles.scss";
import { CustomerProfile } from "./features/customer/customer.component";

export const App = () => {
  return (
    <Provider store={store}>
    <Router>
      <Layout>
        <Switch>
          <Route path="/cart" component={Cart} />
          <Route path="/order" component={Orders} />
          <Route path="/customer" component={CustomerProfile} />
          <Route path="/product/:id" component={Product} />
          <Route path="/" component={ProductsGrid} />
        </Switch>
      </Layout>
    </Router>
  </Provider>
  )
}