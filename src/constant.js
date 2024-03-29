export const validate = {
  NOT_EMPTY: 'Không được bỏ trống.',
  INVALID_EMAIL: 'Email không hợp lệ.',
  INVALID_PHONE: 'Số điện thoại này phải thuộc vùng Việt Nam.',
  INVALID_PASSWORD:
    'Mật khẩu phải chứa ít nhất (8 kí tự, 1 chữ số, 1 chữ thường, 1 chữ hoa) và không có kí tự đặc biệt.',
  NOT_MATCH_PASSWORD: 'Mật khẩu không trùng khớp.',
};

export const regex = {
  password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
  phone: /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/,
};
