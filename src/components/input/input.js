/*
 * 常用输入框
 * @Author: Magical
 */


import React, {Component} from 'react';

import './input.scss';


export default class Input extends Component{

    constructor(){
        super();
        this.state={
            value:''
        }
    }

    handleChange = (event) =>{
        const {type, onChange} = this.props;
        let value = event.target.value;
        switch (type){
        case 'money':
            if(!/^\d+\.?\d{0,2}$/.test(value) && value){  //控制金额输入格式
                return;
            }
            break;
        case 'bankCard':
            value = value.replace(/\D/g, '').replace(/(....)(?=.)/g, '$1 ');
            break;
        case 'mobile':
            value = value.replace(/\D/g, '').substring(0, 11);
            const valueLen = value.length;
            if (valueLen > 3 && valueLen < 8) {
                value = `${value.substr(0, 3)} ${value.substr(3)}`;
            } else if (valueLen >= 8) {
                value = `${value.substr(0, 3)} ${value.substr(3, 4)} ${value.substr(7)}`;
            }
            break;
        default:
            break;

        }

        this.setState({
            value: value
        });

        if (onChange) {
            onChange(value);
        }
    };

    render(){
        const {label, type, placeholder, disabled, maxLength, name, defaultValue, rightContent} = this.props;
        return(
            <div className="input-group">
                {label && <label>{label}</label>}
                <input ref="input"
                    type={type}
                    name={name}
                    onChange={this.handleChange}
                    placeholder={placeholder}
                    value={defaultValue ? defaultValue : this.state.value}
                    disabled={disabled}
                    maxLength={maxLength}
                />
                {rightContent && rightContent}
            </div>
        );
    }
}





