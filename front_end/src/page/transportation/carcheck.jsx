import React, { Component } from 'react';
import { Input} from 'antd';
import { Typography } from 'antd';
import RiskyShifts from './riskyshifts.js'
import { DatePicker } from 'antd';
import { Button } from 'antd';
import './trans.css'

const server = 'http://127.0.0.1:8001';//django的服务器地址

const { Title } = Typography;

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shift_id: 0,
            No: "",
            start_p: "",
            end_p: "",
            start_t: "",
            danger_level: "",
            board_id: "",
            register_id: "",
            queryResult: []
        }
        this.onInputChange = this.onInputChange.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
        this.query = this.query.bind(this);

    }

    onDateChange(date, dateString) {
        this.setState({
            start_t: dateString,
        })
    }

    onInputChange(key, e) {
        this.setState({
            [key]: e.target.value
        });
    }

    query() {
        fetch(
            server + '/transport/search1/?uid=1'
            +  '&start_p=' + this.state.start_p + '&end_p=' + this.state.end_p 
            +  '&No=' + this.state.No + '&date=' + this.state.start_t
        )
            .then(res => res.json())
            .then(data => {
                console.log(data);
                //这里调用了this.setState，这个方法会自动重新渲染界面（也就是render一次）
                this.setState({
                    queryResult: data
                })
            })
            .catch(e => console.log('错误:', e))
    }

    render() {
        return (
            <div>
                <center><Title level={2}>同乘交通自查</Title></center>
                <div className="container">
                    <Input placeholder="出发地" size="large" className="input-width" onChange={(e) => (this.onInputChange('start_p', e))} />
                    <br /><br />
                    <Input placeholder="到达地" size="large" className="input-width" onChange={(e) => (this.onInputChange('end_p', e))} />
                    <br /><br />
                    <Input placeholder="班次号" size="large" className="input-width" onChange={(e) => (this.onInputChange('No', e))} />
                    <br /><br />
                    <DatePicker className="input-width" onChange={(date, dateString) => this.onDateChange(date, dateString)} />
                    <br /><br />
                    <Button type="primary" onClick={this.query}>查询</Button>
                </div>
                <div className="container">
                    <div className="table-container">
                        <Title level={3}>查询结果</Title>
                        <RiskyShifts content={this.state.queryResult} role='user'/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;