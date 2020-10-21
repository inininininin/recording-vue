import Mock from 'mockjs';

Mock.mock('/recording/login', 'post', (data) => {
    debugger;
    return {
        code: 0,
        codeMsg: '',
        data: {}
    };
});

Mock.mock('/recording/login-by-sms', 'post', (data) => {
    debugger;
    return {
        code: 0,
        codeMsg: '',
        data: {}
    };
});

Mock.mock('/recording/login-refresh', 'post', (data) => {
    debugger;
    return {
        code: 0,
        codeMsg: '',
        data: {
            userId: '1',
            nickname: 'rxw'
        }
    };
});

Mock.mock('/recording/register', 'post', (data) => {
    debugger;
    return {
        code: 0,
        codeMsg: '',
        data: {
            loginCode: '123123'
        }
    };
});

Mock.mock('/recording/login-by-login-code', 'post', (data) => {
    debugger;
    return {
        code: 0,
        codeMsg: '',
        data: {}
    };
});

Mock.mock('/recording/register-by-sms', 'post', (data) => {
    debugger;
    return {
        code: 0,
        codeMsg: '',
        data: {}
    };
});

Mock.mock('/recording/logout', 'post', (data) => {
    debugger;
    return {
        code: 0,
        codeMsg: '',
        data: {}
    };
});

Mock.mock(RegExp('/recording/my-tasks' + '\\?.*'), 'get', (data) => {
    debugger;
    return {
        code: 0,
        codeMsg: '',
        data: {
            items: [
                {
                    taskId: '1231231',
                    content: '任务1内容',
                    faBuRenUserNickname: '发布人',
                    faBuRenUserId: '任务1',
                    fuZeRenUserNickname: '负责人',
                    fuZeRenUserId: '任务1',
                    createTime : '2020-10-22 15:13:44.222 +0800',
                    finalTime : '2020-10-23 15:13:44.222 +0800',
                    orderNo:99,
                    lastTrace:{
                        traceId: '123121',
                        content: '追中内容1',
                        createTime: '2020-09-22 15:03:03',
                    }
                },
                {
                    taskId: '1231232',
                    content: '任务1内容',
                    createTime : '2020-01-02 15:13:44.222 +0800',
                    finalTime : '2020-01-02 15:13:44.222 +0800',
                    orderNo:1,
                    lastTrace:{
                        traceId: '123122',
                        content: '追中内容2',
                        createTime: '2020-09-22 15:03:03',
                    }
                }
            ]
        }
    };
});


Mock.mock(RegExp('/recording/task' + '\\?.*'), 'get', (data) => {
    debugger;
    return {
        code: 0,
        codeMsg: '',
        data: {
            taskId: '1231231',
            content: '任务1内容',
            faBuRenUserNickname: '发布人1',
            faBuRenUserId: '任务1',
            fuZeRenUserNickname: '负责人2',
            fuZeRenUserId: '任务1',
            createTime : '2020-10-22 15:13:44.222 +0800',
            finalTime : '2020-10-23 15:13:44.222 +0800',
            type: 1,
            orderNo:99,
            lastTrace:{
                traceId: '123121',
                content: '追中内容1',
                createTime: '2020-09-22 15:03:03',
            }
        }
    };
});

Mock.mock(RegExp('/recording/my-tasks-sum' + '\\?.*'), 'get', (data) => {
    debugger;
    return {
        code: 0,
        codeMsg: '',
        data: {
            itemsCount: 10
        }
    };
});

Mock.mock(RegExp('/recording/my-tasks-fa-bu-rens' + '\\?.*'), 'get', (data) => {
    debugger;
    return {
        code: 0,
        codeMsg: '',
        data: {
            items: [
                {
                    userId: '1',
                    nickname: '发布人1',
                    alias: '发布人1'
                },
                {
                    userId: '2',
                    nickname: '发布人2',
                    alias: '发布人2'
                },
                {
                    userId: '3',
                    nickname: '发布人3',
                    alias: '发布人3'
                },
                {
                    userId: '4',
                    nickname: '发布人4',
                    alias: '发布人4'
                },
                {
                    userId: '5',
                    nickname: '发布人5',
                    alias: '发布人5'
                },
                {
                    userId: '6',
                    nickname: '发布人6',
                    alias: '发布人6'
                },
            ]
        }
    };
});

Mock.mock(RegExp('/recording/my-tasks-fu-ze-rens' + '\\?.*'), 'get', (data) => {
    debugger;
    return {
        code: 0,
        codeMsg: '',
        data: {
            items: [
                {
                    userId: '1',
                    nickname: '负责人1',
                    alias: '负责人1'
                },
                {
                    userId: '2',
                    nickname: '负责人2',
                    alias: '负责人2'
                },
            ]
        }
    };
});

