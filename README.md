# Health Post AI V3 — chỉ văn bản

Ứng dụng PWA cho Windows/Android, lịch đăng theo từng ngày, tên bài/giờ/trạng thái, xem trước, chỉnh sửa, duyệt, đổi ngày giờ, cảnh báo trùng, CSV/JSON, tự sao chép nội dung và mở Facebook. **Không tự động đăng Facebook cá nhân**. **Không cần OpenAI API**.

## Cài đặt nhanh trên GitHub Pages
1. Giải nén ZIP. Tải **các file bên trong thư mục** `health_post_ai_v3` lên gốc repository GitHub (để `index.html` nằm ở gốc).
2. Settings > Pages > Deploy from a branch > `main` > `/ (root)` > Save.
3. Mở `https://TEN_GITHUB.github.io/TEN_REPO/` bằng Chrome trên PC/Android. Chọn Install app hoặc Thêm vào màn hình chính.

## Đồng bộ Firebase (cần thực hiện trước khi đưa lên GitHub Pages)
1. Tạo project tại https://console.firebase.google.com/ .
2. Project settings > Your apps > thêm Web app. Sao chép các giá trị cấu hình Web (`apiKey`, `authDomain`, `projectId`, `appId`). Dán vào file `firebase-config.js` thay `null` bằng object cấu hình.
3. Build > Authentication > Sign-in method > bật **Google**. Thêm domain GitHub Pages (`TEN_GITHUB.github.io`) vào **Authorized domains** của Firebase Authentication (nếu chưa có). Không thêm giao thức `https://` hoặc đường dẫn repository.
4. Build > Firestore Database > Create database. Chọn vùng phù hợp. Tab Rules: dán **toàn bộ nội dung `firestore.rules`** và Publish. KHÔNG dùng rules cho phép tất cả người dùng đọc/ghi.
5. Tải các file đã cập nhật lên GitHub Pages. Đăng nhập Google cùng tài khoản trên cả hai thiết bị. Firestore sẽ đồng bộ bài viết.
6. Để chỉ tài khoản của bạn truy cập, ngoài rules theo UID, nên triển khai thêm allowlist UID cụ thể trong Firestore Rules; xem mục bên dưới.

### Khóa quyền truy cập về đúng một tài khoản
Rules mặc định tách dữ liệu theo UID: người khác có thể đăng nhập bằng Google nếu ứng dụng công khai, nhưng **không thể đọc dữ liệu của bạn**. Nếu muốn cấm hoàn toàn người khác sử dụng, sửa dòng `allow read, write` thành:

```
allow read, write: if request.auth != null && request.auth.uid == userId && request.auth.uid == 'UID_GOOGLE_CUA_BAN';
```

Thay `UID_GOOGLE_CUA_BAN` bằng UID từ Authentication > Users của Firebase sau khi đăng nhập lần đầu. Sau đó Publish rules.

## Cần biết
- Không dùng Firebase Storage vì chỉ lưu văn bản. Gói Spark miễn phí có giới hạn; cần kiểm tra hạn mức và chính sách hiện hành.
- Chưa có thông báo đẩy khi ứng dụng đóng: thông báo đến giờ chỉ hiện khi mở app. Không có máy chủ tự chạy lịch.
- Chưa có đồng bộ ngoại tuyến hai chiều hoặc xử lý xung đột nâng cao. Khi offline, Firestore SDK có thể lưu thao tác tạm trong bộ nhớ; nên chờ trạng thái "Đã kết nối" trước khi đóng app.
- Dữ liệu local của V2 **không tự chuyển** sang V3. Hãy sao lưu V2 và nhập dữ liệu tương thích (CSV là lựa chọn đơn giản nhất). File JSON V2 có thể nhập nếu có trường `id,title,body,topic,publish_at` hợp lệ; bài được đưa về chờ duyệt.
- Mã nguồn ở repository Public có thể xem công khai. Firebase Web config không phải mật khẩu, nhưng không đưa service-account/private key lên GitHub. Firestore Rules và Authentication mới là hàng rào bảo vệ dữ liệu.
- Không nhập thông tin tài chính, mật khẩu, OTP hoặc thông tin sức khỏe nhạy cảm vào nội dung.
- Nếu không cấu hình Firebase, ứng dụng hoạt động ở chế độ lưu local trên từng thiết bị (không đồng bộ).
