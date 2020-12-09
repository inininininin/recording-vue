import Mock from 'mockjs';

// Mock.mock('/recording/login', 'post', (data) => {
//     
//     return {
//         code: 0,
//         codeMsg: '',
//         data: {}
//     };
// });

// Mock.mock('/recording/login-by-sms', 'post', (data) => {
//     
//     return {
//         code: 0,
//         codeMsg: '',
//         data: {}
//     };
// });

// Mock.mock('/recording/login-refresh', 'post', (data) => {
//     
//     return {
//         code: 0,
//         codeMsg: '',
//         data: {
//             userId: '1',
//             nickname: 'rxw'
//         }
//     };
// });

// Mock.mock('/recording/register', 'post', (data) => {
//     
//     return {
//         code: 0,
//         codeMsg: '',
//         data: {
//             loginCode: '123123'
//         }
//     };
// });

// Mock.mock('/recording/login-by-login-code', 'post', (data) => {
//     
//     return {
//         code: 0,
//         codeMsg: '',
//         data: {}
//     };
// });

// Mock.mock('/recording/register-by-sms', 'post', (data) => {
//     
//     return {
//         code: 0,
//         codeMsg: '',
//         data: {}
//     };
// });

// Mock.mock('/recording/logout', 'post', (data) => {
//     
//     return {
//         code: 0,
//         codeMsg: '',
//         data: {}
//     };
// });

// Mock.mock(RegExp('/recording/my-memory/books' + '\\?.*'), 'get', (data) => {
//     
//     return {
//         code: 0,
//         codeMsg: '',
//         data: {
//             items: [
//                 {
//                     bookId: '1231231',
//                     name: 'name1',
//                     orderNo:2,
//                 },
//                 {
//                     bookId: '1231232',
//                     name: 'name2',
//                     orderNo:1,
//                 }
//             ]
//         }
//     };
// });

// Mock.mock(RegExp('/recording/my-memory/books-sum' + '\\?.*'), 'get', (data) => {
//     
//     return {
//         code: 0,
//         codeMsg: '',
//         data: {
//             count: 10
//         }
//     };
// });
// Mock.mock(RegExp('/recording/my-memory/book' + '\\?.*'), 'get', (data) => {
//     
//     return {
//         code: 0,
//         codeMsg: '',
//         data: {
//             bookId:"123123",
//             name:'fffff',
//             orderNo:1,
//         }
//     };
// });
// Mock.mock(RegExp('/recording/my-memory/create-book'), 'post', (data) => {
//     
//     return {
//         code: 0,
//         codeMsg: '',
//         data: {
//             bookId:"123123" 
//         }
//     };
// });
// Mock.mock(RegExp('/recording/my-memory/update-book'), 'post', (data) => {
//     
//     return {
//         code: 0,
//         codeMsg: '',
//         data: {
//             bookId:"123123" 
//         }
//     };
// });
// Mock.mock(RegExp('/recording/my-memory/delete-book'), 'post', (data) => {
//     
//     return {
//         code: 0,
//         codeMsg: '',
//         data: {
//             count:"1" 
//         }
//     };
// });
// Mock.mock(RegExp('/recording/task' + '\\?.*'), 'get', (data) => {
//     
//     return {
//         code: 0,
//         codeMsg: '',
//         data: {
//             taskId: '1231231',
//             content: '任务1内容',
//             faQiRenNickname: '发起人1',
//             faQiRenUserId: '任务1',
//             fuZeRenNickname: '负责人2',
//             fuZeRenUserId: '任务1',
//             createTime : '2020-10-22 15:13:44.222 +0800',
//             finalTime : '2020-10-23 15:13:44.222 +0800',
//             type: 1,
//             orderNo:99,
//             lastTrace:{
//                 traceId: '123121',
//                 content: '追中内容1',
//                 createTime: '2020-09-22 15:03:03',
//             }
//         }
//     };
// });



// Mock.mock(RegExp('/recording/my-tasks-fa-qi-rens' + '\\?.*'), 'get', (data) => {
//     
//     return {
//         code: 0,
//         codeMsg: '',
//         data: {
//             items: [
//                 {
//                     userId: '1',
//                     nickname: '发起人1',
//                     alias: '发起人1'
//                 },
//                 {
//                     userId: '2',
//                     nickname: '发起人2',
//                     alias: '发起人2'
//                 },
//                 {
//                     userId: '3',
//                     nickname: '发起人3',
//                     alias: '发起人3'
//                 },
//                 {
//                     userId: '4',
//                     nickname: '发起人4',
//                     alias: '发起人4'
//                 },
//                 {
//                     userId: '5',
//                     nickname: '发起人5',
//                     alias: '发起人5'
//                 },
//                 {
//                     userId: '6',
//                     nickname: '发起人6',
//                     alias: '发起人6'
//                 },
//             ]
//         }
//     };
// });

