import React from "react";
import ReactDOM from "react-dom";
import SeasonDisplay from "./SeasonDisplay";
import Spinner from "./Spinner";

class App extends React.Component {
  state = { lat: null, errorMessage: "" };

  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
      position => this.setState({ lat: position.coords.latitude }),
      err => this.setState({ errorMessage: err.message })
    );

    console.log("My component mounted.");
  }

  componentDidUpdate() {
    console.log("My component updated.");
  }

  renderContent() {
    if (this.state.errorMessage && !this.state.lat) {
      return <div>Error : {this.state.errorMessage}</div>;
    }
    if (!this.state.errorMessage && this.state.lat) {
      return <SeasonDisplay lat={this.state.lat} />;
    }
    return <Spinner message="Waiting for your location..." />;
  }

  render() {
    return <div className="container">{this.renderContent()}</div>;
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));