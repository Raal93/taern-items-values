import React, { Component } from "react";

class MeltOptions extends Component {
  state = {
    isOpen: false,

    inhibStatus: "",
    extractorStatus: true,
  };

  componentDidMount() {
    this.setInhibStatus();
  }

  calcEssenceProfit = () => {
    const { inhibStatus, extractorStatus } = this.state;
    const {
      esencjeBezInhibitora,
      esencjeZInhibitorem,
      kosztInhibitoraPl,
      kosztInhibitoraKraft,
    } = this.props.infoORandze;
    const { cenaPlatyny, cenaEsencji, formatValue } = this.props;

    // wyznacz koszty przetopienia: koszt inhibitora
    // wyznacz ilosc esek w zaleznosci od statusu inhibitora
    let inhibCost, essAmount;
    switch (inhibStatus) {
      case "none":
        inhibCost = 0;
        essAmount = esencjeBezInhibitora;
        break;
      case "free":
        inhibCost = 0;
        essAmount = esencjeZInhibitorem;
        break;
      case "crafted":
        inhibCost = kosztInhibitoraKraft;
        essAmount = esencjeZInhibitorem;
        break;
      case "bought":
        inhibCost = kosztInhibitoraPl * cenaPlatyny;
        essAmount = esencjeZInhibitorem;
        break;
    }
    // wyznacz koszty przetopienia: ekstaktor
    const extractorCost = extractorStatus ? 20000 : 0;

    // oblicz i zwroc zysk
    const profit = essAmount * cenaEsencji - (inhibCost + extractorCost);

    return formatValue(profit);
  };

  calculateMinMaxProfit = () => {
    const { formatTwoValues } = this.props;
    const {
      esencjeBezInhibitora,
      esencjeZInhibitorem,
    } = this.props.infoORandze;
    const minEssencesValue = 20000;
    const maxEssencesValue = 25000;

    const min = esencjeBezInhibitora * minEssencesValue - 20000;
    const max = esencjeZInhibitorem * maxEssencesValue - 20000;

    return formatTwoValues(min, max);
  };

  setInhibStatus = () => {
    const { ranga } = this.props.item;
    let inhibStatus = "";

    switch (true) {
      case ranga <= 4:
        inhibStatus = "none";
        break;
      case ranga === 5 || ranga === 6:
        inhibStatus = "free";
        break;
      case ranga >= 7:
        inhibStatus = "bought";
        break;
    }

    this.setState({
      inhibStatus,
    });
  };

  handleButtonClick = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  handleSelectChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleCheckboxChange = (event) => {
    this.setState({
      [event.target.name]: !this.state[event.target.name],
    });
  };

  showMeltOptions = () => {
    const { isOpen, inhibStatus, extractorStatus } = this.state;
    const { handleInputChange, cenaEsencji, cenaPlatyny } = this.props;
    const {
      handleSelectChange,
      handleCheckboxChange,
      calcEssenceProfit,
    } = this;
    const { optymalnyInhib, czyKraftowalny } = this.props.infoORandze;

    const meltOptions = (
      <div className="melt_options">
        <ul>
          <li className="inhibitor">
            inhibitor ({optymalnyInhib}):
            <select
              value={inhibStatus}
              name="inhibStatus"
              onChange={handleSelectChange}
            >
              <option value="none">brak</option>
              <option value="free">darmowy</option>
              {czyKraftowalny ? (
                <option value="crafted">kraftowany</option>
              ) : null}
              <option value="bought">kupiony za platynę</option>
            </select>
          </li>
          {inhibStatus === "bought" ? (
            <ul className="plat_cost">
              <li>
                cena platyny:{" "}
                <input
                  type="number"
                  name="cenaPlatyny"
                  value={cenaPlatyny}
                  onChange={handleInputChange}
                  step="500"
                />
              </li>
            </ul>
          ) : null}
          <li>
            cena esencji:{" "}
            <input
              type="number"
              name="cenaEsencji"
              value={cenaEsencji}
              onChange={handleInputChange}
              step="500"
            />
          </li>
          <li>
            ekstraktor ze sklepu (20k){" "}
            <input
              checked={extractorStatus}
              name="extractorStatus"
              type="checkbox"
              onChange={handleCheckboxChange}
            />
          </li>
        </ul>
        <span className="essences_profit">
          Zysk z esek w takim układzie: <strong>{calcEssenceProfit()}</strong>
        </span>
      </div>
    );

    return isOpen ? meltOptions : null;
  };

  render() {
    const { showMeltOptions, handleButtonClick, calculateMinMaxProfit } = this;
    const { formatTwoValues } = this.props;
    const { zyskZesencjiMin, zyskZesencjiMax } = this.props.item;

    return (
      <>
        Zysk jeśli przetopimy na eski:{" "}
        <span className="new_line">{calculateMinMaxProfit()}</span>
        <button className="melt_btn" onClick={handleButtonClick}>
          Pokaż opcje przetapiania
        </button>
        {showMeltOptions()}
      </>
    );
  }
}

export default MeltOptions;