Mock.mock(RegExp('/recording/my-friends' + '\\?.*'), 'get', (data) => {
    debugger;
    return {
        code: 0,
        codeMsg: '',
        data: {
            items: [
                {
                    userId: '1',
                    nickname: '负责人1',
                    phone: '',
                    alias: '负责人1',
                    headimg: ''
                },
                {
                    userId: '2',
                    nickname: '负责人2',
                    phone: '17222938475',
                    alias: '负责人2',
                    headimg: '',
                    orderNo: 1
                },
            ]
        }
    };
});

Mock.mock(RegExp('/recording/my-friends-sum' + '\\?.*'), 'get', (data) => {
    debugger;
    return {
        code: 0,
        codeMsg: '',
        data: {
            itemsCount: 100
        }
    };
});

Mock.mock(RegExp('/recording/users' + '\\?.*'), 'get', (data) => {
    debugger;
    return {
        code: 0,
        codeMsg: '',
        data: {
            items: [
                {
                    userId: '1',
                    nickname: '用户1',
                    headimg: '',
                    phone:'17372202877',
                },
                {
                    userId: '2',
                    nickname: '用户2',
                    headimg: '',
                },
                {
                    userId: '2',
                    nickname: '用户2',
                    headimg: '',
                },{
                    userId: '2',
                    nickname: '用户2',
                    headimg: '',
                },{
                    userId: '2',
                    nickname: '用户2',
                    headimg: '',
                },{
                    userId: '2',
                    nickname: '用户2',
                    headimg: '',
                },{
                    userId: '2',
                    nickname: '用户2',
                    headimg: '',
                },{
                    userId: '2',
                    nickname: '用户2',
                    headimg: '',
                },{
                    userId: '2',
                    nickname: '用户2',
                    headimg: '',
                },{
                    userId: '2',
                    nickname: '用户2',
                    headimg: '',
                },{
                    userId: '2',
                    nickname: '用户2',
                    headimg: '',
                },{
                    userId: '2',
                    nickname: '用户2',
                    headimg: '',
                },{
                    userId: '2',
                    nickname: '用户2',
                    headimg: '',
                },
            ]
        }
    };
});


Mock.mock(RegExp('/recording/task-tracks' + '\\?.*'), 'get', (data) => {
    debugger;
    return {
        code: 0,
        codeMsg: '',
        data: {
            items: [
                {
                    trackId: '1',
                    content: '123文件而且无肌肉IQ未经融进去问饿哦瑞吉欧企鹅窝',
                    createTime : '2020-10-22 15:13:44.222 +0800'
                },
                {
                    trackId: '2',
                    content: '123文件而且无肌肉IQ未经融进去问饿哦瑞吉欧企鹅窝',
                    createTime : '2020-10-22 15:13:44.222 +0800'
                },
                {
                    trackId: '3',
                    content: '123文件而且无肌肉IQ未经融进去问饿哦瑞吉欧企鹅窝',
                    createTime : '2020-10-22 15:13:44.222 +0800'
                },
                {
                    trackId: '4',
                    content: '123文件而且无肌肉IQ未经融进去问饿哦瑞吉欧企鹅窝',
                    createTime : '2020-10-22 15:13:44.222 +0800'
                },
                {
                    trackId: '5',
                    content: '123文件而且无肌肉IQ未经融进去问饿哦瑞吉欧企鹅窝',
                    createTime : '2020-10-22 15:13:44.222 +0800'
                },
                {
                    trackId: '6',
                    content: '123文件而且无肌肉IQ未经融进去问饿哦瑞吉欧企鹅窝',
                    createTime : '2020-10-22 15:13:44.222 +0800'
                },
                {
                    trackId: '7',
                    content: '123文件而且无肌肉IQ未经融进去问饿哦瑞吉欧企鹅窝',
                    createTime : '2020-10-22 15:13:44.222 +0800'
                },
                {
                    trackId: '8',
                    content: '123文件而且无肌肉IQ未经融进去问饿\n哦瑞吉123文件而且无肌肉IQ未经融进去问饿哦瑞吉欧企鹅窝123文件而且无肌肉IQ未经融进去问饿哦瑞吉欧企鹅窝欧企鹅窝',
                    createTime : '2020-10-22 15:13:44.222 +0800'
                },
                {
                    trackId: '9',
                    content: '123文件而且无肌肉IQ未经融进去问饿哦瑞吉欧企鹅窝',
                    createTime : '2020-10-22 15:13:44.222 +0800'
                },

            ]
        }
    };
});