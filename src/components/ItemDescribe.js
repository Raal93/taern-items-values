import React, { Component } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

class ItemDescribe extends Component {
  state = {
    isOpen: false,
  };

  handleButtonClick = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  render() {
    const { isOpen } = this.state;
    const { dodatkowyOpis } = this.props.item;

    return (
      <td>
        <button className="item-describe-btn" onClick={this.handleButtonClick}>
          <div className="button_describe">Dodatkowy opis: </div>
          <div className="button_icon">
            {isOpen ? <FaAngleUp /> : <FaAngleDown />}
          </div>
        </button>
        {isOpen ? (
          <span className="item-describe">
            {dodatkowyOpis === "" ? (
              <span className="item-describe">
                Ten opis jeszcze nie powstał.
              </span>
            ) : (
              dodatkowyOpis
            )}
          </span>
        ) : null}
      </td>
    );
  }
}

export default ItemDescribe;
