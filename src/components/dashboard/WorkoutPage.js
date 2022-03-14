import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Table, Button } from 'react-bootstrap';
import { ColoredText } from '../styles/Global.styled';
import { FiArrowLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import { db } from '../../firebase.config';
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  deleteDoc,
} from 'firebase/firestore';
import LoadingSpinner from '../LoadingSpinner';

const WorkoutPage = () => {
  const { id } = useParams();
  const [data, setData] = useState();
  const navigate = useNavigate();

  const userCollectionRef = collection(db, 'workouts');

  const handleDelete = async () => {
    if (window.confirm('Do you want to delete this workout?')) {
      const userDoc = doc(db, 'workouts', id);
      try {
        await deleteDoc(userDoc);
        navigate('/dashboard');
      } catch (err) {
        console.log(err.message);
        alert('Sorry. Something went wrong.');
      }
    }
  };

  useEffect(() => {
    const getData = async () => {
      const q = query(userCollectionRef, where('__name__', '==', id));

      const newData = await getDocs(q);
      const dataArray = newData.docs.map(doc => ({ ...doc.data() }));
      setData(dataArray[0]);
    };
    getData();
  }, []);

  console.log(data);
  return (
    <>
      <Container className='mt-5'>
        <div className='d-flex w-100 justify-content-between'>
          <Button
            onClick={() => navigate('/dashboard')}
            variant='primary'
            className='mb-2'
          >
            <FiArrowLeft color='white' size='2rem' />
          </Button>
          <Button onClick={handleDelete} style={{ height: 46 }}>
            Delete Workout
          </Button>
        </div>

        {data ? (
          <>
            {' '}
            <h3>
              Workout in {<ColoredText>{data.sport}</ColoredText>} at{' '}
              <ColoredText>{data.date}</ColoredText>
            </h3>
            <Table striped bordered responsive hover className='mt-2'>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Exercise</th>
                  <th>Info</th>
                </tr>
              </thead>
              <tbody>
                {data.exercises &&
                  data.exercises.map((e, idx) => (
                    <tr key={`ex-${idx + 1}`}>
                      <th scope='row'>{idx + 1}</th>
                      <td>{e}</td>
                      <td>{data.exercisesInfo[idx]}</td>
                    </tr>
                  ))}
              </tbody>
            </Table>
            <h4>
              Duration: <ColoredText>{data.duration}</ColoredText>
            </h4>
            <h4>Notes: </h4>
            <p>{data.info || 'It was really fun!'}</p>
          </>
        ) : (
          <LoadingSpinner />
        )}
      </Container>
    </>
  );
};

export default WorkoutPage;
