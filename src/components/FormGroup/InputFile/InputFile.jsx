import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { MdDeleteForever } from 'react-icons/md';
import { v4 as uuidv4 } from 'uuid';
import '../FormGroup.scss';

const InputFile = ({ labelName = '', required = false, name = '', formik, multiple }) => {
  const { errors, handleBlur, setFieldValue } = formik;
  const error = errors[name];
  const hasError = Boolean(error);
  const [images, setImages] = useState(JSON.parse(localStorage.getItem('images')) ?? []);
  const [imageDelete, setImageDelete] = useState({});
  const inputRef = useRef();
  const [key, setKey] = useState(1);

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(imageDelete.fileUrl);
    };
  }, [imageDelete]);

  const handleChangeFiles = (e) => {
    const files = e.target.files;
    setFieldValue('images', files);
    const newImages = Array.from(files).map((file) => {
      if (file.type.includes('image')) {
        return {
          id: uuidv4(),
          fileUrl: URL.createObjectURL(file),
        };
      }
    });

    localStorage.setItem('images', JSON.stringify([...images, ...newImages]));
    setImages([...images, ...newImages]);
  };

  const handleDeleteImage = (id) => {
    setKey((prev) => prev + 1);
    const newImages = images.filter((image) => image.id !== id);
    const imgDelete = images.find((image) => image.id === id);
    localStorage.setItem('images', JSON.stringify(newImages));
    setImages(newImages);
    setImageDelete(imgDelete);
  };

  return (
    <div className='form-group'>
      {labelName && (
        <label htmlFor={name}>
          {labelName} {required && <span className='required'>*</span>}
        </label>
      )}

      <div className='input-file'>
        <div className='input-text'>
          <span>Kéo và thả ảnh tại đây</span>
          <span>hoặc</span>
          <span onClick={() => inputRef.current.click()}>chọn ảnh</span>
        </div>
        <input
          id={name}
          name={name}
          type='file'
          className={`form-control ${hasError ? 'border-red' : ''} file-upload`}
          onChange={handleChangeFiles}
          onBlur={handleBlur}
          multiple={multiple}
          accept='image/*'
          ref={inputRef}
          key={key}
        />
      </div>

      <div className='preview-image'>
        {images.map((image) => (
          <div key={image.fileUrl} className='image-items'>
            <button onClick={() => handleDeleteImage(image.id)}>
              <MdDeleteForever />
            </button>
            <img src={image.fileUrl} alt='' />
          </div>
        ))}
      </div>

      {hasError && <span className='form-error'>{error}</span>}
    </div>
  );
};

InputFile.propTypes = {
  name: PropTypes.string.isRequired,
  labelName: PropTypes.string,
  required: PropTypes.bool,
};

export default InputFile;
