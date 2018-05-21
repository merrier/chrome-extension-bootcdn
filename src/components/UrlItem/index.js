import React, { Component } from "react";
import clipboard from 'clipboard-polyfill';

import { showToast } from "components/Toast";

import "./index.less";

class UrlItem extends Component {
    constructor(props) {
      super(props);
      this.state = {
            dev: false,
            url: props.url,
            version: props.version,
            isShow: false,
      }
    }

    // 控制是否显示按钮
    toggleShow = show => {
        const { dev, isShow } = this.state;
        if (dev) {
            this.setState({ isShow: true });
        } else {
            if (isShow !== show) {
                this.setState({
                    isShow: show,
                });
            }
        }
    }

    // 复制link标签
    onCopyLink = (url) => {
        clipboard.writeText(`<script src="${url}"></script>`).then(function(){
            showToast('已复制！')
        });
    }

    // 复制链接
    onCopyUrl = (url) => {
        clipboard.writeText(url).then(function(){
            showToast('已复制！')
        });
    }

    render() {
        const {url, isShow, version} = this.state;
        const cx = isShow ? 'operation-box active' : 'operation-box';

        return (
            <div className='url-item-container' onMouseMove={this.toggleShow.bind(this, true)} onMouseLeave={this.toggleShow.bind(this, false)}>
                <p className='url'>{url}</p>
                <div className={cx}>
                    <a className='btn btn-copy-link' onClick={this.onCopyLink.bind(this, url)}><i className='fa fa-code' />{`复制<script>标签`}</a>
                    <a className='btn btn-copy-url' onClick={this.onCopyUrl.bind(this, url)}><i className='fa fa-link' />复制链接</a>
                </div>
            </div>
        )
    }

}

export default UrlItem;