import Input from '~/components/FormGroup/Input/Input'
import './Checkout.scss'
import { useFormik } from 'formik'
import SelectOptions from '~/components/SelectOptions/SelectOptions'
import { useEffect, useState } from 'react'
import ProvinceService from '~/services/ProvinceService'

const Checkout = () => {
  const [provinces, setProvinces] = useState([])
  const formik = useFormik({
    initialValues: {
      email: '',
    },
  })

  useEffect(() => {
    const fetchData = async () => {
      const res = await ProvinceService.getProvinces({})
      if (res.status === 'OK') {
        const options = res.data.map((province) => {
          return {
            id: province.provinceId,
            name: province.provinceName,
          }
        })
        setProvinces(options)
      }
    }
    fetchData()
  }, [])
  return (
    <div className='checkout'>
      <div className='container'>
        <div className='checkout-menu'>
          <div className='checkout-items'>
            <h2>Thông tin nhận hàng</h2>

            <div className='checkout-items-info'>
              <Input
                name='email'
                labelName='Email (tùy chọn)'
                placeholder='Nhập địa chỉ email...'
                formik={formik}
              />
              <Input
                name='fullname'
                labelName='Họ và tên'
                placeholder='Nhập họ và tên...'
                formik={formik}
              />
              <Input
                name='phone'
                labelName='Số điện thoại'
                placeholder='Nhập số điện thoại...'
                formik={formik}
              />
              <Input
                name='address'
                labelName='Địa chỉ'
                placeholder='Nhập địa chỉ ...'
                formik={formik}
              />
              <SelectOptions
                labelName='Tỉnh/thành phố'
                name='province'
                optionDefault={'--- Chọn tỉnh/thành phố ---'}
                formik={formik}
                options={provinces}
                value='name'
                required
              />
              <Input
                labelName='Ghi chú'
                placeholder=''
                name='password'
                required
                password
                formik={formik}
              />
            </div>
          </div>
          <div className='checkout-items'></div>
          <div className='checkout-items'></div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
