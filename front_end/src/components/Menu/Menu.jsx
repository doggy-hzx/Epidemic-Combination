import React from 'react';
import {Button} from 'antd';
import {Link} from 'react-router-dom';
import Navi from './Navigator';
import Logo from '../../asserts/logo.jpg';
import './Menu.css';
import cookie from 'react-cookies'

/**
 * logo + 导航栏
 */
class Menu extends React.Component{
    // 控制后台菜单的显示
    constructor(props){
        super(props);
        if(cookie.load('username') === ""){
            this.state = {
                isLoginIn:false,
            }
        }
        else this.state = {
            isLoginIn:true
        }
    }

    Out=()=>{
        cookie.save('username',"");
        // todo: 需要手动刷新页面
        this.setState = {
            isLoginIn:false,
        }
        
    }

    render(){
        return(
            <div class = "header">
                <img class = "logo" src = {Logo} alt="校徽" />
                <div class ="title"> 疫情管控系统 </div>
                <div style = {{alignSelf:'flex-end'}}> <Navi /> </div>
                <div style = {{marginLeft: 'auto'}}>
                    <div>{
                        this.state.isLoginIn?(
                            <div>
                            <Button type="primary" size="large"><Link to = '/ESS/background/UserInfo'> 用户中心 </Link></Button>
                            <Button type="primary" size="large" onClick = {this.Out} style={{marginLeft: "5px"}}> 注销 </Button>
                            </div>
                        ):(<div>
                            <Button type="primary" size="large"><Link to = '/LoginIn'> 登录  </Link></Button>
                            <Button type="primary" size="large" style={{marginLeft: "5px"}}><Link to = '/Create'> 注册 </Link></Button>
                            </div>
                        )
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default Menu