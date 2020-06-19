import React, { Component } from 'react';
import { Button, Comment, Tooltip, Avatar,List } from 'antd';
import moment from 'moment';
import '../../asserts/css/News.css'


class News extends Component {
    constructor(props) {
        super(props);
        this.state = {
            news:"新闻",
            comment:[
                {user:"",com:""},
                {user:"",com:""},
                {user:"",com:""},
                {user:"",com:""},
            ],

        };
    }

    componentDidMount=()=>{
        fetch('https://127.0.0.1:8000/NewsList/'+this.props.location.state.params+'/',{
            method:"post",
            body:JSON.stringify(this.props.location.state.title),
            mode:"cors",
            credentials:"include",
            headers:{
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
    }

    update=()=>{
        console.log(this.props.location.state);
    }

    render() {
        return (
            <div>
                <div className = "News">
                    {this.state.news}
                </div>
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
                
            </div>
        );
    }
}

export default News;
