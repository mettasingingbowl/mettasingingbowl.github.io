# Giang Metta - Brand Identity

## Hai mặt của Giang Metta

### 1. BÊN NGOÀI - Giao tiếp & Thể hiện
**Cá tính · Nổi bật · Năng lượng tốt · Mạnh mẽ**

- **Cá tính**: Không giống ai, có chất riêng, không theo đám đông
- **Nổi bật**: Đậm nét, không nhạt nhòa, gây ấn tượng ngay
- **Năng lượng tốt**: Tích cực, lan tỏa, thu hút
- **Mạnh mẽ**: Tự tin, vững chãi, có sức nặng

→ Dùng cho: OG images, social media, marketing, first impression

### 2. BÊN TRONG - Bản chất & Chiều sâu
**Âm thanh · Tĩnh lặng · Chữa lành**

- Quay về với chính mình
- Tĩnh lặng bên trong, không hào nhoáng
- Chữa lành tự nhiên, không ép buộc
- Sâu lắng, có chiều sâu nội tâm
- "Càng tu thì càng phải giữ kín cho riêng mình"

→ Khía cạnh này chỉ thấy được khi **tiếp xúc đủ lâu và đủ sâu**
→ Dùng cho: Nội dung website, trải nghiệm dịch vụ thực tế, giá trị cốt lõi

## Địa điểm
**Đà Lạt** - sương mù, rừng thông, núi đồi, thanh bình, cao nguyên

## Color Palette
| Token | Hex | Cảm giác |
|-------|-----|----------|
| sage-light | #C5D5BC | Nhẹ nhàng, tươi mát |
| sage | #9CAF88 | Cân bằng, tự nhiên |
| sage-deep | #7A9668 | Sâu lắng |
| forest | #4A5D3E | Trầm, vững chãi |
| earth | #3D4A35 | Gốc rễ, nền tảng |
| cream | #FDFBF7 | Tinh khiết |
| cream-warm | #F7F3EB | Ấm áp |
| sand | #E8E2D5 | Đất, tự nhiên |
| gold-soft | #C9B896 | Ánh sáng dịu |

## Typography
- **Headings**: Cormorant Garamond (serif) - thanh lịch, cổ điển
- **Body**: Quicksand (sans-serif) - hiện đại, dễ đọc

## Visual Style
- Minimalist, không rối rắm
- Soft gradients (cream → sand)
- Ánh sáng dịu, sương mù
- Thiên nhiên: rừng thông, núi đồi Đà Lạt
- Con người trong thiền định, tĩnh lặng
- KHÔNG: hào nhoáng, chói lọi, quá sặc sỡ

## Hình ảnh đại diện nên có
- Sương mù Đà Lạt, rừng thông
- Người ngồi thiền (silhouette)
- Ánh sáng sớm mai xuyên qua cây
- Tông màu ấm: sage, forest, cream, gold
- Cảm giác: bình an, sâu lắng, nội tâm

## KHÔNG nên
- Singing bowl làm trung tâm (chuông chỉ là công cụ)
- Màu sắc quá chói hoặc neon
- Hình ảnh "spiritual" sáo rỗng
- Quá nhiều hiệu ứng lấp lánh

## Quote đặc trưng
> "Ai chọn chuông xoay, trước hết là chọn quay về với chính mình. Rồi từ sự tĩnh lặng đó, bạn mới đủ âm vang để dẫn dắt người khác trở về."

> "Âm thanh đẹp không đến từ kỹ thuật hoàn hảo, mà từ sự hiện diện trọn vẹn. Khi tâm tĩnh, tay mềm, âm thanh tự nhiên trong trẻo."

---

## Quy trình tạo Quiz mới

### 1. Tạo file HTML
- Copy từ quiz template có sẵn (VD: `trac_nghiem_luan_xa.html`)
- Điều chỉnh màu sắc theo site (main: sage/forest, yoga: terracotta/earth-brown)
- Đảm bảo iOS Safari compatible: Web Share API, `:has()` fallback, smooth scroll

### 2. Tạo OG Image (BẮT BUỘC sau khi tạo quiz)
```bash
# Dùng illust_sh để tạo ảnh
cd ~/mx/illust_sh
./illust_v2.1.sh "Mô tả ảnh OG cho quiz [tên quiz]..." \
  --format facebook --quality 2K --work-dir [tên-quiz]-og

# Resize về 1200x630 và optimize
cd [thư-mục-assets]
ffmpeg -y -i ~/mx/illust_sh/[tên-quiz]-og/output.png \
  -vf "scale=1200:630:force_original_aspect_ratio=decrease,pad=1200:630:(ow-iw)/2:(oh-ih)/2" \
  -q:v 2 og-[tên-quiz].jpg
```

### 3. Cập nhật meta tags
```html
<meta property="og:image" content="https://mettasingingbowl.github.io/[path]/assets/og-[tên].jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
```

### 4. Thêm vào navigation
- Desktop nav: `<ul class="nav-links">`
- Mobile nav: `<div class="mobile-menu">`

### 5. Test
- Chạy edge cases với Node.js
- Test trên iPhone Safari thực tế
- Dùng Facebook Sharing Debugger để verify OG image
