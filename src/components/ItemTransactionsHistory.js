import React, { Component } from "react";

class ItemTransactionsHistory extends Component {
  showHistory = (props) => {
    const { convert } = props;

    return props.item.historiaTransakcji.map((transakcja, index) => {
      const {
        data,
        wytrzymalosc,
        iloscGwiazdek,
        cena,
        dodatkoweInfo,
      } = transakcja;

      return (
        <li key={index}>
          {data}, {wytrzymalosc}% - {iloscGwiazdek ? iloscGwiazdek + ", " : " "}
          {convert(cena)}
          {dodatkoweInfo ? " (" + dodatkoweInfo + ")" : null}
        </li>
      );
    });
  };

  render() {
    const { showHistory, props } = this;

    return (
      <td>
        Historia transakcji:
        <ul className="transactions">{showHistory(props)}</ul>
      </td>
    );
  }
}

export default ItemTransactionsHistory;
