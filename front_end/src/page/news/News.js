import React, { Component } from 'react';
import { Button, Comment, Tooltip, Avatar,List,Input } from 'antd';
import moment from 'moment';
import '../../asserts/css/News.css'
import Navi from '../../components/Menu/Navigator';
import Logo from '../../asserts/logo.jpg';
import '../../components/Menu/Menu.css';

const { TextArea } = Input;

var user="doggy";
var data = {user:user,com:""};

class News extends Component {
    constructor(props) {
        super(props);
        this.state = {
            news:"新闻",
            comment:[
            ],

        };
    }

    componentDidMount=()=>{
        fetch('https://127.0.0.1:8000/NewsList/'+this.props.location.state.params+'/',{
            method:"post",
            body:JSON.stringify(this.props.location.state.num),
            mode:"cors",
            credentials:"include",
            headers:{
                'User':this.state.result,
            }
        })
            .then(res => res.json())
            .then((result)=>{
                this.setState({
                    news:result,
                })
            },
            (error)=>{
                console.log(error);
            })
    }

    update=()=>{
        console.log(this.props.location.state);
    }

    loadComment=(e)=>{
        data.com = e.target.value;
    }

    addComment=()=>{
        this.setState({
            comment:[...this.state.comment,data],
        })
        console.log(this.state.comment);
    }

    render() {
        return (
            <div className = "News">
                <div className = "header">
                        <img class = "logo" src = {Logo} alt="校徽" />
                        <div class ="title"> 疫情管控系统 </div>
                        <div style = {{alignSelf:'flex-end'}}> <Navi /> </div>
                </div>
                <div id = "new">
                    {this.state.news}
                </div>
                <div id = "list">
                    <List
                        bordered
                        dataSource = {this.state.comment}
                        renderItem = {item=>(
                            <List.Item>
                                <List.Item.Meta
                                    title = {<a>{item.user}</a>}
                                    description={<a>{item.com}</a>}>
                                </List.Item.Meta>
                            </List.Item>
                        )}>
                    </List>
                </div>
                <div id = "comment">
                    <TextArea rows={4} placeholder = "请输入评论" id = "cinput" onChange = {(e)=>{this.loadComment(e)}}>
                    </TextArea>
                    <Button type = "primary" onClick = {this.addComment}>提交</Button>
                </div>
            </div>
        );
    }
}

export default News;
