import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { MdDeleteForever } from 'react-icons/md';
import { v4 as uuidv4 } from 'uuid';
import '../FormGroup.scss';

const InputFile = ({ labelName = '', required = false, name = '', formik }) => {
  const { errors, handleBlur, setFieldValue } = formik;
  const error = errors[name];
  const hasError = Boolean(error);
  const [image, setImage] = useState();
  const [key, setKey] = useState(1);
  const inputRef = useRef();

  useEffect(() => {
    console.log(image?.fileUrl);
    return () => {
      image && URL.revokeObjectURL(image.fileUrl);
    };
  }, [image]);

  const handleChangeFile = (e) => {
    const file = e.target.files[0];
    setFieldValue('image', file);
    if (file?.type.includes('image')) {
      setImage({ id: uuidv4(), fileUrl: URL.createObjectURL(file) });
    }
  };

  const handleDeleteImage = () => {
    setFieldValue('image', '');
    setImage();
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

      {image && (
        <div className='preview-image'>
          <button onClick={() => handleDeleteImage(image.id)}>
            <MdDeleteForever />
          </button>
          <img src={image.fileUrl} alt='' />
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
