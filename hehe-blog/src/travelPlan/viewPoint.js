import React, { Component } from 'react';
import moment from 'moment';
import { Input, Form, DatePicker, message, Icon, Upload, Modal, Button, Row, Col, Radio, Select } from 'antd';
import axios from 'axios';
import './index.less';

const { RangePicker } = DatePicker;
const { Option } = Select;
const { TextArea } = Input;
const bestTimeChildren = ['3-4月', '4-5月', '9-10月', '12-2月'];

class ViewPoint extends Component {
    constructor(props) {
        super(props);
        const _isEdit = props.location.state.isEdit || false;
        let _fileList = [];
        if (_isEdit && props.location && props.location.state && props.location.state.record && props.location.state.record.imgIds) {
            _fileList = props.location.state.record.imgIds.map((item, index) => ({
                uid: index,
                name: item,
                status: 'done',
                url: 'http://127.0.0.1:4321' + item
            }));
        }
        this.state = {
            previewVisible: false,
            previewImage: '',
            fileList: _fileList,
            preProps: {
                viewPoint: { _id: undefined }
            },
            isEdit: _isEdit,
            imgInfo: { title: null, desc: null }
        };
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        let _fileList = [];
        if (nextProps.viewPoint && nextProps.viewPoint._id !== this.state.preProps.viewPoint._id) {
            nextProps.viewPoint &&
                nextProps.viewPoint.imgIds &&
                nextProps.viewPoint.imgIds.forEach(item => {
                    _fileList.push({
                        uid: '-1',
                        name: 'xxx.png',
                        status: 'done',
                        url: 'http://127.0.0.1:4321' + item
                    });
                });
            this.setState({ preProps: nextProps, fileList: _fileList, isEdit: true });
        }
    }
    save = () => {
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const data = {
                    ...values,
                    whenDid: (values.whenDid && values.whenDid.map(item => moment(item).format('YYYY/MM/DD'))) || []
                };
                if (this.state.isEdit) {
                    data._id = this.props.location.state.record._id;
                }
                axios
                    .post('/api/viewPoint', { data })
                    .then(() => {
                        this.props.form.resetFields();
                        message.success('添加成功！');
                        this.props.history.goBack();
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
            }
        });
    };
    getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await this.getBase64(file.originFileObj);
        }

        this.setState(
            {
                previewImage: file.url || file.preview,
                previewVisible: true
            },
            () => this.fetchImgInfo(file.url || file.preview)
        );
    };

    fetchImgInfo = url => {
        const _url = '/img' + url.split('/img')[1];
        axios
            .get('/api/imgInfos/getImgInfo', {
                params: {
                    url: _url
                }
            })
            .then(res => {
                this.setState({ imgInfo: res.data.imgInfo });
            });
    };

    handleChange = ({ fileList }) => {
        this.setState({ fileList });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        let viewPoint = (this.props.location.state && this.props.location.state.record) || {};
        const uploadButton = (
            <div>
                <Icon type='plus' />
                <div className='ant-upload-text'>Upload</div>
            </div>
        );

        const { previewVisible, previewImage, fileList, isEdit } = this.state;
        return (
            <div className='add_view_point'>
                <h2>新增旅游规划</h2>
                <Form style={{ width: '100%' }}>
                    <Row gutter={24}>
                        <Col span={12}>
                            <Form.Item label='景点' labelCol={{ span: 8 }} wrapperCol={{ span: 12 }} style={{ display: 'flex' }}>
                                {getFieldDecorator('title', {
                                    initialValue: viewPoint.title || undefined
                                })(<Input />)}
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label='最佳游玩月份' labelCol={{ span: 8 }} wrapperCol={{ span: 12 }} style={{ display: 'flex' }}>
                                {getFieldDecorator('bestTime', {
                                    initialValue: viewPoint.bestTime || undefined
                                })(
                                    <Select mode='tags' style={{ width: '100%' }} tokenSeparators={[',']}>
                                        {bestTimeChildren.map(item => {
                                            return <Option key={item}>{item}</Option>;
                                        })}
                                    </Select>
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={12}>
                            <Form.Item label='交通方式' labelCol={{ span: 8 }} wrapperCol={{ span: 12 }} style={{ display: 'flex' }}>
                                {getFieldDecorator('transportation', {
                                    initialValue: viewPoint.transportation || undefined
                                })(<Input />)}
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label='小伙伴' labelCol={{ span: 8 }} wrapperCol={{ span: 12 }} style={{ display: 'flex' }}>
                                {getFieldDecorator('partner', {
                                    initialValue: viewPoint.partner || undefined
                                })(<Input />)}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={12}>
                            <Form.Item label='是否去过' labelCol={{ span: 8 }} wrapperCol={{ span: 12 }} style={{ display: 'flex' }}>
                                {getFieldDecorator('isGo', {
                                    initialValue: (this.state.isEdit && viewPoint.isGo) || false
                                })(
                                    <Radio.Group>
                                        <Radio value={false}>否</Radio>
                                        <Radio value={true}>是</Radio>
                                    </Radio.Group>
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label='何时去过' labelCol={{ span: 8 }} wrapperCol={{ span: 12 }} style={{ display: 'flex' }}>
                                {getFieldDecorator('whenDid', {
                                    initialValue: this.state.isEdit && [moment(viewPoint.whenDid[0]), moment(viewPoint.whenDid[1])]
                                })(<RangePicker />)}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={24}>
                            <Form.Item label='体验' labelCol={{ span: 4 }} wrapperCol={{ span: 18 }} style={{ display: 'flex' }}>
                                {getFieldDecorator('notes', {
                                    initialValue: (this.state.isEdit && viewPoint.notes) || undefined
                                })(<TextArea rows={4} />)}
                            </Form.Item>
                        </Col>
                    </Row>
                    {isEdit && (
                        <Row gutter={24}>
                            <Col span={24}>
                                <Form.Item label='照片墙' labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} style={{ display: 'flex' }}>
                                    <div className='clearfix'>
                                        <Upload
                                            action={`/api/viewPoint/photo/upload?id=${viewPoint._id}`}
                                            listType='picture-card'
                                            fileList={fileList}
                                            onPreview={this.handlePreview}
                                            onChange={this.handleChange}
                                            onRemove={file => {
                                                if (file.name.indexOf('/img') === -1) {
                                                    return;
                                                }
                                                axios.delete(`/api/viewPoint/photo/${viewPoint._id}`, { params: { url: file.name } }).then(
                                                    () => {
                                                        message.success('删除成功！');
                                                    },
                                                    () => message.success('删除失败！')
                                                );
                                            }}
                                        >
                                            {fileList.length >= 3 ? null : uploadButton}
                                        </Upload>
                                        <Modal
                                            visible={previewVisible}
                                            onCancel={this.handleCancel}
                                            onOk={() => {
                                                const data = {
                                                    viewPointId: this.props.location.state.record._id,
                                                    url: '/img' + previewImage.split('/img')[1],
                                                    ...this.state.imgInfo
                                                };
                                                axios
                                                    .post('/api/imgInfos/save', { data })
                                                    .then(() => {
                                                        message.success('添加成功！');
                                                        this.handleCancel();
                                                    })
                                                    .catch(err => console.log(err));
                                            }}
                                            okText='保存'
                                            cancelText='取消'
                                        >
                                            <img alt='example' style={{ width: '100%' }} src={previewImage} />
                                            <div className='imginfo'>
                                                <Row gutter={24} type='flex' justify='start' align='middle'>
                                                    <Col span={4}>
                                                        <label>标题：</label>
                                                    </Col>
                                                    <Col span={18}>
                                                        <Input
                                                            value={this.state.imgInfo.title}
                                                            onChange={e => {
                                                                const imgInfo = this.state.imgInfo;
                                                                imgInfo.title = e.target.value;
                                                                this.setState({ imgInfo });
                                                            }}
                                                        />
                                                    </Col>
                                                </Row>
                                                <Row gutter={24} type='flex' justify='start' align='middle'>
                                                    <Col span={4}>
                                                        <label>描述：</label>
                                                    </Col>
                                                    <Col span={18}>
                                                        <Input
                                                            value={this.state.imgInfo.desc}
                                                            onChange={e => {
                                                                const imgInfo = this.state.imgInfo;
                                                                imgInfo.desc = e.target.value;
                                                                this.setState({ imgInfo });
                                                            }}
                                                        />
                                                    </Col>
                                                </Row>
                                            </div>
                                        </Modal>
                                    </div>
                                </Form.Item>
                            </Col>
                        </Row>
                    )}
                </Form>
                <div>
                    <Button
                        className='btn'
                        onClick={() => {
                            this.props.history.goBack();
                        }}
                    >
                        取消
                    </Button>
                    <Button onClick={this.save}>保存</Button>
                </div>
            </div>
        );
    }
}

export default Form.create()(ViewPoint);
