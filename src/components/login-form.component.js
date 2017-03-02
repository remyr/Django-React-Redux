import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form';

const validate = (value) => {
    let errors = {};
    if ( !value.email ) {
        errors.email = 'Email is required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value.email)) {
        errors.email = 'Invalid email address'
    }
    if ( !value.password ) { errors.password = 'Password is required'}
    return errors;
};

const renderField = ( { hasError, input, label, type, meta: { touched, error } } ) => (
    <div className={(error && touched) ? 'form-group col-md-12 has-error' : 'form-group col-md-12'}>
        <input {...input} type={type} placeholder={label} className="form-control validate" autoComplete="off"/>
        {touched && (error && <span className="help-block">{error}</span>)}
    </div>
);

let LoginForm = (props) => {
    const { handleSubmit, invalid, errors, submitting, router } = props;
    return(
        <form onSubmit={handleSubmit}>
            <div className="col-md-12">
                {errors && <p className="text-danger">{errors}</p>}
            </div>
            <Field name="email" type="text" hasError="true" component={renderField} label="Email" />
            <Field name="password" type="password" component={renderField} label="Password" />
            <div className="col-md-6">
                <button className="btn btn-primary btn-block btn-form" type="button" onClick={() => router.push('/register')}>Sign up</button>
            </div>
            <div className="col-md-6">
                <button disabled={invalid || submitting} className="btn btn-primary btn-block btn-form" type="submit">Sign in</button>
            </div>
        </form>
    )
};

LoginForm = reduxForm({
    form: 'login',
    validate
})(LoginForm);
export default LoginForm