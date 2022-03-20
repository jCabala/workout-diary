import { useRef } from 'react';
import { Form, Button } from 'react-bootstrap';
import { db } from '../../firebase.config';
import { collection, addDoc } from 'firebase/firestore';
import { useUserState } from '../../contexts/UserContext';
import PropTypes from 'prop-types';

const GoalsForm = ({ setData, data, getData }) => {
  const goalRef = useRef();
  const collectionRef = collection(db, 'goals');

  const {
    user: { uid },
  } = useUserState();

  const handleSubmit = async e => {
    e.preventDefault();

    const newGoal = {
      goal: goalRef.current.value,
      userId: uid,
      achieved: false,
      date: Date.now(),
    };

    try {
      await addDoc(collectionRef, newGoal);

      getData();
    } catch (err) {
      console.log(err.message);
      alert('Sorry. Something went wrong.');
    }

    goalRef.current.value = '';
  };

  return (
    <Form className='container' onSubmit={e => handleSubmit(e)}>
      <legend>Add Your Goal</legend>
      <Form.Group className='mb-3' controlId='formBasicEmail'>
        <Form.Label>Goal</Form.Label>
        <Form.Control
          required
          type='text'
          ref={goalRef}
          placeholder='eg. 200kg Deadlift'
        />
      </Form.Group>

      <Button variant='primary' type='submit'>
        Add
      </Button>
    </Form>
  );
};

GoalsForm.propTypes = {
  setData: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
  getData: PropTypes.func.isRequired,
};

export default GoalsForm;
