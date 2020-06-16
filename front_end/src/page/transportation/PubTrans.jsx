import React, { Component } from 'react';
import { Input, Space } from 'antd';
import { Button } from 'antd';
import { Typography } from 'antd';
import { Radio } from 'antd';
import { DatePicker } from 'antd';
import RiskyShifts from './riskyshifts'
import './trans.css'
const server = 'http://127.0.0.1:8001';

const { Title } = Typography;

class RiskLevel extends Component {
  state = {
    value: 0,
  };

  onChange = e => {
    console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value,
    },
      () => this.props.onChange(this.state.value));
  };

  render() {
    return (
      <Radio.Group onChange={this.onChange} value={this.state.value}>
        <Radio value={"高风险"}>高风险</Radio>
        <Radio value={"风险"}>风险</Radio>
        <Radio value={"低风险"}>低风险</Radio>
        <Radio value={"安全"}>安全</Radio>
      </Radio.Group>
    );
  }
}


class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shift_id: 0,
      No: "",
      start_t: "",
      start_p: "",
      end_p: "",
      danger_level: "",
      allShifts: [],
      riskyLevel: {
        "安全": 0,
        "低风险": 1,
        "风险": 2,
        "高风险": 3
      }
    }
    this.onDateChange = this.onDateChange.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.write = this.write.bind(this);
    this.sendWarning = this.sendWarning.bind(this);
    this.getShift = this.getShift.bind(this);
  }

  //同时处理三个输入
  onInputChange(key, e) {
    this.setState({
      [key]: e.target.value
    })
  }

  onDateChange(date, dateString) {
    this.setState({
      start_t: dateString
    })
  }

  write() {
    fetch(
      server + '/transport/record/?No=' + this.state.No
      + '&start_p=' + this.state.start_p + '&end_p=' + this.state.end_p
      + '&date=' + this.state.start_t + '&danger_level=' + this.state.riskyLevel[this.state.danger_level]
    )
      .then(res => res.json())
      .then(data => {
        if (data['flag'])
          alert("导入成功!")
        else
          alert("导入失败!")
      })
      .catch(e => console.log('错误:', e))
  }

  getShift() {
    fetch(
      server + '/transport/shifts/'
    )
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({
          allShifts: data
        })
      })
      .catch(e => console.log('错误:', e))
  }

  sendWarning() {
    fetch(
      server + '/transport/mail/'
    )
      .then(res => res.json())
      .then(data => {
        console.log(data);
        alert("成功发送邮件!")
      })
      .catch(e => console.log('错误:', e))
  }

  render() {
    return (
      <div>
        <center><Title level={2}>同乘交通自查系统管理员操作台</Title></center>
        <div className="container">
          <Space direction="vertical">
            <Input className="input-width" placeholder="班次号" onChange={e => this.onInputChange('No', e)} />
            <Input className="input-width" placeholder="起始地" onChange={e => this.onInputChange('start_p', e)} />
            <Input className="input-width" placeholder="目的地" onChange={e => this.onInputChange('end_p', e)} />
            <DatePicker className="input-width" onChange={(date, dateString) => this.onDateChange(date, dateString)} />
            <RiskLevel onChange={(lv) => this.setState({ danger_level: lv })} />
            <Button type="primary" onClick={() => this.write()}>导入</Button>
          </Space>
        </div>

        <div className="container">
          <center><Title level={3}>当前班次表</Title></center>
          <div className="table-container">
            <RiskyShifts content={this.state.allShifts} role='admin' />
          </div>
          <center>
            <Button type="primary" onClick={() => this.getShift()}>刷新班次信息</Button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Button type="primary" onClick={() => this.sendWarning()}>一键发布提醒</Button>
          </center>
        </div>
      </div>
    )
  }
}

export default Admin;