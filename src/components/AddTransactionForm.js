import React, { Component } from "react";
import { starsItemsData } from "./Data.js";

class AddTransactionForm extends Component {
  state = {
    wytrzymalosc: "40",
    iloscGwiazdek: "3",
    cena: "",
    dodatkoweInfoOTransakcji: "",

    isValidWytrzymalosc: true,
    isValidIloscGwiazdek: true,
    isValidCena: false,
  };

  checkIfStarsItem = (name) => {
    const { starsItems } = starsItemsData;

    return Boolean(starsItems.find((item) => item === name));
  };

  handleChange = (event) => {
    const { value, name } = event.target;

    this.setState({
      [name]: value,
    });

    if (name === "wytrzymalosc") {
      const isValidWytrzymalosc =
        value < 35 || value > 50 || value === "" ? false : true;

      this.setState({
        isValidWytrzymalosc,
      });
    }

    if (name === "iloscGwiazdek") {
      const isValidIloscGwiazdek =
        value < 1 || value > 5 || value === "" ? false : true;

      this.setState({
        isValidIloscGwiazdek,
      });
    }

    if (name === "cena") {
      const isValidCena = value === "" ? false : true;

      this.setState({
        isValidCena,
      });
    }
  };

  render() {
    const ifStarsItem = this.checkIfStarsItem(this.props.item.name);
    const { handleSubmit } = this.props;
    const { handleChange } = this;
    const {
      wytrzymalosc,
      isValidWytrzymalosc,
      iloscGwiazdek,
      isValidIloscGwiazdek,
      cena,
      isValidCena,
      dodatkoweInfoOTransakcji,
    } = this.state;

    return (
      <div className="adding_form">
        <form onSubmit={handleSubmit}>
          <select name="transactionType" onChange={handleChange}>
            <option value="bought">kupiony</option>
            <option value="sold">sprzedany</option>
          </select>
          <label>
            Wytrzymałość:
            <input
              name="wytrzymalosc"
              type="number"
              value={wytrzymalosc}
              onChange={handleChange}
              className="input_small"
              min={35}
              max={50}
            />
            %
            {isValidWytrzymalosc ? null : (
              <span className="warning">
                Wpisz wytrzymałość pomiędzy 35 a 50%.
              </span>
            )}
          </label>
          {ifStarsItem ? (
            <label>
              Ilość gwiazdek:
              <input
                name="iloscGwiazdek"
                type="number"
                value={iloscGwiazdek}
                onChange={handleChange}
                className="input_small"
                min={1}
                max={5}
              />
              *
              {isValidIloscGwiazdek ? null : (
                <span className="warning">
                  Ilość gwiazdek to min 1 i max 5.
                </span>
              )}
            </label>
          ) : null}
          <label>
            Cena w goldzie:
            <input
              name="cena"
              type="number"
              value={cena}
              onChange={handleChange}
              className="input_big"
              step={1000}
              min={0}
              max={999999999}
            />
            {isValidCena ? null : (
              <span className="warning_green">(Wymagane)</span>
            )}
          </label>
          <label>
            Dodatkowe info:
            <input
              name="dodatkoweInfoOTransakcji"
              type="text"
              value={dodatkoweInfoOTransakcji}
              onChange={handleChange}
            />
          </label>
          <button
            disabled={
              !isValidWytrzymalosc || !isValidIloscGwiazdek || !isValidCena
            }
          >
            Dodaj
          </button>
        </form>
      </div>
    );
  }
}

export default AddTransactionForm;
