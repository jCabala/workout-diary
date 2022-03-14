import { useRef, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Exercise } from '../styles/WorkoutForm.styled';
import { db } from '../../firebase.config';
import { collection, addDoc } from 'firebase/firestore';
import { useUserState } from '../../contexts/UserContext';
import PropTypes from 'prop-types';
import { sortByDate } from '../../helper-functions/sortByDate';

const WorkoutForm = ({ setData, data }) => {
  const sportRef = useRef();
  const dateRef = useRef();
  const durationRef = useRef();
  const infoRef = useRef();
  const [exercises, setExercises] = useState([]);
  const userCollectionRef = collection(db, 'workouts');
  const {
    user: { uid },
  } = useUserState();

  const addExercise = () => {
    const newState = [...exercises, { name: '', info: '' }];

    setExercises(newState);
  };

  const removeExercise = () => setExercises(exercises.slice(0, -1));

  const handleNameChange = (idx, val) => {
    const newState = [...exercises];
    newState[idx].name = val;

    setExercises(newState);
  };
  const handleInfoChange = (idx, val) => {
    const newState = [...exercises];
    newState[idx].info = val;

    setExercises(newState);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const ex = exercises.map(e => e.name);
    const exInfo = exercises.map(e => e.info);

    const newWorkout = {
      sport: sportRef.current.value,
      date: dateRef.current.value,
      duration: durationRef.current.value,
      info: infoRef.current.value,
      exercises: [...ex],
      exercisesInfo: [...exInfo],
      userId: uid,
    };

    try {
      await addDoc(userCollectionRef, newWorkout);

      setData([...data, {}].sort(sortByDate));
    } catch (err) {
      console.log(err.message);
      alert('Sorry. Something went wrong.');
    }

    sportRef.current.value = '';
    dateRef.current.value = '';
    durationRef.current.value = '';
    infoRef.current.value = '';
    setExercises([{ name: '', info: '' }]);
  };

  return (
    <Form onSubmit={e => handleSubmit(e)}>
      <legend>Add Your Workout</legend>
      <Form.Group className='mb-3' controlId='formBasicEmail'>
        <Form.Label>Sport</Form.Label>
        <Form.Control
          required
          type='text'
          ref={sportRef}
          placeholder='eg. Bodybuilding'
        />
      </Form.Group>

      <Form.Group className='mb-3' controlId='formBasicEmail'>
        <Form.Label>Date</Form.Label>
        <Form.Control required type='date' ref={dateRef} />
      </Form.Group>

      <Form.Group className='mb-3' controlId='formBasicEmail'>
        <Form.Label>Duration</Form.Label>
        <Form.Control required type='time' ref={durationRef} />
      </Form.Group>

      <Form.Group className='mb-3' controlId='formBasicEmail'>
        <Form.Label>Info</Form.Label>
        <Form.Control as='textarea' rows={3} ref={infoRef} />
      </Form.Group>

      <div className='d-flex'>
        <legend>Exercises:</legend>
        <Button onClick={addExercise}>Add Exercise</Button>
        <Button style={{ marginLeft: 10 }} onClick={removeExercise}>
          Remove Exercise
        </Button>
      </div>
      <div>
        {exercises.map((_, idx) => (
          <Exercise key={`ex_${idx}`}>
            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='eg. Bench Press'
                rows={3}
                value={exercises[idx].name}
                onChange={e => handleNameChange(idx, e.target.value)}
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Label>Info</Form.Label>
              <Form.Control
                as='textarea'
                rows={3}
                value={exercises[idx].info}
                onChange={e => handleInfoChange(idx, e.target.value)}
                placeholder='eg. 4x12:50kg'
              />
            </Form.Group>
          </Exercise>
        ))}
      </div>

      <Button variant='primary' type='submit'>
        Add Workout
      </Button>
    </Form>
  );
};

WorkoutForm.propTypes = {
  setData: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
};

export default WorkoutForm;
