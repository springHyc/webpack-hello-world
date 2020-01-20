export default [
    { title: '景点', dataIndex: 'title', width: 100 },
    {
        title: '最佳游玩时间',
        dataIndex: 'bestTime',
        width: 110,
        render: value => (value && value.length > 0 && value) || '无'
    },
    {
        title: '交通方式',
        dataIndex: 'transportation',
        width: 110
    },
    {
        title: '小伙伴',
        dataIndex: 'partner',
        width: 120
    },
    {
        title: '去过',
        dataIndex: 'isGo',
        width: 60,
        render: value => (value ? '是' : '否')
    },
    {
        title: '什么时候去的',
        dataIndex: 'whenDid',
        width: 180,
        render: values => (values.length > 0 && `${values[0]}-${values[1]}`) || '无'
    }
];
