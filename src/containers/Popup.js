import React, { Component } from "react";
import { render } from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import App from "containers/App";
import PopupHome from "components/PopupHome";
import PopupDetail from "components/PopupDetail";

class Popup extends Component {

  constructor(props){
    super(props);
    this.state = {
      isHome: true,
      packageName: '',
    }
  }

  onPackageClick = (name) => {
    this.setState({
      isHome: false,
      packageName: name,
    })
  }

  returnToHome = () => {
    this.setState({
      isHome: true,
      packageName: '',
    })
  }

  render() {

    const { packageName } = this.state;

    return (
        <App>
          { this.state.isHome
            ? <PopupHome onPackageClick={this.onPackageClick} />
            : <PopupDetail packageName={packageName} returnToHome={this.returnToHome}/>
          }   
        </App>
    );
  }
}

render(<Popup />, document.getElementById("main"));
