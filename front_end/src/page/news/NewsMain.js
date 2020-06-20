import React, { Component } from 'react';
import Logo from '../../asserts/logo.jpg';
import Img from '../../asserts/image/logo.svg';
import '../../asserts/css/NewMain.css'
import { List, Typography, Divider, Tabs} from 'antd';
import { BrowserRouter as Router, Route ,Redirect } from 'react-router-dom';
import cookie from 'react-cookies'

const { TabPane } = Tabs;

var update = {
    num:"",
    params:"",
};

class NewsMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data_1:[
                {title:'title',num:1}
            ],
            data_2:[

            ],
            data_3:[

            ],
            flag:0,
            result:"",
        };
    }

    componentDidMount(){
        
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

        fetch('http://127.0.0.1:8000/news/NewsList/process',{
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


        fetch('http://127.0.0.1:8000/news/NewsList/knowledges',{
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

        
        fetch('http://127.0.0.1:8000/news/NewsList/newest',{
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

    test=(e,params)=>{
        update.num = e.num;
        update.params = params;
        this.setState({
            flag:1,
        })
    }

    render() {
        if(this.state.flag === 0){
            return (
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
                                            title = {<a>{item.title}</a>}
                                            onClick = {()=>this.test(item,"process")}>
                                        </List.Item.Meta>
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
                                            title = {<a>{item.title}</a>}
                                            onClick = {()=>this.test(item,"knowledge")}>
                                        </List.Item.Meta>
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
                                            title = {<a>{item.title}</a>}
                                            onClick = {()=>this.test(item,"newest")}>
                                        </List.Item.Meta>
                                    </List.Item>
                                )}>
                            </List>
                        </TabPane>
                    </Tabs>
                    <div id = "img">
                        <img src = {Logo}></img>
                    </div>
                </div>
            );
        }else{
            return <Redirect to = {{
                pathname:'/News',
                state: update,
            }} />
        }
    }
}

export default NewsMain;
