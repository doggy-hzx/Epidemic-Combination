import React, { Component } from 'react';
import '../../asserts/css/User.css';
import {backendUrl} from "./Common";
import cookie from 'react-cookies'

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            flag:1,
            username:"",
            phone:"",
            email:"",
            real_name:"",
        };
    }

    componentDidMount(){
        fetch(backendUrl+"user/profile/",{
            method:"get",
            mode:"cors",
            credentials:"include",
            headers:{
                'sessionid':cookie.loadAll().sessionid,
            }
        })
            .then(res => res.json())
            .then((result)=>{
                this.setState({
                    username:result.username,
                    phone:result.phone,
                    email:result.email,
                    real_name:result.real_name,
                })
            },
            (error)=>{
                console.log(error);
            })
    }

    Out=()=>{
        cookie.save('username','');
        this.setState({
            flag:0,
        })
    }

    render() {

            return (
                <div>
                    <div className = "User">
                        <div id = "Info">
                            <a>
                                <text>电话</text>
                                <text>{this.state.phone}</text>
                            </a>
                            <a>
                                <text>邮箱</text>
                                <text>{this.state.email}</text>
                            </a>
                            <a>
                                <text>真实姓名</text>
                                <text>{this.state.real_name}</text>
                            </a>
                        </div>
                    </div>
                </div>
            );
    }
}

export default User;
