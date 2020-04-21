import React from 'react';
import {FrownOutlined} from '@ant-design/icons';
import './index.scss';

/**
 * 显示错误信息
 * 可以当404页来用
 */
class Error extends React.PureComponent {
  render() {
    console.log("enter error js")
    return (
      <div className="not-found">
        <div style={{ fontSize:32 }}><FrownOutlined/></div>
        <h1>{this.props.errorMsg || '404 Not Found'}</h1>
      </div>
    );
  }

}

export default Error;
