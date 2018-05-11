import React, { Component } from "react";
import { request } from "plugins/utils";

import { showToast } from "components/Toast";
import PackageItem from "components/PackageItem";

import "./index.less";

class PopupHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      packageList: []
    };
  }

  getContent = async path => {
    const json = await request("/libraries.min.json");
    // console.log("json", json);
    if (json) {
      this.setState({
        packageList: json,
      }, () => {
        showToast("加载成功:)");
      })
    }
  };

  componentWillMount() {
    this.getContent();
  }

  render() {
    const { packageList } = this.state;
    const { onPackageClick } = this.props;

    return (
      <div className="popup-home">
        <div className="header">
          <h1>BootCDN</h1>

          <div className="search-wrapper" role="search">
            <input
              className="search"
              placeholder="搜索开源库，例如：jquery"
              tabIndex="0"
            />
            <i className="fa fa-search" />
          </div>
        </div>

        <div className="container">
          {packageList.length !== 0 ? (
            <ul className="package-list" id="package-list">
              { packageList.map((item, index) => {
                return(
                  <li key={item[0]} className="package-item">
                    <PackageItem info={item} onPackageClick={onPackageClick}/>
                  </li>
                );
              })
              }
            </ul>
          ) : null}
        </div>
      </div>
    );
  }
}

export default PopupHome;