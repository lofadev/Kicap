import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from 'react-icons/md';
import ReactPaginate from 'react-paginate';
import './Pagination.scss';

const Pagination = ({ pageCount, onClickPageItem: handleClickPageItem, currentPage }) => {
  return (
    <div className='product-pagination'>
      <ReactPaginate
        breakLabel='...'
        nextLabel={<MdKeyboardDoubleArrowRight />}
        marginPagesDisplayed={1}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel={<MdKeyboardDoubleArrowLeft />}
        renderOnZeroPageCount={null}
        containerClassName='pagination'
        pageClassName='page-item'
        onPageChange={handleClickPageItem}
        initialPage={(Number(currentPage) || 1) - 1}
      ></ReactPaginate>
    </div>
  );
};

export default Pagination;
