import React, {Component} from 'react';
import {Page} from "components";
import T from 'utils';

export default class Home extends Component{
    render(){
        console.log(T);
        return(
            <Page title="首页">
                <div>hello world</div>
            </Page>
        )
    }
}
