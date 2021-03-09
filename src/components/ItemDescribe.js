import React, { Component } from "react";

class ItemDescribe extends Component {
  state = {
    isOpen: false,
  };

  handleButtonClick = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  showDescribe = () => {
    const { isOpen } = this.state;
    const { dodatkowyOpis } = this.props.item;

    return isOpen ? <span className="new-line">{dodatkowyOpis}</span> : null;
  };

  render() {
    return (
      <td>
        <button className="item-describe-btn" onClick={this.handleButtonClick}>
          Dodatkowy opis:
        </button>
        {this.showDescribe()}
      </td>
    );
  }
}

export default ItemDescribe;
