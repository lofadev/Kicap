import { Link } from 'react-router-dom';
import { nav } from '~/../data';
import CollapsiblePlus from '../CollapsiblePlus/CollapsiblePlus';
import './AsideCategory.scss';

const AsideCategory = () => {
  return (
    <aside className='aside-category'>
      <div className='aside-title'>
        <h3 className='title-head'>Danh mục</h3>
      </div>
      <div className='aside-content'>
        <ul className='nav nav-category'>
          {nav.map((item) => {
            return (
              <li key={item.id} className='nav-item'>
                <Link to={item.navigate} className='nav-link'>
                  {item.name}
                </Link>
                {(item.hasChild || item.hasMega) && <CollapsiblePlus />}
                {item.hasChild && (
                  <ul className='dropdown-menu'>
                    {item.children.map((submenu) => (
                      <li className='nav-item' key={submenu.id}>
                        <Link className='nav-link' to={submenu.navigate}>
                          {submenu.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
                {item.hasMega && (
                  <ul className='dropdown-menu'>
                    {item.children.map((submenu) => (
                      <li className='dropdown-submenu nav-item' key={submenu.id}>
                        <Link className='nav-link' to={submenu.navigate}>
                          {submenu.name}
                        </Link>
                        {submenu.sub_children.length > 0 && <CollapsiblePlus />}
                        {submenu.sub_children && (
                          <ul className='dropdown-menu'>
                            {submenu.sub_children.map((subitem) => (
                              <li className='nav-item' key={subitem.id}>
                                <Link className='nav-link' to={subitem.navigate}>
                                  {subitem.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
};

export default AsideCategory;
