import React, { Component } from "react";
import { request } from "plugins/utils";

import { showToast } from "components/Toast";
import PackageItem from "components/PackageItem";

import "./index.less";

class HomeHeader extends Component {
  constructor(props) {
    super(props);
  }

  onKeywordChange = (e) => {
    const val = e.target.value;
    this.props.onSearchChange(val);
  }

  render() {

    return (
      <div className="header">
        <h1>BootCDN</h1>

        <div className="search-wrapper" role="search">
          <input
            className="search"
            placeholder="搜索开源库，例如：jquery"
            tabIndex="0"
            onChange={e => this.onKeywordChange(e)}
          />
          <i className="fa fa-search" />
        </div>
      </div>
    );
  }
}

export default HomeHeader;