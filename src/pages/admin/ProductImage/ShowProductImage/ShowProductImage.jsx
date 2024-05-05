import { useCallback, useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa6';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Box from '~/components/Admin/Box/Box';
import DataTable from '~/components/DataTable/DataTable';
import ModalDialog from '~/components/ModalDialog/ModalDialog';
import ProductImageService from '~/services/ProductImageService';

const ShowProductImage = ({ productID }) => {
  const dispatch = useDispatch();
  const [productImages, setProductImages] = useState([]);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(false);

  const handleOpenDeleteImage = (id) => {
    setOpen(true);
    setId(id);
  };

  const fetchData = useCallback(async () => {
    const res = await ProductImageService.getProductImages(productID, dispatch);
    if (res.status === 'OK') {
      const productImages = res.data.map((image) => {
        return {
          id: image._id,
          image: image.image,
          description: image.description,
          displayOrder: image.displayOrder,
          isHidden: image.isHidden,
        };
      });
      setProductImages(productImages);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = async () => {
    setOpen(false);
    const res = await ProductImageService.deleteProductImage(id, dispatch);
    if (res.status === 'OK') fetchData();
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Box title='Thư mục ảnh'>
        <DataTable
          head={['Ảnh', 'Mô tả', 'Thứ tự hiển thị', 'Ẩn ảnh']}
          rows={productImages}
          keys={['image', 'description', 'displayOrder', 'isHidden']}
          action={
            <Link to='/admin/product/image/add' state={productID} className='btn-add'>
              <FaPlus />
            </Link>
          }
          updateTo={'product/image'}
          gobackID={productID}
          handleOpenDelete={handleOpenDeleteImage}
        ></DataTable>
      </Box>
      <ModalDialog
        desc={'Bạn có muốn xoá ảnh này không ?'}
        handleClose={() => setOpen(false)}
        handleDelete={handleDelete}
        open={open}
      ></ModalDialog>
    </>
  );
};

export default ShowProductImage;
