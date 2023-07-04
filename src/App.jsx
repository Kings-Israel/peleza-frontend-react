import { Provider } from "react-redux";
import AppRouter from "router";
import "./assets/scss/styles.scss";
import { store } from "store";

import { Component } from "react";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppRouter />
      </Provider>
    );
  }
}

export default App;
