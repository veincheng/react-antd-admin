import React from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import globalConfig from '../../config';
import ajax from '../../utils/ajax';
import Logger from '../../utils/Logger';
import {Form,Input,Button,message} from 'antd';
import './index.less';
import {loginSuccessCreator} from '../../redux/Login.js';

const logger = Logger.getLogger('Login');

/**
 * 定义Login组件
 */
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

class Login extends React.PureComponent {

  // 这个login样式是直接从网上找的: https://colorlib.com/wp/html5-and-css3-login-forms/
  // 一般而言公司内部都会提供基于LDAP的统一登录, 用到这个登录组件的场景应该挺少的

  state = {
    username: '',  // 当前输入的用户名
    password: '',  // 当前输入的密码
    requesting: false, // 当前是否正在请求服务端接口
  };

  // controlled components

  handleUsernameInput = (e) => {
    this.setState({username: e.target.value});
  };

  handlePasswordInput = (e) => {
    this.setState({password: e.target.value});
  };

  /**
   * 处理表单的submit事件
   *
   * @param e
   */
  handleSubmit = async(value) => {  // async可以配合箭头函数
    const hide = message.loading('正在验证...', 0);
    console.log( value );

    // try {
    //   // 服务端验证
    //   const res = await ajax.login(username, password);
    //   hide();
    //   logger.debug('login validate return: result %o', res);

    //   if (res.success) {
    //     message.success('登录成功');
    //     // 如果登录成功, 触发一个loginSuccess的action, payload就是登录后的用户名
    //     this.props.handleLoginSuccess(res.data);
    //   } else {
    //     message.error(`登录失败: ${res.message}, 请联系管理员`);
    //     this.setState({requesting: false});
    //   }
    // } catch (exception) {
    //   hide();
    //   message.error(`网络请求出错: ${exception.message}`);
    //   logger.error('login error, %o', exception);
    //   this.setState({requesting: false});
    // }
    setTimeout( hide ,2000)
  };

  handleSubmitFailed = values =>{
    console.error( values )
  }

  render() {
    let widthStyle = {
      width:"400px"
    }
    // 整个组件被一个id="loginDIV"的div包围, 样式都设置到这个div中
    return (
      <div id="loginDIV" style={widthStyle}>
        
        <div className="login">
          <h1>{globalConfig.name}</h1>
          <Form 
          {...layout}
            name="login"
            onFinish={this.handleSubmit}
            onFinishFailed={this.handleSubmitFailed} >
            <Form.Item
              label="Username"
              name="Username"
              rules={[{required:true,message:"用户名"}]} >
              {/* this.handleUsernameInput  */}
              <Input/>
              </Form.Item>
              {/* onChange={this.handlePasswordInput} */}
            <Form.Item 
            rules={[{required:true,message:"密码"}]} 
            name="Password"
            label="Password">
                   <Input.Password/>
                   </Form.Item>
            <Form.Item
            {...tailLayout}>
            <Button type="primary" htmlType="submit" disabled={this.state.requesting}>
              登录
            </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }

}

const mapDispatchToProps = (dispatch) => {
  return {
    handleLoginSuccess: bindActionCreators(loginSuccessCreator, dispatch),
  };
};

// 不需要从state中获取什么, 所以传一个null
export default connect(null, mapDispatchToProps)(Login);
