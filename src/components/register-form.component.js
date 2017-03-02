import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form';

const validate = (value) => {
    let errors = {};
    if ( !value.username ) { errors.username = 'Username is required'}
    if ( !value.password ) { errors.password = 'Password is required'}
    if ( !value.confirmPassword ) { errors.confirmPassword = 'Confirm password is required'}
    if ( !value.email ) {
        errors.email = 'Email is required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value.email)) {
        errors.email = 'Invalid email address'
    }
    return errors;
};

const renderField = ( { input, label, type, meta: { touched, error } } ) => (
    <div className={(error && touched) ? 'form-group col-md-12 has-error' : 'form-group col-md-12'}>
        <input {...input} type={type} className="form-control validate" placeholder={label} autoComplete="off"/>
        {touched && (error && <span className="help-block">{error}</span>)}
    </div>
);

let RegisterForm = (props) => {
    const { handleSubmit, invalid, error, submitting, router } = props;
    return(
        <form onSubmit={handleSubmit}>
            {error && <span>{error}</span>}
            <Field name="username" type="text" component={renderField} label="Username" />
            <Field name="email" type="text" component={renderField} label="Email" />
            <Field name="password" type="password" component={renderField} label="Password" />
            <Field name="confirmPassword" type="password" component={renderField} label="Confirm password" />
                <div className="col-md-6">
                <button onClick={() => router.push('/login')} className="btn btn-primary btn-block btn-form" type="button">Sign in</button>
            </div>
            <div className="col-md-6">
                <button disabled={invalid || submitting} className="btn btn-primary btn-block btn-form" type="submit">Sign up</button>
            </div>
        </form>
    )
};

RegisterForm = reduxForm({
    form: 'register',
    validate
})(RegisterForm);
export default RegisterForm