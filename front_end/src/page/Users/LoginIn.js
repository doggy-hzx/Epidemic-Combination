import React, { Component } from 'react';
import { BrowserRouter as Router, Route ,Redirect } from 'react-router-dom';
import '../../asserts/css/App.css';
import '../../asserts/css/Logo.css';
import '../../asserts/css/Info.css';
import Title from './Title';
import {backendUrl} from "./Common";
import cookie from 'react-cookies'
var storage=window.localStorage;

class LoginIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            flag:1,
            username:"",
            password:"",
            isLogin:false,
        };
    }

    GetUsername=(e)=>{
        this.setState({
            username:e.target.value,
        })
    }

    GetCode=(e)=>{
        this.setState({
            password:e.target.value,
        })
    }

    AppData=()=>{
        fetch(backendUrl+"user/login/post/",{
            method:"post",
            mode:"cors",
            body:JSON.stringify(this.state),
            credentials: 'include',
        })
            .then(res => res.json())
            .then((result)=>{
                this.setState({
                    isLogin:result.isSuccess,
                })

                if(this.state.isLogin) {
               
                    storage.setItem("sessionid",result.session_id);
                    storage.setItem("username",this.state.username);
                    console.log(storage.getItem("sessionid"));
                    console.log(storage.getItem("username"))
                    // for 用户登录子系统
                    cookie.save('sessionid',result.session_id);
                    cookie.save('username',this.state.username);

                    alert(result.message);
                    this.setState({
                        flag : 3,
                    })
            }
               
            },
        (error)=>{
            console.log(error);
        })

    }

    Back=()=>{
        this.setState({
            flag:0,
        })
    }

    render(){
        if(this.state.flag === 1){
            return (
                <div>
                    <Title></Title>
                    <div className = "Logo_Login" style={{float:'left'}}>
                    </div>
                    <div className = "Info_Login" style={{float:'left'}}>
                        <div>
                            <form>
                                <div>
                                     <input id = "text" type = "text" name = "用户名" placeholder = "用户名" ref = "name" onChange = {(e)=>this.GetUsername(e)}/>
                                </div>
                                <div>
                                    <div>
                                        <input id = "text" type = "password" name = "密码" placeholder = "密码" ref = "code" onChange = {(e)=>this.GetCode(e)}/>
                                    </div>
                                </div>
                            </form>
                            <div>
                                <button onClick = {this.AppData}>
                                    登录
                                </button>
                            </div>
                            <div>
                                <button onClick = {this.Back}>
                                    返回
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }else if(this.state.flag === 0){

            return <Redirect to = {{pathname:'/ESS/situation'}} />
        }else if(this.state.flag === 3){
            return <Redirect to = {{pathname:'/ESS/situation'}}/>
        }
    }
}

export default LoginIn;