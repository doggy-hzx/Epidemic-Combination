import React, { Component } from 'react';
import { Button, Comment, Tooltip, Avatar,List,Input } from 'antd';
import moment from 'moment';
import '../../asserts/css/News.css'
import Menu from '../../components/Menu/Menu';
import cookie from 'react-cookies'


const { TextArea } = Input;

var user="doggy";
var data = {user:user,com:"",num:""};

class News extends Component {
    constructor(props) {
        super(props);
        this.state = {
            result:{
                news:"新闻",
                cmts:[
                    {user:"111",com:"11"}
                ],
                title:"标题",
                num:""
            },
            resultUser:""
        };
    }

    componentDidMount=()=>{

        fetch("http://127.0.0.1:8000/"+"user/profile/",{
            method:"get",
            mode:"cors",
            credentials:"include",
            headers:{
                'sessionid':cookie.loadAll().sessionid,
            }
        })
            .then(res => res.json())
            .then((result)=>{
                console.log(result);
                this.setState({
                    resultUser:result,
                })
            },
            (error)=>{
                console.log(error);
            })

        fetch("http://127.0.0.1:8000/news/Newsdetails",{
            method:"post",
            body:JSON.stringify(this.props.location.state),
            mode:"cors",
            credentials:"include",
            headers:{
                'User':this.state.resultUser,
            }
        })
            .then(res => res.json())
            .then((result)=>{
                this.setState({
                    result:result,
                })
                console.log(this.state.result);
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
        data.user = this.state.resultUser.username;
        data.num = this.props.location.state.num;
        fetch('http://127.0.0.1:8000/Newscomment',{
            method:"post",
            body:JSON.stringify(data),
            mode:"cors",
            credentials:"include",
            headers:{
                'User':this.state.result,
            }
        })
            .then(res => res.json())
            .then((result)=>{
                this.setState({
                    result:result,
                })
            },
            (error)=>{
                console.log(error);
            })
    }

    render() {
        return (
            <div className = "News">
                <Menu></Menu>
                <div id = "new">
                    {this.state.result.title}
                </div>
                <div id = "new">
                    {this.state.result.news}
                </div>
                <div id = "list">
                    <List
                        bordered
                        dataSource = {this.state.result.cmts}
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
