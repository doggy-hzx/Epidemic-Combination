import React, { Component } from 'react';
import { List, Typography, Divider, Tabs, Button,Input} from 'antd';
import '../../asserts/css/NewMain.css';
import '../../asserts/css/CreateNews.css'
import '../../asserts/css/News.css'
import Navi from '../../components/Menu/Navigator';
import cookie from 'react-cookies'
import Logo from '../../asserts/logo.jpg';
const { TabPane } = Tabs;
const { TextArea } = Input;


var update = {
    title:"",
    text:"",
    group:"",
    num:"",
};

var block = "";

class NewsOperator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data_1:[
            ],
            data_2:[
            ],
            data_3:[
            ],
            result:"",
        };
    }

    componentDidMount=()=>{
        fetch("https://127.0.0.1:8000/"+"user/profile/",{
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
                    result:result,
                })
            },
            (error)=>{
                console.log(error);
            })

        fetch('https://127.0.0.1:8000/NewsList/proccess',{
            method:"get",
            mode:"cors",
            credentials:"include",
            header:{
                'User':this.state.result,
            }
        })
            .then(res => res.json())
            .then((result)=>{
                this.setState({
                    data_1:result.news,
                })
            },
            (error)=>{
                console.log(error);
            })


        fetch('https://127.0.0.1:8000/NewsList/knowledge',{
            method:"get",
            mode:"cors",
            credentials:"include",
            header:{
                'User':this.state.result,
            }
        })
            .then(res => res.json())
            .then((result)=>{
                this.setState({
                    data_2:result.news,
                })
            },
            (error)=>{
                console.log(error);
            })

        
        fetch('https://127.0.0.1:8000/NewsList/newest',{
            method:"get",
            mode:"cors",
            credentials:"include",
            header:{
                'User':this.state.result,
            }
        })
            .then(res => res.json())
            .then((result)=>{
                this.setState({
                    data_3:result.news,
                })
            },
            (error)=>{
                console.log(error);
            })

    }


    loadTitle=(e)=>{
        update.title = e.target.value;
    }


    loadText=(e)=>{
        update.text = e.target.value;
    }


    Delect=(num)=>{
        fetch('https://127.0.0.1:8000/NewsList/Delnews',{
                method:"post",
                mode:"cors",
                credentials:"include",
                body:JSON.stringify(num),
                header:{
                    'User':this.state.result,
                }
            })
                .then(res => res.json())
                .then((result)=>{
                    this.setState({
                        data_1:result.news_1,
                        data_2:result.news_2,
                        data_3:result.news_3,
                    })
                },
                (error)=>{
                    console.log(error);
                })
    }

    loadBlock=(e)=>{
        block = e.target.value;
    }


    Update=()=>{
        if(block === "防疫进展"){
            update.group = "proccess";
            fetch('http://127.0.0.1:8000/NewsList/PublishNews',{
                method:"post",
                mode:"cors",
                credentials:"include",
                body:JSON.stringify(update.group),
                header:{
                    'User':this.state.result,
                }
            })
                .then(res => res.json())
                .then((result)=>{
                    this.setState({
                        data_1:result.news_1,
                        data_2:result.news_2,
                        data_3:result.news_3,
                    })
                },
                (error)=>{
                    console.log(error);
                })
        }else if(block === "防疫知识"){
            update.group = "knowledge";
            fetch('http://127.0.0.1:8000/NewsList/PublishNews',{
                method:"post",
                mode:"cors",
                credentials:"include",
                body:JSON.stringify(update.group),
                header:{
                    'User':this.state.result,
                }
            })
                .then(res => res.json())
                .then((result)=>{
                    this.setState({
                        data_1:result.news_1,
                        data_2:result.news_2,
                        data_3:result.news_3,
                    })
                },
                (error)=>{
                    console.log(error);
                })
        }else if(block === "最新情况"){
            update.group = "newest";
            fetch('http://127.0.0.1:8000/NewsList/PublishNews',{
                method:"post",
                mode:"cors",
                credentials:"include",
                body:JSON.stringify(update.group),
                header:{
                    'User':this.state.result,
                }
            })
                .then(res => res.json())
                .then((result)=>{
                    this.setState({
                        data_1:result.news_1,
                        data_2:result.news_2,
                        data_3:result.news_3,
                    })
                },
                (error)=>{
                    console.log(error);
                })
        }
    }


    render() {
        return (
            <div>
                <div className = "header">
                        <img class = "logo" src = {Logo} alt="校徽" />
                        <div class ="title"> 疫情管控系统 </div>
                        <div style = {{alignSelf:'flex-end'}}> <Navi /> </div>
                </div>
                <div className = "NewMain">
                    <Tabs defaultActiveKey="1" id = "tabs">
                        <TabPane tab = "防疫进展" key = "1">
                            <List
                                id = "list"
                                bordered
                                dataSource = {this.state.data_1}
                                renderItem = {item=>(
                                    <List.Item>
                                        <List.Item.Meta
                                            title = {<a>{item.title}</a>}>
                                        </List.Item.Meta>
                                        <Button type = "primary" onClick = {(e)=>{this.Delect(item.num)}}>删除</Button>
                                    </List.Item>
                                )}>
                            </List>
                        </TabPane>
                        <TabPane tab = "防疫知识" key = "2">
                            <List
                                id = "list"
                                bordered
                                dataSource = {this.state.data_2}
                                renderItem = {item=>(
                                    <List.Item>
                                        <List.Item.Meta
                                            title = {<a>{item.title}</a>}>
                                        </List.Item.Meta>
                                        <Button type = "primary" onClick = {(e)=>{this.Delect(item.num)}}>删除</Button>
                                    </List.Item>
                                )}>
                            </List>
                        </TabPane>
                        <TabPane tab = "最新情况" key = "3">
                            <List
                                id = "list"
                                bordered
                                dataSource = {this.state.data_3}
                                renderItem = {item=>(
                                    <List.Item>
                                        <List.Item.Meta
                                            title = {<a>{item.title}</a>}>
                                        </List.Item.Meta>
                                        <Button type = "primary" onClick = {(e)=>{this.Delect(item.num)}}>删除</Button>
                                    </List.Item>
                                )}>
                            </List>
                        </TabPane>
                    </Tabs>
                </div>
                <div className = "CreateNews">
                    <TextArea rows={1} placeholder = "请输入新闻标题" id = "cinput" onChange = {(e)=>{this.loadTitle(e)}}>
                    </TextArea>
                    <TextArea rows={1} placeholder = "请输入新闻模块" id = "cinput" onChange = {(e)=>{this.loadBlock(e)}}>
                    </TextArea>
                    <TextArea rows={4} placeholder = "请输入新闻主体" id = "cinput" onChange = {(e)=>{this.loadText(e)}}>
                    </TextArea>
                    <Button type = "primary" onClick = {this.Update}>提交</Button>
                </div>
            </div>
        );
    }
}

export default NewsOperator;
