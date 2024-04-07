import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { MdDeleteForever } from 'react-icons/md';
import '../FormGroup.scss';

const InputFile = ({ labelName = '', required = false, name = '', formik, imageURL }) => {
  const { errors, handleBlur, setFieldValue } = formik;
  const error = errors[name];
  const hasError = Boolean(error);
  const [image, setImage] = useState(imageURL ?? '');
  const [key, setKey] = useState(1);
  const inputRef = useRef();

  useEffect(() => {
    return () => {
      if (image) {
        setImage('');
        URL.revokeObjectURL(image);
      }
    };
  }, [image, imageURL]);

  const handleChangeFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFieldValue('image', file);
      if (file?.type.includes('image')) {
        setImage(URL.createObjectURL(file));
      }
    }
  };

  const handleDeleteImage = () => {
    setFieldValue('image', '');
    setImage('');
    setKey((key) => key + 1);
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
          onChange={handleChangeFile}
          onBlur={handleBlur}
          accept='image/*'
          ref={inputRef}
          key={key}
        />
      </div>

      {(image || imageURL) && (
        <div className='preview-image'>
          {image && (
            <button onClick={() => handleDeleteImage()}>
              <MdDeleteForever />
            </button>
          )}
          <img src={image || imageURL} alt='' />
        </div>
      )}

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
