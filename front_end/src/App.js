import React, {Component} from 'react';

//路由
import {BrowserRouter, Route,Switch} from 'react-router-dom';

//布局组件
import Main from './components/Main/index'
import LoginIn from './page/Users/LoginIn'
import Create from './page/Users/Create'
import {Login} from './page/supplies/pages/login/index'
import {Register} from './page/supplies/pages/register/index'
import {AdminLogin} from './page/supplies/pages/adminLogin/index'
import {HomeIndex} from './page/supplies/pages/home/index'
import {AdminHomeIndex} from './page/supplies/pages/adminHome/index'

import "./index.css";
import moment from "moment";
import "moment/locale/zh-cn";
import {post,get,put,postDownload} from "./page/supplies/ajax/index";
window.$post=post;
window.$get=get;
window.$put=put;
window.$baseurl="http://127.0.0.1:18080/"
window.$postDownload=postDownload
moment.locale("zh-cn");

class App extends Component {
	render() {
		return (
			<div >
			<BrowserRouter>
				<Switch>
					<Route exact path = "/" component = {Main}/>
					<Route path="/login" component={Login} />
					<Route path="/register" component={Register} />
					<Route path="/adminlogin" component={AdminLogin} />
					<Route path="/home" component={HomeIndex} />
					<Route path="/adminhome" component={AdminHomeIndex} />

					<Route exact path = '/LoginIn' component = {LoginIn}/>
					<Route exact path = "/Create" component = {Create}/>
					<Route path = "/ESS" component = {Main}/>
				</Switch>
			</BrowserRouter>
			</div>
		);
	}
}
export default App;