// Mock.mock(RegExp('/recording/my-tasks-fu-ze-rens' + '\\?.*'), 'get', (data) => {
//     
//     return {
//         code: 0,
//         codeMsg: '',
//         data: {
//             items: [
//                 {
//                     userId: '1',
//                     nickname: '负责人1',
//                     alias: '负责人1'
//                 },
//                 {
//                     userId: '2',
//                     nickname: '负责人2',
//                     alias: '负责人2'
//                 },
//             ]
//         }
//     };
// });

// Mock.mock(RegExp('/recording/my-friends/friends' + '\\?.*'), 'get', (data) => {
//     
//     return {
//         code: 0,
//         codeMsg: '',
//         data: {
//             items: [
//                 {
//                     userId: '1',
//                     nickname: '负责人1',
//                     phone: '',
//                     alias: '负责人1',
//                     headimg: ''
//                 },
//                 {
//                     userId: '2',
//                     nickname: '负责人2',
//                     phone: '17222938475',
//                     alias: '负责人2',
//                     headimg: '',
//                     orderNo: 1
//                 },
//             ]
//         }
//     };
// });

// Mock.mock(RegExp('/recording/my-friends/friends-sum' + '\\?.*'), 'get', (data) => {
//     
//     return {
//         code: 0,
//         codeMsg: '',
//         data: {
//             itemsCount: 100
//         }
//     };
// });

// Mock.mock(RegExp('/recording/users' + '\\?.*'), 'get', (data) => {
//     
//     return {
//         code: 0,
//         codeMsg: '',
//         data: {
//             items: [
//                 {
//                     userId: '1',
//                     nickname: '用户1',
//                     headimg: '',
//                     phone:'17372202877',
//                 },
//                 {
//                     userId: '2',
//                     nickname: '用户2',
//                     headimg: '',
//                 },
//                 {
//                     userId: '2',
//                     nickname: '用户2',
//                     headimg: '',
//                 },{
//                     userId: '2',
//                     nickname: '用户2',
//                     headimg: '',
//                 },{
//                     userId: '2',
//                     nickname: '用户2',
//                     headimg: '',
//                 },{
//                     userId: '2',
//                     nickname: '用户2',
//                     headimg: '',
//                 },{
//                     userId: '2',
//                     nickname: '用户2',
//                     headimg: '',
//                 },{
//                     userId: '2',
//                     nickname: '用户2',
//                     headimg: '',
//                 },{
//                     userId: '2',
//                     nickname: '用户2',
//                     headimg: '',
//                 },{
//                     userId: '2',
//                     nickname: '用户2',
//                     headimg: '',
//                 },{
//                     userId: '2',
//                     nickname: '用户2',
//                     headimg: '',
//                 },{
//                     userId: '2',
//                     nickname: '用户2',
//                     headimg: '',
//                 },{
//                     userId: '2',
//                     nickname: '用户2',
//                     headimg: '',
//                 },
//             ]
//         }
//     };
// });


// Mock.mock(RegExp('/recording/my-task/tracks' + '\\?.*'), 'get', (data) => {
//     
//     return {
//         code: 0,
//         codeMsg: '',
//         data: {
//             items: [
//                 {
//                     trackId: '1',
//                     content: '123文件而且无肌肉IQ未经融进去问饿哦瑞吉欧企鹅窝',
//                     createTime : '2020-10-22 15:13:44.222 +0800'
//                 },
//                 {
//                     trackId: '2',
//                     content: '123文件而且无肌肉IQ未经融进去问饿哦瑞吉欧企鹅窝',
//                     createTime : '2020-10-22 15:13:44.222 +0800'
//                 },
//                 {
//                     trackId: '3',
//                     content: '123文件而且无肌肉IQ未经融进去问饿哦瑞吉欧企鹅窝',
//                     createTime : '2020-10-22 15:13:44.222 +0800'
//                 },
//                 {
//                     trackId: '4',
//                     content: '123文件而且无肌肉IQ未经融进去问饿哦瑞吉欧企鹅窝',
//                     createTime : '2020-10-22 15:13:44.222 +0800'
//                 },
//                 {
//                     trackId: '5',
//                     content: '123文件而且无肌肉IQ未经融进去问饿哦瑞吉欧企鹅窝',
//                     createTime : '2020-10-22 15:13:44.222 +0800'
//                 },
//                 {
//                     trackId: '6',
//                     content: '123文件而且无肌肉IQ未经融进去问饿哦瑞吉欧企鹅窝',
//                     createTime : '2020-10-22 15:13:44.222 +0800'
//                 },
//                 {
//                     trackId: '7',
//                     content: '123文件而且无肌肉IQ未经融进去问饿哦瑞吉欧企鹅窝',
//                     createTime : '2020-10-22 15:13:44.222 +0800'
//                 },
//                 {
//                     trackId: '8',
//                     content: '123文件而且无肌肉IQ未经融进去问饿\n哦瑞吉123文件而且无肌肉IQ未经融进去问饿哦瑞吉欧企鹅窝123文件而且无肌肉IQ未经融进去问饿哦瑞吉欧企鹅窝欧企鹅窝',
//                     createTime : '2020-10-22 15:13:44.222 +0800'
//                 },
//                 {
//                     trackId: '9',
//                     content: '123文件而且无肌肉IQ未经融进去问饿哦瑞吉欧企鹅窝',
//                     createTime : '2020-10-22 15:13:44.222 +0800'
//                 },

