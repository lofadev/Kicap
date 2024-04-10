import './FormQuantity.scss';

const FormQuantity = ({
  quantity,
  handleDecreaseQuantity,
  handleIncreaseQuantity,
  handleOnChangeQuantity,
}) => {
  return (
    <div className='form-quantity'>
      <button className='btn-cts' onClick={handleDecreaseQuantity}>
        -
      </button>
      <input value={quantity} id='quantity' type='text' onChange={handleOnChangeQuantity} />
      <button className='btn-cts' onClick={handleIncreaseQuantity}>
        +
      </button>
    </div>
  );
};

export default FormQuantity;
