import React,{Component} from 'react'
import {Form,Input,Button,Checkbox} from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import './css/login.less'
import logo from './images/logo.png'
const {Item}=Form

export default class Login extends Component{
    onFinish=(event)=>{
        event.preeventDefault();
        this.props.form.validateFields((err,values)=>{
            if(!err){
                alert('向服务器发送登录请求')
            }
        });
    }

    pwdValidator=(rule,value,callback)=>{
        if(!value){
            callback('密码必须输入')
        }else if(value.length>12){
            callback('密码必须小于等于12位')
        }else if(!(/^\w+$/).test(value)){
            callback('密码必须是字母，数字，下划线组成')
        }else{
            callback()
        }
    }

    render(){
        return(
            <div className="login">
                <header>
                    <img src={logo} alt="logo"/>
                    <h1>我的后台管理系统</h1>
                </header>
                <section>
                    <h1>用户登录</h1>
                    <Form name="normal_login" className="login-form" initialValues={{remember: true,}} onFinish={onFinish}>
                        <Item name="username" 
                        rules={[{required: true,message: '必须输入用户名!',},
                                {max:12,message:'用户名必须小于12位'},
                                {min:12,message:'用户名必须大于4位'},
                                {pattern:/^\w+$/,message:'用户名必须是字母，数字，下划线组成'},
                        ]}>
                            <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="用户名" />
                        </Item>
                        <Item name="password" 
                            rules={[{required: true,message: '密码必须输入!',},
                                    {validator:this.pwdValidator}]}>
                            <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="密码"
                            />
                        </Item>
                        <Item>
                            <Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>记住我</Checkbox>
                            </Item>
                        </Item>

                        <Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                            登录
                            </Button>                        
                        </Item>
                    </Form>
                </section>
            </div>
        )
    }
}