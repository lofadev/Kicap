import './Loading.scss';

const Loading = () => {
  return (
    <>
      <div className='overlay'></div>
      <div className='lds-ellipsis'>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </>
  );
};

export default Loading;
