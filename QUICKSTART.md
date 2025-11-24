# Quick Start Guide - Metta Singing Bowl Website

## 🚀 Bắt đầu ngay trong 5 phút

### 1. Mở website
```bash
# Mở file index.html bằng browser
open index.html
# Hoặc double-click vào file index.html
```

### 2. Thay thế ảnh (QUAN TRỌNG!)

**Ảnh cần thay:**
- `index.html` dòng ~380: Ảnh chuông xoay
- `index.html` dòng ~625: Ảnh Đà Lạt/rừng thông
- `about.html` dòng ~198: Ảnh meditation/sound healing

**Cách thay nhanh:**
1. Download ảnh về từ Unsplash/Pexels
2. Tạo folder `assets/images/`
3. Copy ảnh vào đó
4. Tìm `<img src="https://images.squarespace..."` và thay bằng `<img src="assets/images/ten-anh.jpg"`

### 3. Thay thông tin liên hệ

Tìm trong `index.html`:
```html
<!-- Dòng ~668 -->
<a href="mailto:info@mettasingingbowl.com">  
<!-- Thay email -->

<a href="tel:+84123456789">
<!-- Thay số điện thoại -->

<!-- Dòng ~678 -->
Địa chỉ: Đà Lạt, Lâm Đồng
<!-- Update địa chỉ cụ thể -->
```

### 4. Deploy lên Internet (chọn 1 trong 3)

#### Option A: Netlify (DỄ NHẤT) ⭐

1. Vào https://netlify.com
2. Đăng ký/đăng nhập
3. Kéo thả toàn bộ folder vào
4. ✅ Xong! Website live trong 30 giây

#### Option B: GitHub Pages (MIỄN PHÍ MÃI MÃI)

```bash
cd /home/t/mettasingingbowl
git init
git add .
git commit -m "Initial commit"
# Tạo repo trên github.com, rồi:
git remote add origin https://github.com/USERNAME/REPONAME.git
git push -u origin main
# Vào Settings > Pages > Enable
```

#### Option C: Vercel (NHANH)

1. Vào https://vercel.com
2. Import project
3. Deploy

## 📝 Checklist nhanh

- [ ] Đã test website trên browser (mở index.html)
- [ ] Đã thay tất cả ảnh placeholder
- [ ] Đã cập nhật email, phone, địa chỉ
- [ ] Đã test trên mobile (F12 > Toggle device toolbar)
- [ ] Đã deploy lên Internet

## 🎨 Customize nhanh

### Đổi màu chủ đạo

Mở `index.html`, tìm dòng ~30:
```css
:root {
    --color-sand: #E5DDD5;      /* Màu nền sáng */
    --color-deep-earth: #9B8B7E; /* Màu button/accent */
}
```
Thay các mã màu này!

### Đổi text rotating

Tìm dòng ~759 trong `index.html`:
```javascript
const rotatingTexts = [
    'một lời mời gọi',
    'một cánh cửa',
    // Thêm từ của bạn ở đây
];
```

## 🆘 Gặp vấn đề?

### Website hiển thị lỗi font?
→ Check internet connection (cần load Google Fonts)

### Ảnh không hiển thị?
→ Kiểm tra đường dẫn: `assets/images/ten-file.jpg` (chính xác tên file)

### Video không chạy? (Nếu bạn đã thêm video)
→ Thêm attributes: `autoplay muted loop playsinline`

## 📚 Đọc thêm

- **README.md** - Hướng dẫn chi tiết đầy đủ
- Cần thêm video background? Xem phần "Cách thay thế VIDEO" trong README.md
- Cần SEO, analytics? Xem phần "SEO Basics" trong README.md

## 💡 Tips Pro

1. **Tối ưu ảnh:** Dùng TinyPNG.com để giảm 70% dung lượng
2. **Test mobile:** Mở browser > F12 > Device toolbar
3. **Custom domain:** Sau khi deploy, mua domain tại Namecheap ($10/năm)

---

Thời gian hoàn thành: **~10 phút** ⏱️

Good luck! 🎵
