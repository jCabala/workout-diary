import { useRef } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../../firebase.config';

const RegisterForm = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const emailLogRef = useRef();
  const passwordLogRef = useRef();

  const register = async e => {
    e.preventDefault();
    const password = passwordRef.current.value;
    const email = emailRef.current.value;
    if (password !== confirmPasswordRef.current.value) {
      alert('Passwords do not match.');
      return;
    }

    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.log(err.message);
    }
  };

  const login = async e => {
    e.preventDefault();
    const email = emailLogRef.current.value;
    const password = passwordLogRef.current.value;
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <Container className='mt-5 p-3'>
        <legend>Register</legend>
        {/* //{auth.currentUser.email} */}
        <Form onSubmit={e => register(e)}>
          <Form.Group className='mb-3'>
            <Form.Control
              ref={emailRef}
              type='email'
              placeholder='Email...'
              required
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Control
              type='password'
              ref={passwordRef}
              placeholder='Password...'
              required
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Control
              type='password'
              ref={confirmPasswordRef}
              placeholder='Confirm Your Password...'
              required
            />
          </Form.Group>
          <Button type='submit'>Sign up</Button>
        </Form>
      </Container>
      <Container>
        <legend>Login</legend>
        <Form onSubmit={e => login(e)}>
          <Form.Group className='mb-3'>
            <Form.Control
              ref={emailLogRef}
              type='email'
              placeholder='Email...'
              required
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Control
              type='password'
              ref={passwordLogRef}
              placeholder='Password...'
              required
            />
          </Form.Group>

          <Button type='submit'>Log in</Button>
        </Form>
      </Container>
    </>
  );
};

export default RegisterForm;
