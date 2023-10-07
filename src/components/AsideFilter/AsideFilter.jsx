import { filters } from '../../../data';
import AsideItem from '../AsideItem/AsideItem';
import './AsideFilter.scss';

const AsideFilter = () => {
  return (
    <div className='aside-filter'>
      <div className='heading'>tìm theo</div>
      {filters.map((item) => (
        <AsideItem key={item.id} data={item} />
      ))}
    </div>
  );
};

export default AsideFilter;
