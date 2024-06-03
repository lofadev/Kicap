import { Link } from 'react-router-dom';
import { menu } from '~/../data';
import CollapsiblePlus from '../CollapsiblePlus/CollapsiblePlus';
import './AsideCategory.scss';
import { useEffect, useState } from 'react';
import { axiosInstance } from '~/api/apiConfig';

const AsideCategory = () => {
  const [menuState, setMenuState] = useState(menu);

  useEffect(() => {
    const fetchMenu = async () => {
      const res = await axiosInstance.get('/product/get-menu');
      if (res.data.status === 'OK') {
        const newMenu = menuState.map((menu) => {
          if (menu.id === 3) {
            return {
              ...menu,
              children: res.data.data,
            };
          }
          return menu;
        });
        setMenuState(newMenu);
      }
    };

    fetchMenu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <aside className='aside-category'>
      <div className='aside-title'>
        <h3 className='title-head'>Danh mục</h3>
      </div>
      <div className='aside-content'>
        <ul className='nav nav-category'>
          {menuState.map((item) => {
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
                        <Link className='nav-link' to={'?category=' + submenu.name}>
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
                        <Link className='nav-link' to={`?category=${submenu.name}`}>
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
