import React, { Component } from "react";

import "./index.less";

class PackageItem extends Component {
    constructor(props) {
      super(props);
      this.state = {
          showDesc: false,
      }
    }

    toggleDesc = (e) => {
        e.stopPropagation();
        this.setState({
            showDesc: !this.state.showDesc,
        })
    }

    render() {

        const {showDesc} = this.state;
        const {info, onPackageClick} = this.props;
        const name = info[0];
        const desc = info[1];
        const star = info[2];

        const iconClassName = showDesc ? 'fa fa-minus-square-o' : 'fa fa-plus-square-o';

        return (
            <div className='package-item-container'>
                <a href="javascript:void(0);" className="package-main" onClick={onPackageClick.bind(null, name)}>
                  <span className="package-btn">
                    <i className={iconClassName} onClick={this.toggleDesc}/>
                  </span>
                  <h4 className="package-name">{name}</h4>
                  <span className="package-star">
                    <i className="fa fa-star" /> {star}
                  </span>
                </a>
                {showDesc && <p className="package-description">{desc}</p>}
            </div>
        )
    }

}

export default PackageItem;