import React from 'react';
import cookie from 'react-cookies'
import {Link, Redirect} from 'react-router-dom';
import { Menu,  Row, Col,Avatar, Layout, PageHeader } from 'antd';
import Background from "../Background/index";
import { UserOutlined, NotificationOutlined } from '@ant-design/icons';
import {backendUrl} from "../../page/Users/Common";
const { SubMenu } = Menu;

/**
* 用户后台的侧边栏
*/
class LeftSider extends React.Component {
    // 获取用户权限，根据用户权限显示/隐藏部分页面
    constructor(props){
        super(props);
        this.state = {
            PermissionLevel:7,  // 0：超级管理员，1-5依次是四个子系统的管理员，6是普通用户
            isLoggedIn: false,
        }
        if(cookie.load("username") === ""){
            this.state = {
                isLoggedIn: false,
                UserName:"未登录",
            }
        }
        else{
            this.state = {
                UserName: cookie.load("username"),
                province: cookie.load("username"), //管理员所属省份
                isLoggedIn: true,
                //PermissionLevel:1,
            }
        }
    }

    componentWillMount(){
        fetch(backendUrl+"user/profile/",{
            method:"get",
            mode:"cors",
            credentials:"include",
            headers:{
                'sessionid':cookie.loadAll().sessionid,
            }
        })
            .then(res => res.json())
            .then((result)=>{
                var group = result.groups[0];
                if(group === "SuperAdmin"){
                    this.setState({
                        PermissionLevel:0
                    })
                }
                else if(group === "admin_1"){
                    this.setState({
                        PermissionLevel:1
                    })
                }
                else if(group === "admin_2"){
                    this.setState({
                        PermissionLevel:2
                    })
                }
                else if(group === "admin_3"){
                    this.setState({
                        PermissionLevel:3
                    })
                }
                else if(group === "admin_4"){
                    this.setState({
                        PermissionLevel:4
                    })
                }
                else if(group === "admin_5"){
                    this.setState({
                        PermissionLevel:5
                    })
                } 
                else if(group === "admin_6"){
                    this.setState({
                        PermissionLevel:6
                    })
                }              
            },
            (error)=>{
                console.log(error);
            })
    }

	render() {
        if(!this.state.isLoggedIn){
            return <Redirect to = {{pathname:'/ESS/LoginIn'}} />
        }
        else{
		return(
        <Row>
            <Col span={4}>
            <Layout className="site-page-header-ghost-wrapper" >
				<PageHeader ghost={false}  title={"Hello，"+ cookie.load("username")}>
				</PageHeader>						
			</Layout>
            <div>
            <Menu mode="inline" defaultSelectedKeys={["UserInfo"]} defaultOpenKeys={["User","Public"]} style={{ height: '100%', borderRight: 0 }}>
                <SubMenu key = "User" icon ={<UserOutlined />} title="用户信息">
                    <Menu.ItemGroup>
                        <Menu.Item key="UserInfo" > <Link to = '/ESS/background/UserInfo'> 用户信息 </Link></Menu.Item>
                        <Menu.Item key="ChangeInfo" > <Link to = '/ESS/background/ChangeInfo'> 修改信息 </Link></Menu.Item>
                        <Menu.Item key="Comments" > <Link to = '/ESS/background/Comments'> 我的评论 </Link></Menu.Item>
                        <Menu.Item key="Progress" > <Link to = '/ESS/background/Progress'> 物资申请进度 </Link></Menu.Item>
                    </Menu.ItemGroup>
                </SubMenu>
                {
                    this.state.PermissionLevel === 0?(<Menu.Item key="SuperAdmin"> <Link to = '/ESS/background/createadmin'> 建立管理员账户 </Link></Menu.Item>):(<div/>)
                }
                {
                    this.state.PermissionLevel === 1?(<Menu.Item key="News"> <Link to = '/ESS/background/News'> 疫情新闻发布 </Link></Menu.Item>):(<div/>)
                }
                {
                    this.state.PermissionLevel === 3?(<Menu.Item key="Cases"> <Link to ={{
                        pathname: '/ESS/background/Cases',
						state: {
							province: this.state.province
						}
                    }}> 病例监测信息发布 </Link> </Menu.Item>):(<div/>)
                }
                {
                    this.state.PermissionLevel === 2?(<Menu.Item key="Transportation"> <Link to = '/ESS/background/transportation'> 高危列车/航班信息发布 </Link></Menu.Item>):(<div/>)
                }
                {
                    this.state.PermissionLevel === 5?(
                        <SubMenu key = "public" icon = {<NotificationOutlined/>} title = "信息发布">
                            <Menu.Item key="ResumeAction"> <Link to = '/ESS/background/resumeaction'> 复工举措发布 </Link></Menu.Item>
                            <Menu.Item key="PopFlow"> <Link to = '/ESS/background/populationflow'> 人口流动信息发布 </Link></Menu.Item>
                        </SubMenu>
                    ):(<div/>)
                }
            </Menu>
            </div>
            </Col>
            <Col span = {20}>
                <Background />
            </Col>
        </Row>
        );
    }
	}
}

export default LeftSider