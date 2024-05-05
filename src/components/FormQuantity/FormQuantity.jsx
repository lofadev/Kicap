import './FormQuantity.scss';

const FormQuantity = ({ quantity, onDecreaseQuantity, onIncreaseQuantity, onChangeQuantity }) => {
  return (
    <div className='form-quantity'>
      <button className='btn-cts' onClick={onDecreaseQuantity}>
        -
      </button>
      <input value={quantity} id='quantity' type='text' onChange={onChangeQuantity} />
      <button className='btn-cts' onClick={onIncreaseQuantity}>
        +
      </button>
    </div>
  );
};

export default FormQuantity;
