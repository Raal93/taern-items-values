import React, { Component } from "react";
import ItemTransactionsHistory from "./ItemTransactionsHistory.js";
import ItemDescribe from "./ItemDescribe.js";
import MeltOptions from "./MeltOptions.js";

class Item extends Component {
  convert = (value) => {
    return value < 1000000 ? value / 1000 + "k" : value / 1000000 + "kk";
  };

  convertTwo = (value1, value2) => {
    if (value1 === value2) {
      return this.convert(value1);
    } else {
      return this.convert(value1) + " - " + this.convert(value2);
    }
  };

  render() {
    const { convert, convertTwo, props } = this;

    return (
      <table className="item">
        <tbody>
          <tr>
            <ItemTitle {...props} />
          </tr>
          <tr>
            <ItemInfo convert={convert} convertTwo={convertTwo} {...props} />
          </tr>
          <tr>
            <ItemDescribe {...props} />
          </tr>
          <tr className="transactions-row">
            <ItemTransactionsHistory convert={convert} {...props} />
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
  // componentDidMount() {
  //   getEssencesInfo(this.props.item.ranga);
  // }

  render() {
    const { ranga, cenaRynkowaMin, cenaRynkowaMax } = this.props.item;
    const { convertTwo } = this.props;
    const { props } = this;
    const {
      esencjeBezInhibitora,
      esencjeZInhibitorem,
    } = this.props.infoORandze;

    return (
      <td>
        <ul className="itemInfo">
          {/* pozminiać by korzystało z infoORandze */}
          <li>Ranga: {ranga}</li>
          <li>Esek bez inhibitora: {esencjeBezInhibitora}</li>
          <li>Esek z inhibitorem: {esencjeZInhibitorem}</li>
          <li>
            <MeltOptions {...props} />
          </li>
          <li>Cena rynkowa: {convertTwo(cenaRynkowaMin, cenaRynkowaMax)}</li>
        </ul>
      </td>
    );
  }
}

export default Item;
