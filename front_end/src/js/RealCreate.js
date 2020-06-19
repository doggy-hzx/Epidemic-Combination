import React, { Component } from 'react';
import {backendUrl} from "./Common";
import cookie from 'react-cookies'

class RealCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token:"",
        };
    }

    componentDidMount(){
        var token = this.props.location.search;
        var uptoken = token.substr(7,token.length);
        fetch(backendUrl+"user/mail/confirm/reg/",{
            method:"post",
            body:JSON.stringify({"token":uptoken}),
            mode:"cors",
        credentials: 'include',
        })
            .then(res => res.json())
            .then((tokenresult)=>{
                console.log(tokenresult);
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

export default RealCreate;
