import React, { Component } from 'react';
import { List, Typography, Divider, Tabs, Button,Input} from 'antd';
import '../../asserts/css/NewMain.css';
import '../../asserts/css/CreateNews.css'
const { TabPane } = Tabs;
const { TextArea } = Input;


var update = {
    title:"",
    num:"",
    text:"",
};

var block = "";

class NewsOperator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data_1:[
                {title:'新闻一',num:1,text:''},
                {title:'新闻二',num:2,text:''},
                {title:'新闻三',num:3,text:''},
            ],
            data_2:[
                {title:'新闻一',num:1,text:''},
                {title:'新闻二',num:2,text:''},
                {title:'新闻三',num:3,text:''},
            ],
            data_3:[
                {title:'新闻一',num:1,text:''},
                {title:'新闻二',num:2,text:''},
                {title:'新闻三',num:3,text:''},
            ],
        };
    }


    loadTitle=(e)=>{
        update.title = e.target.value;
    }


    loadText=(e)=>{
        update.text = e.target.value;
    }


    Delect=(block,num)=>{
        if(block === 1){
            var New = this.state.data_1;

            New.splice(num - 1,1);

            for(var i = num - 1;i<New.length;i++){
                New[i].num--;
            }

            this.setState({
                data_1:New,
            })
        }else if(block === 2){
            var New = this.state.data_2;

            New.splice(num-1,1);

            for(var i = num - 1;i<New.length;i++){
                New[i].num--;
            }

            this.setState({
                data_2:New,
            })
        }else{
            var New = this.state.data_3;

            New.splice(num-1,1);

            for(var i = num - 1;i<New.length;i++){
                New[i].num--;
            }

            this.setState({
                data_3:New,
            })
        }

    }

    loadBlock=(e)=>{
        block = e.target.value;
    }


    Update=()=>{
        if(block === "防疫进展"){
            update.num = this.state.data_1.length + 1;
            console.log(update);
            this.setState({
                data_1:[...this.state.data_1,update],
            })
            console.log(this.state.data_1);
        }
    }


    render() {
        return (
            <div>
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
                                        <Button type = "primary" onClick = {(e)=>{this.Delect(1,item.num)}}>删除</Button>
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
                                        <Button type = "primary" onClick = {(e)=>{this.Delect(2,item.num)}}>删除</Button>
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
                                        <Button type = "primary" onClick = {(e)=>{this.Delect(3,item.num)}}>删除</Button>
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
