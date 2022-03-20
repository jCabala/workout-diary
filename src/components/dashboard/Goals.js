import { Section, SectionTitle, Dividor } from '../styles/Global.styled';
import { Table } from 'react-bootstrap';
import {
  TablesContainer,
  AccomplishedBtn,
  DeleteBtn,
} from '../styles/Goals.styled';
import { AiFillDelete, AiOutlineCheck } from 'react-icons/ai';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { AddButton } from '../styles/Global.styled';
import { useState, useEffect } from 'react';
import GoalsForm from './GoalsForm';
import { db } from '../../firebase.config';
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { useUserState } from '../../contexts/UserContext';
import LoadingSpinner from '../LoadingSpinner';

const Goals = () => {
  const [formOpened, setFormOpened] = useState(false);
  const [isLoading, setLoading] = useState(true);

  const [goals, setGoals] = useState([]);
  const collectionRef = collection(db, 'goals');
  const {
    user: { uid },
  } = useUserState();

  const getData = async () => {
    setLoading(true);
    const q = query(collectionRef, where('userId', '==', uid));

    const newData = await getDocs(q);

    const dataMapped = newData.docs.map(doc => ({
      ...doc.data(),
      id: doc.id,
    }));

    setGoals(dataMapped);
    setLoading(false);
  };

  const deleteGoal = async id => {
    try {
      const docRef = doc(db, 'goals', id);

      await deleteDoc(docRef);

      getData();
    } catch (err) {
      alert('Something went wrong!');
      console.log(err.message);
    }
  };

  const addAchieved = async id => {
    try {
      const docRef = doc(db, 'goals', id);

      await updateDoc(docRef, { achieved: true, date: Date.now() });

      getData();
    } catch (err) {
      alert('Something went wrong!');
      console.log(err.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Section>
      <SectionTitle>Your Goals</SectionTitle>
      <Dividor />
      <AddButton onClick={() => setFormOpened(!formOpened)}>
        {formOpened ? (
          <AiOutlineMinus size='3rem' color='white' />
        ) : (
          <AiOutlinePlus size='3rem' color='white' />
        )}
      </AddButton>
      {!formOpened &&
        (isLoading ? (
          <LoadingSpinner />
        ) : (
          <TablesContainer>
            <h3>Current Goals</h3>
            <Table bordered responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Goal</th>
                  <th>#</th>
                </tr>
              </thead>
              <tbody>
                {goals
                  .filter(e => e.achieved === false)
                  .map((goal, idx) => (
                    <tr key={`goal-${idx + 1}`}>
                      <td style={{ fontWeight: 500, fontSize: '1.25rem' }}>
                        {idx + 1}
                      </td>
                      <td>
                        <p>{goal.goal} </p>
                      </td>
                      <td>
                        <div>
                          <AccomplishedBtn onClick={() => addAchieved(goal.id)}>
                            <AiOutlineCheck size='1.5rem' />
                          </AccomplishedBtn>{' '}
                          <DeleteBtn onClick={() => deleteGoal(goal.id)}>
                            <AiFillDelete size='1.5rem' />
                          </DeleteBtn>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>

            <h3>Achieved Goals</h3>
            <Table bordered responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Goal</th>
                  <th>Accomplished at</th>
                  <th>#</th>
                </tr>
              </thead>
              <tbody>
                {goals
                  .filter(e => e.achieved === true)
                  .map((goal, idx) => {
                    const newDate = new Date(goal.date);

                    const date = newDate.toDateString();

                    return (
                      <tr key={`goal-${idx + 1}`}>
                        <td style={{ fontWeight: 500, fontSize: '1.25rem' }}>
                          {idx + 1}
                        </td>
                        <td>
                          <p>{goal.goal} </p>
                        </td>
                        <td>{date}</td>
                        <td>
                          <div>
                            <DeleteBtn onClick={() => deleteGoal(goal.id)}>
                              <AiFillDelete size='1.5rem' />
                            </DeleteBtn>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
          </TablesContainer>
        ))}

      {formOpened && (
        <GoalsForm getData={getData} data={goals} setData={setGoals} />
      )}
    </Section>
  );
};

export default Goals;
