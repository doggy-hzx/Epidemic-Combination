import React, { Component } from 'react';
import {backendUrl} from "./Common";
import cookie from 'react-cookies'

class RealChange extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token:"",
        };
    }

    componentDidMount(){
        var token = this.props.location.search;
        var uptoken = token.substr(7,token.length);
        fetch(backendUrl+"user/mail/confirm/changepass/",{
            method:"post",
            body:JSON.stringify({"token":uptoken}),
            mode:"cors",
        credentials: 'include',
        headers:{
            'sessionid':cookie.loadAll().sessionid,
        }
        })
            .then(res => res.json())
            .then((tokenresult)=>{
                this.setState({
                })
            },
        (error)=>{
            console.log(error);
        })
    }

    render() {
        return (
            <div>
                
            </div>
        );
    }
}

export default RealChange;
