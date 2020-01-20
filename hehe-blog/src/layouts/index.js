import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import PandaIcon from './pandaIcon';
import ROUTES from '../common/routes.cnfigs';
import { Route, Redirect, Link } from 'react-router-dom';
import './index.less';

const { Header, Content, Footer } = Layout;

const defaultCurrent = { path: '/home', name: '首页' };
export default class Layouts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: [defaultCurrent]
        };
    }

    componentDidMount() {
        this.props.history.listen(route => {
            ROUTES.forEach(item => {
                if (item.path === route.pathname) {
                    let _current = this.state.current;
                    let position = -1;
                    _current.forEach((item, index) => {
                        if (item.path === route.pathname) {
                            position = index;
                        }
                    });
                    if (position === -1) {
                        _current.push({ name: item.name, path: item.path });
                    } else {
                        _current = _current.slice(0, position + 1);
                    }
                    this.setState({ current: _current });
                }
            });
        });
    }
    render() {
        return (
            <Layout className='layout'>
                <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                    <div className='title'>
                        <span>贺贺</span>的个人博客
                    </div>
                    <div className='logo'>
                        <PandaIcon style={{ fontSize: '28px' }} />
                        <span>个人博客</span>
                    </div>
                    <Menu theme='dark' mode='horizontal' defaultSelectedKeys={[defaultCurrent.path]} style={{ lineHeight: '64px' }}>
                        {ROUTES.filter(item => item.show).map(route => (
                            // @ts-ignore
                            <Menu.Item key={route.path} name={route.name}>
                                <Link to={route.path}>
                                    <Icon type={route.iconType} />
                                    <b>{route.name}</b>
                                </Link>
                            </Menu.Item>
                        ))}
                    </Menu>
                </Header>
                <Content style={{ padding: '0 50px', margin: '128px 0 0px 0' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        {this.state.current.map((item, index) => (
                            <Breadcrumb.Item key={index}>
                                <Link to={item.path}> {item.name}</Link>
                            </Breadcrumb.Item>
                        ))}
                    </Breadcrumb>
                    <div style={{ background: '#fff', padding: 24, minHeight: 'calc(100vh - 251px)', overflow: 'hidden' }}>
                        {ROUTES.map(item => (
                            <Route key={item.key} path={item.path} render={props => <item.component {...props} />} />
                        ))}
                        <Route path='/' render={() => <Redirect to='/home' />} />
                        {/* <Redirect from='/' to='/home' /> */}
                    </div>
                </Content>
                <Footer>贺贺 版权所有 | 采用默认主题 | 基于 React+Antd+Node 构建©2019 | 托管于xxx</Footer>
            </Layout>
        );
    }
}
