import { useCallback, useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa6';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Box from '~/components/Admin/Box/Box';
import DataTable from '~/components/DataTable/DataTable';
import ModalConfirm from '~/components/ModalConfirm/ModalConfirm';
import ProductVariantService from '~/services/ProductVariantService';

const ShowProductVariant = ({ productID }) => {
  const dispatch = useDispatch();
  const [productVariants, setProductVariants] = useState([]);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(false);

  const fetchData = useCallback(async () => {
    const res = await ProductVariantService.getProductVariants(productID, dispatch);
    if (res.status === 'OK') {
      const productVariants = res.data.map((variant) => {
        return {
          id: variant._id,
          name: variant.name,
          value: variant.value,
          price: variant.price,
          stock: variant.stock,
          discount: variant.discount,
          displayOrder: variant.displayOrder,
          toImageOrder: variant.toImageOrder,
        };
      });
      setProductVariants(productVariants);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOpenDeleteVariant = (id) => {
    setOpen(true);
    setId(id);
  };

  const handleDelete = async () => {
    setOpen(false);
    const res = await ProductVariantService.deleteProductVariant(id, dispatch);
    if (res.status === 'OK') fetchData();
  };
  return (
    <>
      <Box title='Biến thể của sản phẩm'>
        <DataTable
          head={[
            'Tên thuộc tính',
            'Giá trị thuộc tính',
            'Giá',
            'Tồn kho',
            'Giảm giá',
            'Thứ tự hiển thị',
            'Đi đến thứ tự hình ảnh',
          ]}
          rows={productVariants}
          keys={['name', 'value', 'price', 'stock', 'discount', 'displayOrder', 'toImageOrder']}
          action={
            <Link to='/admin/product/variant/add' state={productID} className='btn-add'>
              <FaPlus />
            </Link>
          }
          updateTo={'product/variant'}
          handleOpenDelete={handleOpenDeleteVariant}
          gobackID={productID}
          isActions
        />
      </Box>
      <ModalConfirm
        desc={'Bạn có muốn xoá biến thể này không ?'}
        handleClose={() => setOpen(false)}
        handleDelete={handleDelete}
        open={open}
      ></ModalConfirm>
    </>
  );
};

export default ShowProductVariant;
