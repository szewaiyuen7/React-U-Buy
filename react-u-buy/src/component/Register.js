import React, {Component} from 'react';
import { Form, Icon, Input, Button, message} from 'antd';
import { Link } from 'react-router-dom';
import { API_ROOT } from '../constants'


class NormalRegisterForm extends Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                fetch(`${API_ROOT}/admin/register`, {
                    headers:{
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    method: 'POST',
                    body: JSON.stringify({
                        username: values.username,
                        password: values.password,
                        email:values.email,
                        photoUrl:values.photoUrl
                    }),
                })
                    .then((response) =>{
                        //console.log(response)
                        if (response.ok) {
                            return response.json();
                        } else {
                            throw new Error("ERROR");
                        }
                    })
                    .then((data) => {


                        message.success('Register succeed!');

                        //step4: 登录成功，保存token -> 用于实现持久登录
                    })
                    .catch((err) => {
                        console.log(err);
                        message.error('Register failed.');
                    });
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="register-form">
                <p className= "register-title">Register
                </p>
                <Form.Item>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Username"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="Password"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('email', {
                        rules: [{ required: true, message: 'Please input your Email!' }],
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="email"
                            placeholder="Email"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('photoUrl', {
                        rules: [{ required: true, message: 'Please input your photoUrl!' }],
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="photoUrl"
                            placeholder="PhotoUrl"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="register-form-button">
                        Register
                    </Button>
                </Form.Item>
            </Form>

        );
    }
}

export const Register = Form.create({ name: 'normal_register' })(NormalRegisterForm);