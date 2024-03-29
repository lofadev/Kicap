import Button from '~/components/Button/Button';
import EvoBlogHeader from '~/components/EvoBlogHeader/EvoBlogHeader';
import FormGroup from '~/components/FormGroup/FormGroup';
import './Contact.scss';

const Contact = () => {
  return (
    <section className='contact'>
      <EvoBlogHeader
        title='Liên hệ với chúng tôi'
        image={
          'https://bizweb.dktcdn.net/100/436/596/themes/834446/assets/evo-page-banner.jpg?1689998079606'
        }
        color='black'
      ></EvoBlogHeader>
      <div className='container'>
        <div className='contact-main'>
          <h2 className='contact-head'>Gửi thông tin</h2>
          <p className='contact-desc'>
            Bạn hãy điền nội dung tin nhắn vào form dưới đây và gửi cho chúng tôi. Chúng tôi sẽ trả
            lời bạn sau khi nhận được.
          </p>

          <form action='POST'>
            <FormGroup
              type='input'
              labelName='Họ và tên'
              required
              placeholder='Nhập họ và tên'
              labelFor='fullname'
              className='w-half p-r-10'
            />
            <FormGroup
              type='input'
              labelName='Email'
              required
              placeholder='Nhập địa chỉ email'
              labelFor='email'
              className='w-half p-l-10'
            />
            <FormGroup
              type='input'
              labelName='Điện thoại'
              required
              placeholder='Nhập số điện thoại'
              labelFor='phone-number'
            />
            <FormGroup
              type='text'
              labelName='Nội dung'
              required
              placeholder='Nội dung liên hệ'
              labelFor='content'
            />
            <Button primary className='btn-send-message'>
              Gửi tin nhắn
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
