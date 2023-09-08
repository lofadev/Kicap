import "./WarrantyPolicy.scss";
import EvoBlogHeader from "../../components/EvoBlogHeader/EvoBlogHeader";

const WarrantyPolicy = () => {
  return (
    <section className="warranty-policy">
      <EvoBlogHeader title="Chính sách bảo hành"></EvoBlogHeader>
      <div className="warranty-policy-content">
        <div className="container">
          <p>
            <strong>Kicap </strong>
            bảo hành qua số điện thoại đặt hàng của quý khách. Kể từ khi xuất kho, hệ thống sẽ tự tạo phiếu bảo hành cho
            sản phẩm của quý khách theo thời gian bảo hành đã thông báo trên website (trừ các sản phẩm không sử dụng
            điện như keycap, núm xoay, dụng sụ mods, switch, v.v.v)
          </p>
          <p>
            <strong>A. Địa điểm bảo hành:</strong>
          </p>
          <p>- Toàn bộ sản phẩm được phân phối và bán lẻ bởi Kicap đều được bảo hành tại địa chỉ của Kicap</p>
          <p>
            - Đối với những đơn hàng mua hàng từ xa, quý khách vui lòng gọi điện, nhắn tin qua Fanpage, Shopee, Zalo để
            được Kicap hỗ trợ xác định tình trạng sản phẩm
          </p>
          <p>- Với các trường hợp bảo hành từ xa, quy trình bảo hành thực hiện như sau:</p>
          <p>
            + Quý khách vui lòng đóng gói kỹ sản phẩm để đảm bảo an toàn khi vận chuyển hàng. Kicap sẽ không chịu trách
            nhiệm khi có các lỗi phát sinh do quá trình vận chuyển.
          </p>
          <p>
            + Bên ngoài kiện hàng vui lòng ghi Tên, SĐT và Địa chỉ của quý khách để shop tiện liên lạc và gửi hàng lại.
          </p>
          <p>- Gửi sản phẩm về địa chỉ của Kicap. Chi phí chuyển phát chiều gửi đi quý khách vui lòng tự thanh toán.</p>
          <p>
            - Sau khi bảo hành xong, Kicap sẽ liên hệ gửi lại sản phẩm về địa chỉ mà quý khách cung cấp. Chi phí vận
            chuyển chiều gửi lại do Kicap thanh toán
          </p>
          <p>
            <strong>B. Những trường hợp sau không được bảo hành:</strong>
          </p>
          <p>
            - Các sản phẩm không còn nguyên tem niêm phong, tem QC, có hiện tượng bị tháo rời để tự ý can thiệp vào kết
            cấu bên trong của sản phẩm.
          </p>
          <p>
            - Sử dụng nguồn sạc điện trực tiếp đối với các thiết bị không dây, dẫn tới hỏng hóc linh kiện và chức năng
            sử dụng pin của bàn phím
          </p>
          <p>- Hư hỏng do tác động vật lý của người tiêu dùng như rơi vỡ, va chạm, vào nước, ẩm thấp, chập cháy.</p>
          <p>- Hư hỏng do thiên tai, động vật, công trùng và do con người gây ra;</p>
          <p>- Hiện tượng rỉ sét do yếu tố thời tiết, độ ẩm, thói quen người dùng đều không được bảo hành;</p>
          <p>- Hết thời hạn bảo hành kể từ ngày nhận được hàng;</p>
          <p>- Khách hàng tự ý can thiệp vào firmware của sản phẩm.</p>
          <p>
            <strong>C. Các trường hợp khác sẽ được bảo hành theo tiêu chuẩn của nhà sản xuất.</strong>
          </p>
          <p>
            - Cụ thể với bàn phím cơ sẽ được bảo hành các lỗi phát sinh do nhà sản xuất mà không phải do người dùng:
            Hỏng mạch, chết led, lỗi kết nối.
          </p>
          <p>
            - Các sản phẩm không sử dụng điện như Keycap, Switch, Keypuller, Swich Puller, Lube Station... đều không bảo
            hành
          </p>
        </div>
      </div>
    </section>
  );
};

export default WarrantyPolicy;
