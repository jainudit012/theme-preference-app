import React from 'react'
import { Formik, Form as FormWrapper, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { Button, Form } from 'react-bootstrap'
import Row from 'react-bootstrap/Row'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import axiosInstance from '../axios/axiosInstance'

const SignupForm = props => {
    const initialValues = {
        username: '',
        password: '',
        confirmPassword: ''
    }

    const validationSchema = Yup.object().shape({
        username: Yup.string().required('Username is required'),
        password: Yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
        confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match')
    })

    const handleSubmit = async (values, { setSubmitting }) => {
        // console.log(values)
        delete values.confirmPassword
        try {
            const response = await axiosInstance.post('/signup', { ...values, theme: props.theme });
            // console.log(response.data)
            toast.success('Signup successful', { toastId: 'signup-success' })
            props.onSuccess(response.data)
        } catch (error) {
            // console.log(error.response?.data)
            toast.error(error.response?.data?.message??'Signup Failed', { toastId: 'signup-error' })
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

                    <Form.Group controlId="confirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Field type="password" name="confirmPassword" as={Form.Control} />
                        <ErrorMessage name="confirmPassword" component="div" className="text-danger" />
                    </Form.Group>

                    <Button variant="primary" type="submit" disabled={isSubmitting} className="mt-3">
                        Sign Up
                    </Button>

                    <Row>
                        <Form.Text className="mt-3">
                            Already have an account? <Link to="/login">Login</Link>
                        </Form.Text>
                    </Row>
                </FormWrapper>
            )}
        </Formik>
    )
}

export default SignupForm