//             ]
//         }
//     };
// });

// Mock.mock.daily={
//     dailies :[
//         {
//             dailyId:'434132123',
//             name:'学英语',
//             does:[
//                 {
//                     doId:'1232131',
//                     done:1,
//                     doneTime:'2020-11-08 15:33:44.343 +0800'
//                 },
//                 {
//                     doId:'1232132',
//                     done:0,
//                     doneTime:'2020-11-07 15:33:44.343 +0800'
//                 }
//                 ,
//                 {
//                     doId:'12321323',
//                     done:1,
//                     doneTime:'2020-11-06 15:33:44.343 +0800'
//                 }
//             ]
//         },{
//             dailyId:'134132123',
//             name:'学日语',
//             does:[
//                 {
//                     doId:'12321312',
//                     done:1,
//                     doneTime:'2020-11-08 15:33:44.343 +0800'
//                 },
//                 {
//                     doId:'12321321',
//                     done:1,
//                     doneTime:'2020-11-07 15:33:44.343 +0800'
//                 }
//                 ,
//                 {
//                     doId:'123213234',
//                     done:1,
//                     doneTime:'2020-11-06 15:33:44.343 +0800'
//                 }
//             ]
//         }
//     ],
    
// }

// Mock.mock(RegExp('/recording/daily/dailies' + '\\?.*'), 'get', (data) => {
//     
//     console.log('/recording/daily/dailies')
//     return {
//         code: 0,
//         codeMsg: '',
//         data: {
//             items:Mock.mock.daily.dailies
//         }
//     };
// });

// Mock.mock('/recording/daily/done' + '\\?.*', 'get', (data) => {
//     
//     return {
//         code: 0,
//         codeMsg: '',
//         data: {}
//     };
// });

// Mock.mock('/recording/daily/undone', 'post', (data) => {
//     
//     return {
//         code: 0,
//         codeMsg: '',
//         data: {}
//     };
// });

// Mock.mock('/recording/daily/create-daily', 'post', (data) => {
//     
//     return {
//         code: 0,
//         codeMsg: '',
//         data: {}
//     };
// });

// Mock.mock('/recording/daily/delete-daily', 'post', (data) => {
//     
//     return {
//         code: 0,
//         codeMsg: '',
//         data: {}
//     };
// });


// Mock.mock(RegExp('/recording/my-task/kinds' + '\\??.*'), 'get', (data) => {
//     debugger
//     return {
//         code: 0,
//         codeMsg: '',
//         data: {
//             kinds: [
//                 {
//                     kindId: '1',
//                     name: '分类1',
//                     orderNo: 1,
//                 },
//                 {
//                     kindId: '2',
//                     name: '分类2',
//                     orderNo: 1,
//                 },
//                 {
//                     kindId: '3',
//                     name: '分类3',
//                     orderNo: 1,
//                 },
//                 {
//                     kindId: '4',
//                     name: '分类4',
//                     orderNo: 1,
//                 },
//                 {
//                     kindId: '5',
//                     name: '分类5',
//                     orderNo: 1,
//                 },
//                 {
//                     kindId: '6',
//                     name: '分类6',
//                     orderNo: 1,
//                 },
//                 {
//                     kindId: '7',
//                     name: '分类7',
//                     orderNo: 1,
//                 },
//                 {
//                     kindId: '8',
//                     name: '分类8',
//                     orderNo: 1,
//                 },
//                 {
//                     kindId: '9',
//                     name: '分类9',
//                     orderNo: 1,
//                 },
//                 {
//                     kindId: '10',
//                     name: '分类10',
//                     orderNo: 1,
//                 },
//             ]
//         }
//     };
// });