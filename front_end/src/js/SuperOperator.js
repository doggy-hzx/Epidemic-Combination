import React, { Component } from 'react';
import { BrowserRouter as Router, Route ,Redirect } from 'react-router-dom';
import Title from './Title';
import {backendUrl} from "./Common";
import cookie from 'react-cookies'

class SuperOperator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            flag:1,
            news:"",
            travel:"",
            check:"",
            object:"",
            back_to_work:"",
        };
    }

    Submit=()=>{

        this.setState({
            news:this.refs.news.value,
            travel:this.refs.travel.value,
            check:this.refs.check.value,
            object:this.refs.object.value,
            back_to_work:this.refs.back_to_work.value,
        })

        //请求数据
        fetch(backendUrl+"user/auth/authorization",{
            method:"post",
            body:JSON.stringify(this.state),
            headers:{
                'content-type': 'application/json',
                'sessionid':cookie.loadAll().sessionid,
                
            },
            mode:"cors",
            credentials: 'include',
        })
            .then(res => res.json())
            .then((result)=>{
                //返回bool值判断是否更改
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

    Back=()=>{
        this.setState({
            flag:0,
        })
    }

    render() {
        if(this.state.flag === 1){
            return (
                <div className = "SuperOperator">
                    <Title></Title>
                    <form>
                        <div>
                            <input type = "text" placeholder = "新闻系统管理员id" refs = "news"></input>
                            <input type = "text" placeholder = "同城交通管理员id" refs = "travel"></input>
                        </div>
                        <div>
                            <input type = "text" placeholder = "病例检测管理员id" refs = "check"></input>
                            <input type = "text" placeholder = "物资申领管理员id" refs = "object"></input>
                        </div>
                        <div>
                            <input type = "text" placeholder = "复工人口管理员id" refs = "back_to_work"></input>
                        </div>
                    </form>
                    <button>
                        提交
                    </button>
                    <button onClick = {this.Back}>
                        返回首页
                    </button>
                </div>
            );
        }else if(this.state.flag === 0){
            return <Redirect to = {{pathname:'/'}} />
        }
        
    }
}

export default SuperOperator;
