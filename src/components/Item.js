import React, { Component } from "react";
import ItemTransactionsHistory from "./ItemTransactionsHistory.js";
import ItemDescribe from "./ItemDescribe.js";
import MeltOptions from "./MeltOptions.js";

class Item extends Component {
  formatValue = (value) => {
    return value < 1000000 ? value / 1000 + "k" : value / 1000000 + "kk";
  };

  formatTwoValues = (value1, value2) => {
    if (value1 === value2) {
      return this.formatValue(value1);
    } else {
      return this.formatValue(value1) + " - " + this.formatValue(value2);
    }
  };

  render() {
    const { formatValue, formatTwoValues, props } = this;

    return (
      <table className="item">
        <tbody>
          <tr>
            <ItemTitle {...props} />
          </tr>
          <tr>
            <ItemInfo
              formatValue={formatValue}
              formatTwoValues={formatTwoValues}
              {...props}
            />
          </tr>
          <tr>
            <ItemDescribe {...props} />
          </tr>
          <tr className="transactions-row">
            <ItemTransactionsHistory formatValue={formatValue} {...props} />
          </tr>
        </tbody>
      </table>
    );
  }
}

const ItemTitle = (props) => {
  const { taernWikiUrl, name } = props.item;

  // podłączyć taern wili url
  return (
    <th>
      <div className="item-img">
        <img src={taernWikiUrl} />
      </div>
      <span>{name}</span>
    </th>
  );
};

class ItemInfo extends Component {
  render() {
    const { ranga, cenaRynkowaMin, cenaRynkowaMax } = this.props.item;
    const { formatTwoValues } = this.props;
    const { props } = this;
    const {
      esencjeBezInhibitora,
      esencjeZInhibitorem,
    } = this.props.infoORandze;

    return (
      <td>
        <ul className="itemInfo">
          <li>Ranga: {ranga}</li>
          <li>Esek bez inhibitora: {esencjeBezInhibitora}</li>
          <li>Esek z inhibitorem: {esencjeZInhibitorem}</li>
          <li>
            <MeltOptions {...props} />
          </li>
          <li>
            Cena rynkowa: {formatTwoValues(cenaRynkowaMin, cenaRynkowaMax)}
          </li>
        </ul>
      </td>
    );
  }
}

export default Item;
