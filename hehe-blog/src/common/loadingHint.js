import React, { Component } from 'react';
import { Spin } from 'antd';

export default class LoadingHit extends Component {
    render() {
        const { type, children } = this.props;
        return (
            <div>
                <Spin spinning={type === 'doing'} tip='Loading...' />
                {type === 'success' && children}
                {type === 'failure' && <span>加载失败</span>}
            </div>
        );
    }
}
