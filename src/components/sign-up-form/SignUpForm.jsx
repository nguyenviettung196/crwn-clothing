import React, { useState } from 'react';
import './SignUpForm.scss';
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase';
import FormInput from '../form-input/FormInput';
import Button from '../button/Button';


const defaultFormFields = {
  displayName: "",
  email: '',
  password: '',
  confirmPassword: ''
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormField = () => {
    setFormFields(defaultFormFields);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('passwords do not match');
      return;
    }
    try {
      const { user } = await createAuthUserWithEmailAndPassword(email, password);
      // setCurrentUser(user);
      await createUserDocumentFromAuth(user, { displayName });
      resetFormField();
    } catch (error) {
      if (error.code === 'auth/email-already-in-user') {
        alert('Cannot create user,email already in use');
      } else {
        console.log(error.message);
      }
    }

  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };
  return (
    <div className='sign-up-container'>
      <h2>Don't have an account</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput label={`Display Name`}
          type='text'
          onChange={handleChange}
          name='displayName'
          value={displayName}
          required
        />
        <FormInput label={`Email`} type='text' onChange={handleChange} name='email' value={email} required />
        <FormInput label={`Password`} type='password' onChange={handleChange} name='password' value={password} required />
        <FormInput label={`Confirm Password`} type='password' onChange={handleChange} name='confirmPassword' value={confirmPassword} required />
        <Button type='submit' onClick={handleSubmit} >Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;