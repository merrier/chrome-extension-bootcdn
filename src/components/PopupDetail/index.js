import React, {Component} from 'react';
import { request } from "plugins/utils";

import { showToast } from "components/Toast";
import UrlItem from 'components/UrlItem';
import './index.less';

class PopupDetail extends Component {
    constructor (props) {
        super(props);
        this.state = {
            detail: {},
            activeIndex: 0,
        }
    }

    getDetail = async () => {
        const {packageName} = this.props;
        const json = await request(`/libraries/${packageName}.json`);
        if (json) {
          this.setState({
            detail: json,
          }, () => {
            showToast("加载成功:)");
          })
        }
    };

    componentDidMount () {
        this.getDetail();
    }

    onVersionChange = (index) => {
        this.setState({
            activeIndex: index,
        })
    }

    render () {
        const {packageName} = this.props;
        const {detail, activeIndex} = this.state;

        return (
            <div className='popup-detail-wrapper'>
                { JSON.stringify(detail) === '{}' ? (
                    <div className='popup-detail loading'>加载中...</div>
                ) : (
                <div className='popup-detail'>
                    <div className='detail-header'>
                        <a className='btn-return' href='javascript:void(0);' onClick={this.props.returnToHome}><i className="fa fa-angle-double-left" />返回</a>
                        <h3 className='package-name'>{packageName}</h3>
                        <div className='package-detail-wrapper'><p className='package-detail'>{detail.description || ''}</p></div>
                        <div className='package-link'>
                            {detail.homepage && <a className='btn btn-home' href={detail.homepage} target='_blank' rel='noopener noreferrer'><i className="fa fa-home" />首页</a>}
                            {detail.repository && detail.repository.url && <a className='btn btn-repo'href={detail.repository.url} target='_blank' rel='noopener noreferrer'><i className="fa fa-github" />源码</a>}
                        </div>
                    </div>
                    <div className='detail-versions'>
                        <ul className='version-list'>
                            { detail.assets.map((item, index) => {
                                return (<li key={item.version} className='version-item' onClick={this.onVersionChange.bind(this, index)}>{item.version}</li>)
                            })
                            }
                        </ul>
                        <ul className='document-list'>
                            { detail.assets[activeIndex].files.map((item, index) => {
                                const version = detail.assets[activeIndex].version;
                                console.log('version', version);
                                const url = '//cdn.bootcss.com/' + packageName + '/' + version + '/' + item;
                                console.log('url', url);
                                return (
                                    <li key={`${version}${item}`} className='document-item'>
                                        <UrlItem url={url} version={version}/>
                                    </li>
                                );
                            })
                            }
                            
                        </ul>
                    </div>
                </div>
                )}
            </div>
        )
    }
}

export default PopupDetail;