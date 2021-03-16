import { Component } from "react";
import Item from "./Item.js";
import { essencesData } from "./Data.js";

class Boss extends Component {
  render() {
    const { essencesInfo } = essencesData;
    const { bosses } = this.props;
    const { props } = this;

    return bosses.map((boss, index) => {
      const { iconSrc, taernWikiUrl, name } = boss;

      return (
        <div className="container bossContainer" key={index}>
          <div className="row">
            <div className="col-2 bossInfo">
              <div>
                <img src={iconSrc} />
                <span>
                  <a href={taernWikiUrl} target="_blank">
                    <strong>{name}</strong>
                  </a>
                </span>
              </div>
            </div>
            <div className="col-10 bossItems">
              <div className="row">
                {boss.items.map((item, index) => {
                  let infoORandze;
                  // prawdopodobnie można zoptymalizować używając innej metody niż map
                  essencesInfo.map((rangaInfo) => {
                    if (rangaInfo[0] === item.ranga) {
                      infoORandze = rangaInfo[1];
                    }
                  });

                  return (
                    <Item
                      key={index}
                      item={item}
                      infoORandze={infoORandze}
                      {...props}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      );
    });
  }
}

export default Boss;
