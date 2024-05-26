import React from 'react'
import { Formik, Form as FormWrapper, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { Button, Form } from 'react-bootstrap'
import Row from 'react-bootstrap/Row'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import axiosInstance from '../axios/axiosInstance'

const LoginForm = props => {
    const initialValues = {
        username: '',
        password: '',
    }

    const validationSchema = Yup.object().shape({
        username: Yup.string().required('Username is required'),
        password: Yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
    })

    const handleSubmit = async (values, { setSubmitting }) => {
        // console.log(values)
        try {
            const response = await axiosInstance.post('/login', { ...values, theme: props.theme })
            // console.log(response.data)
            toast.success('Login successful', { toastId: 'login-success' })
            props.onSuccess(response.data)
        } catch (error) {
            // console.log(error.response.data)
            toast.error(error.response?.data?.message??'Login Failed', { toastId: 'login-error' })
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {({ isSubmitting }) => (
                <FormWrapper>
                    <Form.Group controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Field type="text" name="username" as={Form.Control} placeholder="Enter username" />
                        <ErrorMessage name="username" component="div" className="text-danger" />
                    </Form.Group>

                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Field type="password" name="password" as={Form.Control} />
                        <ErrorMessage name="password" component="div" className="text-danger" />
                    </Form.Group>

                    <Button variant="primary" type="submit" disabled={isSubmitting} className="mt-3">
                        Login
                    </Button>

                    <Row>
                        <Form.Text className="mt-3">
                            Don't have an account yet? <Link to="/signup">Signup</Link>
                        </Form.Text>
                    </Row>
                </FormWrapper>
            )}
        </Formik>
    )
}

export default LoginForm
