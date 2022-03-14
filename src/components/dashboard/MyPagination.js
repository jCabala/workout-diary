import { Pagination } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { theme } from '../styles/theme';

const MyPagination = ({ dataPage, setDataPage, numPerPage, dataLength }) => {
  const length = Math.ceil(dataLength / numPerPage);

  return (
    <Pagination>
      <Pagination.Prev onClick={() => setDataPage(Math.max(dataPage - 1, 1))} />
      <Pagination.Item onClick={() => setDataPage(1)}>{1}</Pagination.Item>
      <Pagination.Ellipsis disabled />
      <Pagination.Item active>{dataPage}</Pagination.Item>

      <Pagination.Ellipsis disabled />
      <Pagination.Item onClick={() => setDataPage(length)}>
        {length}
      </Pagination.Item>
      <Pagination.Next
        onClick={() => setDataPage(Math.min(dataPage + 1, length))}
      />
    </Pagination>
  );
};

MyPagination.propTypes = {
  dataPage: PropTypes.number.isRequired,
  setDataPage: PropTypes.func.isRequired,
  numPerPage: PropTypes.number.isRequired,
  dataLength: PropTypes.number.isRequired,
};

export default MyPagination;
