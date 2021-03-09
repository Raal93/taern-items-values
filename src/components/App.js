import "./App.css";
import React, { Component } from "react";
import Boss from "./Boss.js";
import "bootstrap/dist/css/bootstrap.css";
import { bossData, essencesData } from "./Data.js";

class App extends Component {
  state = {
    cenaEsencji: 25000, // użyte tutaj aby zmiana jednego inputa wymuszała zmianę wszystkich
    cenaPlatyny: 16000,
  };

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const { bosses } = bossData;
    const { essencesInfo } = essencesData;
    const { handleInputChange } = this;
    const { cenaEsencji, cenaPlatyny } = this.state;

    return (
      <div className="bossSection">
        <Boss
          bosses={bosses}
          essencesInfo={essencesInfo}
          handleInputChange={handleInputChange}
          cenaEsencji={cenaEsencji}
          cenaPlatyny={cenaPlatyny}
        />
      </div>
    );
  }
}

export default App;
