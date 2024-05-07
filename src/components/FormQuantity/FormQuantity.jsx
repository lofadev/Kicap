import './FormQuantity.scss';

const FormQuantity = ({
  quantity,
  onDecreaseQuantity,
  onIncreaseQuantity,
  onChangeQuantity,
  ...props
}) => {
  return (
    <div className='form-quantity'>
      <button className='btn-cts' onClick={onDecreaseQuantity}>
        -
      </button>
      <input value={quantity} id='quantity' type='text' onChange={onChangeQuantity} {...props} />
      <button className='btn-cts' onClick={onIncreaseQuantity}>
        +
      </button>
    </div>
  );
};

export default FormQuantity;
