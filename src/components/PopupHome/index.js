import React, { Component } from "react";
import { request } from "plugins/utils";

import { showToast } from "components/Toast";
import HomeHeader from "components/HomeHeader";
import PackageItem from "components/PackageItem";

import "./index.less";

class PopupHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      packages: [],
      packageList: [],
    };
  }

  getContent = async path => {
    const json = await request("/libraries.min.json");
    if (json) {
      this.setState({
        packages: json,
        packageList: json,
      }, () => {
        showToast("加载成功");
      })
    }
  };

  componentDidMount() {
    setTimeout(() => {
      this.getContent();
    }, 0);
  }

  onSearchChange = (val) => {
    const packages = this.state.packages;
    this.setState({
      packageList: packages.filter((item)=> {
        return item[0].indexOf(val) !== -1;
      })
    })
  }

  render() {
    const { packageList } = this.state;
    const { onPackageClick } = this.props;

    return (
      <div className="popup-home">
        <HomeHeader onSearchChange={this.onSearchChange}/>

        <div className="container">
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
        </div>
      </div>
    );
  }
}

export default PopupHome;