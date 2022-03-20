import { Section, SectionTitle, Dividor } from '../styles/Global.styled';
import { useEffect, useState } from 'react';
import MyPagination from './MyPagination';
import { Card, Button, Container } from 'react-bootstrap';
import { AddButton } from '../styles/Global.styled';
import WorkoutForm from './WorkoutForm';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { useUserState } from '../../contexts/UserContext';
import { db } from '../../firebase.config';
import { collection, query, where, getDocs } from 'firebase/firestore';
import LoadingSpinner from '../LoadingSpinner';

import { sortByDate } from '../../helper-functions/sortByDate';

const Diary = () => {
  const [data, setData] = useState([]);
  const [dataPage, setDataPage] = useState(1);
  const [formOpened, setFormOpened] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const navigate = useNavigate();

  const {
    user: { uid },
  } = useUserState();

  const userCollectionRef = collection(db, 'workouts');

  const getData = async () => {
    setLoading(true);
    const q = query(userCollectionRef, where('userId', '==', uid));

    const newData = await getDocs(q);

    const dataMapped = newData.docs.map(doc => ({
      ...doc.data(),
      id: doc.id,
    }));

    const dataSorted = dataMapped.sort(sortByDate);
    setData(dataSorted);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  console.log(data);

  return (
    <Section>
      <SectionTitle>Workout Diary</SectionTitle>
      <Dividor />
      <AddButton onClick={() => setFormOpened(!formOpened)}>
        {formOpened ? (
          <AiOutlineMinus size='3rem' color='white' />
        ) : (
          <AiOutlinePlus size='3rem' color='white' />
        )}
      </AddButton>
      {!formOpened ? (
        !isLoading ? (
          <>
            {' '}
            <div className='d-flex flex-wrap'>
              {data.slice((dataPage - 1) * 8, dataPage * 8).map(e => (
                <Card
                  key={e.id}
                  style={{ width: '200px', height: '300px', margin: '10px' }}
                >
                  <Card.Body>
                    <Card.Title>{e.sport}</Card.Title>
                    <Card.Subtitle className='mb-2 text-muted'>
                      Duration: {e.duration} <br />
                      Date: {e.date}
                    </Card.Subtitle>
                    <Card.Text>{e?.info}</Card.Text>
                    <Card.Link href='#'>
                      <Button
                        variant='danger'
                        style={{ position: 'absolute', bottom: 10 }}
                        onClick={() => navigate(`workout/${e.id}`)}
                      >
                        Full Workout
                      </Button>
                    </Card.Link>
                  </Card.Body>
                </Card>
              ))}
            </div>
            <MyPagination
              dataPage={dataPage}
              setDataPage={setDataPage}
              numPerPage={8}
              dataLength={data.length}
            />
          </>
        ) : (
          <LoadingSpinner />
        )
      ) : (
        <Container>
          <WorkoutForm getData={getData} setData={setData} data={data} />
        </Container>
      )}
    </Section>
  );
};

export default Diary;
