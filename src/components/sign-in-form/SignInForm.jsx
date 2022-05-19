import { getDefaultNormalizer } from '@testing-library/react';
import React, { useContext, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { createUserDocumentFromAuth, signInWithGooglePopup, signInWithUserEmailAndPassword } from '../../utils/firebase/firebase';
import Button from '../button/Button';
import FormInput from '../form-input/FormInput';
import './SignInForm.scss';


const defaultFormFields = {
  email: '',
  password: '',
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  const { setCurrentUser } = useContext(UserContext);


  const resetFormField = () => {
    setFormFields(defaultFormFields);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { user } = await signInWithUserEmailAndPassword(email, password);
      // setCurrentUser(user);
      resetFormField();
    } catch (error) {
      switch (error.code) {
        case 'auth/wrong-password':
          alert('Incorrect password !');
          break;
        case 'auth/user-not-found':
          alert('no user associalted with this email');
          break;
        default:
          console.log(error);
      }
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };
  const signInWithGoogle = async () => {
   await signInWithGooglePopup();

  };
  return (
    <div className='sign-up-container'>
      <h2>Have an account</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput label={`Email`} type='text' onChange={handleChange} name='email' value={email} required />
        <FormInput label={`Password`} type='password' onChange={handleChange} name='password' value={password} required />
        <div className='buttons-container'>
          <Button onClick={handleSubmit} type='submit' >Sign In</Button>
          <Button type='button' buttonType={`google`} onClick={signInWithGoogle}>Google sign in</Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;