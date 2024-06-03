import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import PropTypes from 'prop-types';
import { FaCheck, FaEdit, FaTimes } from 'react-icons/fa';
import { IoMdRemoveCircle } from 'react-icons/io';
import { TfiMenuAlt } from 'react-icons/tfi';
import { Link } from 'react-router-dom';
import { formatPriceToVND } from '~/utils/utils';
import './DataTable.scss';

export default function DataTable({
  head,
  rows,
  keys,
  handleOpenDelete,
  action,
  updateTo,
  gobackID,
  isDetails = false,
  isOrder = false,
  isActions = false,
  handleRemoveOrder,
  handleOpenUpdate = () => {},
}) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow sx={{ backgroundColor: 'var(--blue)', color: 'var(--white)' }}>
            {head?.map((item) => (
              <TableCell key={item} sx={{ color: 'white' }}>
                {item}
              </TableCell>
            ))}
            {(isActions || isDetails || isOrder) && (
              <TableCell sx={{ color: 'white', width: '100px', textAlign: 'center' }}>
                {action}
              </TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row) => (
            <TableRow key={row.id} hover>
              {keys.map((key, index) => {
                if (key === 'isLocked')
                  return (
                    <TableCell sx={{ textAlign: 'center', width: '100px' }} key={index}>
                      {row[key] ? <FaCheck style={{ display: 'inline-block' }} /> : ''}
                    </TableCell>
                  );
                else if (key === 'image') {
                  return (
                    <TableCell key={index}>
                      <img className='image-cell' src={row[key]} alt='' />
                    </TableCell>
                  );
                } else if (key === 'price' || key === 'totalPrice') {
                  return <TableCell key={index}>{formatPriceToVND(row[key])}</TableCell>;
                } else return <TableCell key={index}>{row[key]}</TableCell>;
              })}
              {(isActions || isOrder || isDetails) && (
                <TableCell className='btn-actions'>
                  {isDetails && (
                    <Link
                      to={`/admin/${updateTo}/${row.id}`}
                      style={{ color: 'var(--blue)', display: 'inline-block' }}
                      state={gobackID}
                    >
                      <TfiMenuAlt />
                    </Link>
                  )}
                  {isOrder && (
                    <button
                      onClick={handleRemoveOrder}
                      style={{ color: 'var(--red)', width: '50px' }}
                    >
                      <IoMdRemoveCircle />
                    </button>
                  )}
                  {isActions && (
                    <>
                      <Link
                        to={updateTo ? `/admin/${updateTo}/update/${row.id}` : ''}
                        style={{ color: 'var(--blue)', display: 'inline-block' }}
                        state={gobackID}
                        onClick={() => handleOpenUpdate(row.id)}
                      >
                        <FaEdit />
                      </Link>
                      <button
                        onClick={() => handleOpenDelete(row.id)}
                        style={{ color: 'var(--red)' }}
                      >
                        <FaTimes />
                      </button>
                    </>
                  )}
                </TableCell>
              )}
            </TableRow>
          ))}
          {!rows.length && (
            <TableRow>
              <TableCell sx={{ textAlign: 'center' }} colSpan={head.length + 1}>
                Không tìm thấy kết quả phù hợp hoặc dữ liệu không tồn tại.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

DataTable.propTypes = {
  head: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
  keys: PropTypes.array.isRequired,
};
