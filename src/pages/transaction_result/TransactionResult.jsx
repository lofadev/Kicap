import { useEffect, useState } from 'react';
import { FaCircleCheck, FaCircleExclamation } from 'react-icons/fa6';
import { axiosInstance } from '~/api/apiConfig';
import Button from '~/components/Button/Button';
import SectionBreadCrumb from '~/components/SectionBreadCrumb/SectionBreadCrumb';
import useQuery from '~/hooks/useQuery';
import './TransactionResult.scss';
import { useDispatch } from 'react-redux';
import { resetCart } from '~/redux/slices/CartSlice';

const TransactionResult = () => {
  const dispatch = useDispatch();
  const querys = useQuery();
  const [result, setResult] = useState();

  useEffect(() => {
    const fetch = async () => {
      const res = await axiosInstance.post('/checkout/vnpay_ipn', querys);
      setResult(res.data);
      if (res.data.code === '00') {
        dispatch(resetCart());
      }
    };

    fetch();
    // const { vnp_ResponseCode } = querys;
    // if (vnp_ResponseCode === '00') {
    //   setResult(true);
    // } else {
    //   setResult(false);
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='transaction-result'>
      <SectionBreadCrumb child={'Kết quả giao dịch'} />

      <div className='container'>
        {result && (
          <>
            <div className='transaction-content'>
              <h2>Kết quả giao dịch</h2>
              <span className={`${result.code === '00' ? 'success' : 'error'}`}>
                {result.code === '00' ? <FaCircleCheck /> : <FaCircleExclamation />}
              </span>
              <h3>{result.message}</h3>
            </div>

            <Button primary to={`${result.code === '00' ? '/' : '/checkout'}`}>
              {result.code === '00' ? 'Về trang chủ' : 'Thanh toán lại'}
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default TransactionResult;
