import { Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { loginDoctor } from '../api/doctorApi';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setDoctorId } from '../redux/currentDoctorSlice';
import { messageToast, setMessageToastValue } from '../redux/toastSlice';

function DoctorLoginComponent() {
  const dispatch = useDispatch();

  const history = useHistory();
  const [serverError, setServerError] = useState();
  const removeDoctorSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(2, 'Too Short!').max(120, 'Too Long!').required('Required'),
  });

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    const data = await loginDoctor(values);
    console.log(data);
    if (data.data) {
      dispatch(setDoctorId(data.data.doctor));
      dispatch(messageToast(true));
      dispatch(setMessageToastValue('Doctor login successfull'));
      setSubmitting(false);
      resetForm();
      return history.push('/doctor');
    }

    if (data.error) {
      setServerError(data);
      return setSubmitting(false);
    }
  };

  const initialValues = {
    email: '',
    password: '',
  };
  return (
    <div className='container'>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={removeDoctorSchema}
      >
        {({ errors, touched, isSubmitting, values }) => (
          <Form className='form' id='a-form'>
            <h2 className='form_title title'>welcome doctor</h2>

            <Field className='form__input' name='email' placeholder='Email' />
            {serverError && serverError.error && (
              <div className='form-error'>{serverError.error.email}</div>
            )}
            {touched.email && errors.email && <div className='form-error'>{errors.email}</div>}

            <Field className='form__input' name='password' placeholder='Password' />
            {serverError && serverError.error && (
              <div className='form-error'>{serverError.error.password}</div>
            )}
            {touched.password && errors.password && (
              <div className='form-error'>{errors.password}</div>
            )}

            <button
              disabled={isSubmitting}
              type='submit'
              className='form__button button submit message-button'
            >
              Login
            </button>
            <div className='login-info'>
              <div>For all doctors, email:name@gmail.com password:name123</div>
              <div>Try email:vinu@gmail.com password:vinu123</div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default DoctorLoginComponent;
