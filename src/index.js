/**
 * 程序的入口, 类似java中的main
 */
import {ConfigProvider} from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import {BrowserRouter as Router, Route,Link} from 'react-router-dom';
import './utils/index.js';  // 引入各种prototype辅助方法
import store from './redux/store.js';  // redux store

// 开始引入各种自定义的组件
import App from './components/App';
import Welcome from './components/Welcome';
import Error from './components/Error';
import Hello from './components/Hello';
//import DBTable from './components/DBTable';

// 将DBTable组件做成动态路由, 减小bundle size
// 注意不要再import DBTable了, 不然就没意义了
// 一些比较大/不常用的组件, 都可以考虑做成动态路由
// const DBTableContainer = (location, cb) => {
//   return import(/* webpackChunkName: "DBTable" */'./components/DBTable');
// };

// 路由表, 只要menu.js中所有的叶子节点配置了路由就可以了
// 我本来想根据menu.js自动生成路由表, 但那样太不灵活了, 还是自己配置好些
const routes = (
  <Provider store={store}>
    <ConfigProvider locale={zhCN}>
    <Router>
      
      <Route path="/" component={Hello}>
        <Route exact path="/" component={Welcome}/>
        <Route exact path="/test" component={Welcome}/>

        {/* <Route path="index">
          <Route path="option1" tableName="test" getComponent={DBTableContainer}/>
          <Route path="option2" tableName="testSms" getComponent={DBTableContainer}/>
          <Route path="option3" tableName="testAction" getComponent={DBTableContainer}/>
        </Route> */}

        {/* <Route exact path="/daohang">
          <Route path="555" component={Hello}/>
          <Route path="sanji">
            <Route path="666" component={Hello}/>
            <Route path="777" component={Hello}/>
            <Route path="888" component={Hello}/>
            <Route path="999" component={Hello}/>
          </Route>
        </Route>

        <Route path="headerMenu4" component={Hello}/>
        <Route path="alone" component={Hello}/>
        <Route path="alone2" component={Hello}/> */}

        <Route path="*" component={Error}/>

      </Route>
      
      <Route path="/welcome" component={Welcome}></Route>
    </Router>
  </ConfigProvider>
  </Provider>
);

ReactDOM.render(routes, document.getElementById('root'));
