import { Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import * as Yup from 'yup';
import { createDoctor } from '../api/doctorApi';

function AddDoctorComponent() {
  const [serverError, setServerError] = useState();

  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const createDoctorSchema = Yup.object().shape({
    name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(2, 'Too Short!').max(120, 'Too Long!').required('Required'),
    speciality: Yup.string().required('Required'),
    phoneNumber: Yup.string()
      .matches(phoneRegExp, 'Phone number is not valid')
      .min(10, 'to short')
      .max(10, 'to long'),
  });

  const initialValues = {
    name: '',
    email: '',
    password: '',
    speciality: '',
    phoneNumber: '',
  };

  // sidebar popup toast
  const openToast = () => {
    toast.info(' Doctor added to database ', {
      className: 'toast-info',
      autoClose: 2500,
      hideProgressBar: true,
    });
  };

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    const data = await createDoctor(values);

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

  const CustomInputComponent = (props) => (
    <Field {...props} as='select' className='form__input'>
      <option className='form__input' value='' label='Speciality' disabled />
      <option className='form__input' value='cardiology' label='Cardiology' />
      <option className='form__input' value='dermatology' label='Dermatology' />
      <option className='form__input' value='vaccination' label='Vaccination' />
      <option className='form__input' value='neurology' label='Neuorology' />
    </Field>
  );

  return (
    <div className='container'>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={createDoctorSchema}
      >
        {({ errors, touched, isSubmitting, values }) => (
          <Form className='form' id='a-form'>
            <h2 className='form_title title'>add doctor</h2>

            <Field className='form__input' name='name' placeholder='Name' />
            {touched.name && errors.name && <div className='form-error'>{errors.name}</div>}

            <Field className='form__input' name='email' placeholder='Email' />
            {serverError && serverError.error && (
              <div className='form-error'>{serverError.error}</div>
            )}
            {touched.email && errors.email && <div className='form-error'>{errors.email}</div>}

            <Field className='form__input' name='password' placeholder='Password' />
            {touched.password && errors.password && (
              <div className='form-error'>{errors.password}</div>
            )}

            <Field name='speciality' values={values} as={CustomInputComponent} />
            {touched.speciality && errors.speciality && (
              <div className='form-error'>{errors.speciality}</div>
            )}

            <Field
              className='form__input'
              name='phoneNumber'
              placeholder='Phone Number(optional)'
            />
            {touched.phoneNumber && errors.phoneNumber && (
              <div className='form-error'>{errors.phoneNumber}</div>
            )}

            <button
              disabled={isSubmitting}
              type='submit'
              className='form__button button submit message-button'
            >
              add
            </button>
          </Form>
        )}
      </Formik>
      <ToastContainer />
    </div>
  );
}

export default AddDoctorComponent;
