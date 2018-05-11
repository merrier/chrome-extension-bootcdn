import React from 'react';
import { render } from 'react-dom';

import './index.less'

class Toast extends React.Component {
  state = {
    content: this.props.content,
    isShow: false,
  }

  toastStateChange = () => {
    const that = this
    const delay = that.props.delay || 2000

    setTimeout(function() {
      that.setState({
        isShow: true,
      })
    }, 100)

    setTimeout(function() {
      that.setState({
        isShow: false,
      })
    }, delay)
  }

  componentDidMount() {
    const that = this

    if (that.props.content.length !== 0) {
      that.toastStateChange()
    }
  }

  render() {
    const { state: s } = this

    const toastClassNames = s.isShow
      ? 'toast-container toast-container-show'
      : 'toast-container'

    return (
      <div className={toastClassNames}>
        <div className="toast-main">
          <div className="toast-content">{s.content}</div>
        </div>
      </div>
    )
  }
}

export function showToast(content, timeout = 2000) {
  const div = document.createElement('div')
  document.body.appendChild(div)
  render(<Toast content={content} delay={timeout} />, div)
  setTimeout(() => div.remove(), timeout + 200)
}
