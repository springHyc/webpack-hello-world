import React, { Component } from 'react';
import { LocaleProvider, Table, Button, message, Upload, Modal, Icon } from 'antd';
import zhCN from 'antd/es/locale-provider/zh_CN';
import columns from './columns';
import axios from 'axios';
import './index.less';
let _fileList = [];

export default class TravelList extends Component {
    constructor(props) {
        super(props);
        this.state = { uploadModalVisible: false, uploadModalId: undefined };
    }
    getColumns = () =>
        columns.concat([
            {
                title: '照片墙掠影',
                dataIndex: 'imgIds',
                width: 240,
                render: (values, record) => {
                    _fileList = values.map((item, index) => ({
                        uid: index,
                        name: item,
                        status: 'done',
                        url: 'http://127.0.0.1:4321' + item
                    }));
                    return (
                        <Upload
                            action={`/api/viewPoint/photo/upload?id=${record._id}`}
                            listType='picture-card'
                            fileList={_fileList.slice(0, 2)}
                            onChange={({ fileList }) => {
                                _fileList = fileList;
                            }}
                            onRemove={file => {
                                if (file.name.indexOf('/img') === -1) {
                                    return;
                                }
                                axios.delete(`/api/viewPoint/photo/${record._id}`, { params: { url: file.name } }).then(
                                    () => {
                                        this.props.fetchList();
                                        message.success('删除成功！');
                                    },
                                    () => message.success('删除失败！')
                                );
                            }}
                        />
                    );
                }
            },
            {
                title: '操作',
                dataIndex: 'action',
                width: 180,
                render: (value, record) => (
                    <div className='btn_block'>
                        <Button
                            ghost
                            type='primary'
                            onClick={() => {
                                this.delete(record._id);
                            }}
                            className='table_btn'
                        >
                            删除
                        </Button>
                        <Button
                            ghost
                            type='primary'
                            onClick={() => {
                                this.edit(record);
                            }}
                            className='table_btn'
                        >
                            修改
                        </Button>
                        <Button
                            ghost
                            type='primary'
                            onClick={() => {
                                this.setState({ uploadModalVisible: true, uploadModalId: record._id });
                            }}
                            className='table_btn'
                        >
                            导入照片
                        </Button>
                        <Button
                            ghost
                            type='primary'
                            onClick={() => {
                                this.showPhotoWall(record._id);
                            }}
                            className='table_btn'
                        >
                            照片墙
                        </Button>
                    </div>
                )
            }
        ]);
    delete = id => {
        axios.delete(`/api/viewPoint/${id}`).then(
            () => {
                this.props.fetchList();
                message.success('删除成功！');
            },
            () => message.error('删除失败！')
        );
    };

    showPhotoWall = id => {
        this.props.history.push({ pathname: '/photowall', state: { id: id } });
    };

    edit = record => {
        this.props.history.push({ pathname: '/editViewPoint', state: { record, isEdit: true } });
    };
    render() {
        return (
            <div>
                <LocaleProvider locale={zhCN}>
                    <Table
                        rowKey={(row, index) => `${index}-${row.id}`}
                        columns={this.getColumns()}
                        dataSource={this.props.dataList}
                        locale={{ emptyText: '暂无数据' }}
                        pagination={false}
                        scroll={{ x: true }}
                    />
                </LocaleProvider>
                <Modal
                    visible={this.state.uploadModalVisible}
                    title='导入精彩照片集'
                    onCancel={() => this.setState({ uploadModalVisible: false })}
                    onOk={() => this.setState({ uploadModalVisible: false }, () => this.props.fetchList())}
                >
                    <Upload action={`/api/viewPoint/photo/upload?id=${this.state.uploadModalId}`} multiple>
                        <Button>
                            <Icon type='upload' /> Upload
                        </Button>
                    </Upload>
                </Modal>
            </div>
        );
    }
}
