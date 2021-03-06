import { Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import * as Yup from 'yup';
import { destroyDoctor } from '../api/doctorApi';

function RemoveDoctorComponent() {
  const [serverError, setServerError] = useState();

  const removeDoctorSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(2, 'Too Short!').max(120, 'Too Long!').required('Required'),
  });

  const initialValues = {
    email: '',
    password:''
  };

  const openToast = () => {
    toast.error(' Doctor removed from database ', {
      className: 'toast-error',
      autoClose: 2500,
      hideProgressBar: true,
    });
  };

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    const data = await destroyDoctor(values);
    console.log(data);

    if (data.data) {
      openToast();
      setSubmitting(false);
      return resetForm();
    }

    if (data.error) {
      setServerError(data);
      return setSubmitting(false);
    }
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
            <h2 className='form_title title'>remove doctor</h2>

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
              remove
            </button>
          </Form>
        )}
      </Formik>
      <ToastContainer />
    </div>
  );
}

export default RemoveDoctorComponent;
