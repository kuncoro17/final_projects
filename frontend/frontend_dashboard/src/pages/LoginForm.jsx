// src/components/LoginForm.js
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { login } from '../services/api';

const LoginForm = () => {
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={Yup.object({
        email: Yup.string().email('Invalid email address').required('Required'),
        password: Yup.string().required('Required'),
      })}
      onSubmit={async (values, { setSubmitting, setErrors }) => {
        try {
          const data = await login(values.email, values.password);
          console.log(data); // Handle successful login
        } catch (error) {
          setErrors({ api: 'Login failed. Please check your credentials.' });
        }
        setSubmitting(false);
      }}
    >
      <Form className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <Field name="email" type="email" className="mt-1 p-2 w-full border rounded-md" />
          <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <Field name="password" type="password" className="mt-1 p-2 w-full border rounded-md" />
          <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
        </div>
        <button type="submit" className="w-full py-2 bg-blue-800 text-white rounded-md">
          Login
        </button>
        <ErrorMessage name="api" component="div" className="text-red-500 text-center" />
      </Form>
    </Formik>
  );
};

export default LoginForm;
