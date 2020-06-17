import React, { Component } from 'react';
import { Button, Table } from 'antd';
const server = 'http://127.0.0.1:8001';

class RiskyShifts extends Component {

    constructor(props) {
        super(props);
        this.state = this.props.content
        this.userBind = this.userBind.bind(this);
        this.delete = this.delete.bind(this);

        this.columns = [
            {
                title: '班次号',
                dataIndex: 'No',
                key: 'No',
            },
            {
                title: '出发地',
                dataIndex: 'start_p',
                key: 'start_p',
            },
            {
                title: '到达地',
                dataIndex: 'end_p',
                key: 'end_p',
            },
            {
                title: '发车日期',
                dataIndex: 'date',
                key: 'date',
            },
            {
                title: '风险等级',
                dataIndex: 'danger_level',
                key: 'danger_level',
            },
            {
                title: '操作',
                key: 'action',
                render: (text, record) => this.action(this.props.role, record.shift_id, record.No)
            }
        ];
    }

    userBind(id, No) {
        fetch(
            server + '/transport/register?uid=4&shift_id=' + id
        )
            .then(res => res.json())
            .then(data => {
                console.log(data)
                alert("成功绑定列车" + No + "!")
            })
            .catch(e => console.log('错误:', e))
    }

    delete(id) {
        fetch(
            server + '/transport/delete?shift_id=' + id
        )
            .then(res => res.json())
            .then(data => {
                console.log(data)
                alert("成功删除纪录：" + id)
            })
            .catch(e => console.log('错误:', e))
    }

    //action定义了显示时的操作，对用户来说是绑定，对管理员来说是删除
    //角色role由对应的标签传入
    action(r, sft_id, No) {
        if (r === 'user') return (<Button type="primary" onClick={e => { e.preventDefault(); this.userBind(sft_id, No) }}>绑定</Button>)
        else if (r === 'admin') return (<Button type="primary" onClick={e => { e.preventDefault(); this.delete(sft_id) }}>删除</Button>)
        else return null
    }

    render() {
        return (
            <Table className="tble" columns={this.columns} dataSource={this.props.content}>
                {console.log(this.state)}
            </Table>
            //用Table可以实现自动分页，所以放弃了原来的List
            // <List
            //     itemLayout="horizontal"
            //     dataSource={this.props.content}
            //     renderItem={(item) => (
            //         <List.Item
            //             actions={[this.action(this.props.role, item.shift_id, item.No)]}
            //         >
            //             <List.Item.Meta
            //                 title={item.No}
            //                 description={"始发地:" + item.start_p + "目的地：" + item.end_p + "发车日期：" + item.date + "风险等级：" + item.danger_level}
            //             />
            //         </List.Item>
            //     )}
            // >
            // {console.log(this.props.content)}
            // </List>
        )
    }
}

export default RiskyShifts;