import React, { Component } from "react";
import AddTransactionForm from "./AddTransactionForm.js";

class ItemTransactionsHistory extends Component {
  state = {
    isOpen: false,

    historiaTransakcji: [],
  };

  componentDidMount() {
    this.importHistoriaTransakcji();
  }

  importHistoriaTransakcji = () => {
    const { historiaTransakcji } = this.props.item;

    this.setState({
      historiaTransakcji,
    });
  };

  showHistory = (props) => {
    const { formatValue } = props;
    const { historiaTransakcji } = this.state;

    if (historiaTransakcji.length === 0) {
      return (
        <span>
          Ten przedmiot nie posiada jeszcze historii. Kliknij przycisk poniżej
          aby dodać pierwszą transakcję.
        </span>
      );
    }

    return historiaTransakcji.map((transakcja, index) => {
      const {
        data,
        transactionType,
        wytrzymalosc,
        iloscGwiazdek,
        cena,
        dodatkoweInfoOTransakcji,
      } = transakcja;

      return (
        <li key={index}>
          {data}
          {iloscGwiazdek > 0 ? ", " + iloscGwiazdek + "*, " : ", "}
          {wytrzymalosc}%
          {transactionType === "sold" ? " - sprzedany za " : " - kupiony za "}
          {formatValue(cena)}
          {dodatkoweInfoOTransakcji
            ? " (" + dodatkoweInfoOTransakcji + ")"
            : null}
        </li>
      );
    });
  };

  handleClick = (event) => {
    this.setState({
      [event.target.name]: !this.state[event.target.name],
    });
  };

  getDate = () => {
    // to export
    let dateObj = new Date();
    let year = dateObj.getFullYear();
    let month;

    switch (dateObj.getMonth()) {
      case 0:
        month = "styczeń";
        break;
      case 1:
        month = "luty";
        break;
      case 2:
        month = "marzec";
        break;
      case 3:
        month = "kwiecień";
        break;
      case 4:
        month = "maj";
        break;
      case 5:
        month = "czerwiec";
        break;
      case 6:
        month = "lipiec";
        break;
      case 7:
        month = "sierpień";
        break;
      case 8:
        month = "wrzesień";
        break;
      case 9:
        month = "październik";
        break;
      case 10:
        month = "listopad";
        break;
      case 11:
        month = "grudzień";
        break;
    }

    return month + " " + year;
  };

  handleSubmit = (event) => {
    event.preventDefault();
    let data = this.getDate();

    for (let i = 0; i < event.target.length - 1; i++) {
      this[event.target[i].name] = event.target[i].value;
    }

    let historiaTransakcji = this.state.historiaTransakcji;
    historiaTransakcji = historiaTransakcji.concat({
      data: data,
      transactionType: this.transactionType,
      wytrzymalosc: this.wytrzymalosc,
      iloscGwiazdek: this.iloscGwiazdek,
      cena: this.cena,
      dodatkoweInfoOTransakcji: this.dodatkoweInfoOTransakcji,
    });

    this.setState({
      historiaTransakcji,
    });
  };

  render() {
    const { showHistory, props, handleClick, handleSubmit } = this;
    const { isOpen } = this.state;

    return (
      <td>
        Historia transakcji:
        <ul className="transactions">{showHistory(props)}</ul>
        <button
          className="add_transaction_btn"
          onClick={handleClick}
          name="isOpen"
        >
          Dodaj transakcję
        </button>
        {isOpen ? (
          <AddTransactionForm handleSubmit={handleSubmit} {...props} />
        ) : null}
      </td>
    );
  }
}

export default ItemTransactionsHistory;
