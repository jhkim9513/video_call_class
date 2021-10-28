import { BrowserRouter, Route, Switch } from "react-router-dom";

import React, { Component } from "react";
import Header from "./components/header/Header";
import InfoForm from "./components/main/infoForm/InfoForm";
import { AppContainer } from "./styledComponents/appStyle";
import VideoScreen from "./components/main/videoScreen/VideoScreen";
import Loading from "./components/etc/Loading";

class App extends Component {
  render() {
    return (
      <AppContainer>
        <BrowserRouter>
          <Header />
          <Switch>
            <Route exact path="/" component={InfoForm} />
            <Route exact path="/loading" component={Loading} />
            <Route exact path="/videoScreen" component={VideoScreen} />
          </Switch>
        </BrowserRouter>
      </AppContainer>
    );
  }
}

export default App;
