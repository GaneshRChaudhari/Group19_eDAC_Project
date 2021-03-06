import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';
//import axios from 'axios';

const Register = ({ setAlert, register, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const { name, email, password, password2 } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        if(password !== password2) {
            setAlert('Password do not match', 'danger');
        }else {
            register({ name, email, password });
        }
    };

    if(isAuthenticated){
      return <Redirect to='/dashboard' />;
    }

    return ( 
        <Fragment>
        <div className='center_align'> 
          <p className='lead'><i className='fas fa-user'></i> Create a New Account</p>
          <form className='form' onSubmit={e => onSubmit(e)}>
            <div className='form-group'>
              <input 
                type='text' 
                placeholder='Name' 
                name='name' 
                value={name}
                onChange={e => onChange(e)} 
                required 
                />
            </div>
            <div className='form-group'>
              <input 
                type='email' 
                placeholder='Email Address' 
                name='email' 
                value={email}
                onChange={e => onChange(e)} 
                required 
                />
            </div>
            <div className='form-group'>
              <input
                type='password'
                placeholder='Password'
                name='password'
                value={password}
                onChange={e => onChange(e)}
                minLength='6'
              />
              <small className='form-text'>
                  Password length must be greater than 6 characters
              </small>
            </div>
            <div className='form-group'>
              <input
                type='password'
                placeholder='Confirm Password'
                name='password2'
                value={password2}
                onChange={e => onChange(e)}
                minLength='6'
              />
            </div>
            <input type='submit' className='btn btn-primary' value='Register' />
          </form>
          <p className='my-1'>
            Already have an account? <Link to='/login'>Sign In</Link>
          </p>
          </div>
        </Fragment>
        );
    };

Register.propTypes ={
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register })(Register); 