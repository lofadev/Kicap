import './TextQuantity.scss';

const TextQuantity = ({ quantity, text, totalPage, page, pageSize }) => {
  return (
    <p className='text-quantity'>
      <span>
        Có <strong>{quantity}</strong> {text} trong tổng số <strong>{totalPage}</strong> trang
      </span>

      <span>
        {quantity ? page * pageSize - pageSize + 1 : quantity} -{' '}
        {page * pageSize > quantity ? quantity : page * pageSize} trong số {quantity}
      </span>
    </p>
  );
};

export default TextQuantity;
