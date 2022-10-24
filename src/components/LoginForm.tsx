// import { ChangeEvent, FC, useState } from 'react';
// import { Button, Form, Input } from 'antd';
// import { rules } from '../utils/rules';
// import { useActions } from '../hooks/redux';
// import { TUserLogin } from '../store/reducers/auth';
//
// const LoginForm: FC = () => {
//     const { login } = useActions();
//     const [ loginData, setLoginData ] = useState<TUserLogin>( {
//         username: '',
//         password: ''
//     } );
//
//     async function onSubmit() {
//         console.log( 'submit' );
//         await login( loginData );
//     }
//
//     function inputHandler( e: ChangeEvent<HTMLInputElement> ) {
//         setLoginData( {
//             ...loginData,
//             [e.target.name]: e.target.value
//         } );
//     }
//
//     return (
//         <Form
//             onFinish={ onSubmit }
//         >
//             <Form.Item
//                 label="Username"
//                 name="username"
//                 rules={ [ rules.required( 'Please input your username!' ) ] }
//             >
//                 <Input
//                     name="username"
//                     value={ loginData.username }
//                     onChange={ inputHandler }
//                 />
//             </Form.Item>
//             <Form.Item
//                 label="Password"
//                 name="password"
//                 rules={ [ rules.required( 'Please input your password!' ) ] }
//             >
//                 <Input
//                     name="password"
//                     type="password"
//                     value={ loginData.password }
//                     onChange={ inputHandler }
//                 />
//             </Form.Item>
//             <Form.Item>
//                 <Button
//                     type="primary"
//                     htmlType="submit"
//                 >Login
//                 </Button>
//             </Form.Item>
//         </Form>
//     );
// };
//
// export default LoginForm;
