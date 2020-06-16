import React, { Component } from 'react';
import '../../asserts/css/Change.css'
import {backendUrl} from "./Common";
import cookie from 'react-cookies'

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            flag:2,
            name:"",
            email:"",
            phone:"",
            token:"",
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
                    name:result.username,
                    phone:result.phone,
                    email:result.email,
                })
            },
            (error)=>{
                console.log(error);
            })
    }

    GetUsername=(e)=>{
        this.setState({
            name:e.target.value,
        })
    }

    GetEmail=(e)=>{
        this.setState({
            email:e.target.value,
        })
    }

    GetPhone=(e)=>{
        this.setState({
            phone:e.target.value,
        })
    }

    Submit=()=>{
        var flag = 0;
        //请求数据
        var email = /^([a-z0-9]+[\.\-_]?)*[a-z0-9]+@[a-z0-9]+[-_]?[a-z0-9]+(\.[a-z0-9]{2,3}){1,2}$/ig;
        if(this.state.name!=""){
            if(this.state.name.length<=4){
                alert("用户名必须超过4位!");
                flag = 1;
            }
        }
        if(this.state.email!=""){
            if(!email.test(this.state.email)){
                alert("邮箱地址不合法!");
                flag = 1;
            }
        }
        if(this.state.phone!=""){
            if(this.state.phone.length!=11){
                alert("电话号码不合法!");
                flag = 1;
            }
        }
        
        if(flag === 0){
            fetch(backendUrl+"user/profile/modify/",{
                method:"post",
                body:JSON.stringify(this.state),
                mode:"cors",
                credentials: 'include',
                headers:{
                    'sessionid':cookie.loadAll().sessionid,
                }
            })
                .then(res => res.json())
                .then((result)=>{
                    if(result.isSuccess){
                        alert("更改成功");
                    }else{
                        alert("更改失败");
                    }
                },
            (error)=>{
                console.log(error);
            })
        }
    }



    render() {
            return (
                <div>
                    <div className = "Change">
                        <form>
                            <input type = "text" placeholder = {this.state.name} ref = "name" onChange = {(e)=>this.GetUsername(e)}></input>
                            <input type = "text" placeholder = {this.state.email} ref = "email" onChange = {(e)=>this.GetEmail(e)}></input>
                            <input type = "text" placeholder = {this.state.phone} ref = "phone" onChange = {(e)=>this.GetPhone(e)}></input>
                        </form>
                        <button onClick = {this.ChangePassword}>
                            修改密码
                        </button>
                        <button onClick = {this.Submit}>
                            提交
                        </button>
                    </div>
                </div>
            );
    }
}

export default User;
