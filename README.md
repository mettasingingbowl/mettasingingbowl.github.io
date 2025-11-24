# Metta Singing Bowl - Website Documentation

## Tổng quan

Website **Metta Singing Bowl** được thiết kế với phong cách sang trọng, tĩnh lặng, lấy cảm hứng từ saraauster.com. Website sử dụng:

- **HTML5 Semantic** - Cấu trúc tốt cho SEO
- **Tailwind CSS** - Framework CSS hiện đại, responsive
- **Custom CSS** - Bảng màu pastel trầm, typography sang trọng
- **Vanilla JavaScript** - Animations và interactive effects

## Cấu trúc Files

```
mettasingingbowl/
├── index.html          # Trang chủ
├── about.html          # Trang câu chuyện Metta
├── README.md           # File này - hướng dẫn
└── assets/             # (Tạo thư mục này để chứa ảnh/video của bạn)
    ├── videos/
    ├── images/
    └── fonts/
```

## Bảng màu chính

Website sử dụng bảng màu pastel trầm, sang trọng:

```css
--color-sand: #E5DDD5        /* Màu cát sáng */
--color-cream: #F5F1ED       /* Màu kem */
--color-earth: #C9BDB1       /* Màu đất */
--color-deep-earth: #9B8B7E  /* Màu đất đậm */
--color-forest: #6B7A6E      /* Màu rừng xanh */
--color-text-dark: #3A3531   /* Màu chữ đậm */
--color-text-light: #6B6560  /* Màu chữ nhạt */
```

## Fonts

- **Tiêu đề (Headings)**: Lora (serif) - Sang trọng, cổ điển
- **Nội dung (Body)**: Inter (sans-serif) - Hiện đại, dễ đọc

## Tính năng chính

### 1. Hero Section với Animated Background
- Hiệu ứng gradient animation giống sóng nước
- Text rotating: "Âm thanh là..." với các từ thay đổi
- Responsive trên mọi thiết bị

### 2. Smooth Scroll & Fade-in Animations
- Mượt mà khi cuộn trang
- Các elements fade in khi xuất hiện trong viewport

### 3. Responsive Navigation
- Fixed navigation với blur effect
- Thay đổi khi scroll

## Cách thay thế VIDEO BACKGROUND

### Bước 1: Download video từ các nguồn miễn phí

Tôi đề xuất các nguồn:
- **Pixabay**: https://pixabay.com/videos/search/calm%20water/
- **Videezy**: https://videezy.com/free-video/calm-waves
- **Pexels**: https://www.pexels.com/search/videos/water%20ripple/

Tìm video với keywords: "water ripples", "sand waves", "calm water", "meditation nature"

### Bước 2: Tải video về

1. Chọn video phù hợp (tối ưu: độ dài 10-30s, loop được)
2. Download ở quality **1080p** (balance giữa chất lượng và dung lượng)
3. Lưu vào thư mục: `assets/videos/hero-background.mp4`

### Bước 3: Thay thế trong code

Mở file `index.html`, tìm section `.hero-section` (khoảng dòng 367), thay đổi:

**TÌM:**
```html
<!-- Animated Water Background -->
<div class="water-animation"></div>
<div class="video-overlay"></div>
```

**THAY BẰNG:**
```html
<!-- Video Background -->
<video class="video-background" autoplay muted loop playsinline>
    <source src="assets/videos/hero-background.mp4" type="video/mp4">
</video>
<div class="video-overlay"></div>
```

### Bước 4: Tối ưu video (tuỳ chọn)

Nếu video quá nặng, bạn có thể compress bằng:
- **Online**: https://www.freeconvert.com/video-compressor
- **Software**: HandBrake (miễn phí)

**Settings đề xuất:**
- Resolution: 1920x1080 hoặc 1280x720
- Bitrate: 2-4 Mbps
- Format: MP4 (H.264)

## Cách thay thế ẢNH

### 1. Tìm ảnh phù hợp

**Nguồn ảnh miễn phí chất lượng cao:**
- **Unsplash**: https://unsplash.com
- **Pexels**: https://www.pexels.com
- **Pixabay**: https://pixabay.com

**Keywords tìm kiếm:**
- "singing bowl meditation"
- "sound healing therapy"
- "tibetan bowl"
- "meditation hands"
- "yoga therapy"
- "peaceful nature dalat"
- "pine forest vietnam"

**Phong cách ảnh:**
- Tông màu warm, pastel, muted colors
- Ánh sáng tự nhiên, soft light
- Minimal, có nhiều negative space
- Thể hiện sự tĩnh lặng, chuyên nghiệp

### 2. Các vị trí ảnh trong website

#### A. Trang chủ (index.html)

**Ảnh 1: Introduction Section** (dòng ~380)
```html
<img src="https://images.squarespace-cdn.com/.../koshi+hand.png" 
     alt="Singing Bowl - Chuông xoay">
```
👉 Thay bằng: Ảnh chuông xoay hoặc tay cầm chuông, phong cách chuyên nghiệp

**Ảnh 2: Location Section** (dòng ~625)
```html
<img src="https://images.squarespace-cdn.com/.../Home+sand+bkg.jpg" 
     alt="Đà Lạt - Rừng thông">
```
👉 Thay bằng: Ảnh rừng thông Đà Lạt, thiên nhiên yên bình

#### B. Trang About (about.html)

**Ảnh 1: Image Break Section** (dòng ~198)
```html
<img src="https://images.squarespace-cdn.com/.../Sounds_Blue.png" 
     alt="Sound healing meditation">
```
👉 Thay bằng: Ảnh người thực hành sound healing, meditation, hoặc abstract art về âm thanh

### 3. Cách thay thế ảnh

**Bước 1:** Download ảnh về và lưu vào `assets/images/`
- Đặt tên dễ nhớ: `hero-bowl.jpg`, `dalat-forest.jpg`, `meditation-scene.jpg`

**Bước 2:** Optimize ảnh trước khi upload
- Resize về độ phân giải phù hợp (1200-2000px chiều rộng)
- Compress để giảm dung lượng (70-80% quality)
- Tools: TinyPNG, Squoosh.app, hoặc Photoshop

**Bước 3:** Update trong HTML
```html
<!-- VÍ DỤ -->
<img src="assets/images/hero-bowl.jpg" 
     alt="Chuông xoay Metta Singing Bowl"
     loading="lazy">
```

**Lưu ý:** Thêm `loading="lazy"` để tối ưu performance!

## Cách CUSTOMIZE nội dung

### 1. Thay đổi màu sắc

Mở file `index.html` hoặc `about.html`, tìm section `<style>` ở đầu file, thay đổi trong `:root`:

```css
:root {
    --color-sand: #E5DDD5;        /* Thay đổi màu này */
    --color-cream: #F5F1ED;       /* Thay đổi màu này */
    /* ... */
}
```

**Tool chọn màu:** https://coolors.co

### 2. Thay đổi Typography

Tìm và thay đổi Google Fonts:

```html
<!-- Tìm dòng này -->
<link href="https://fonts.googleapis.com/css2?family=Lora:...&family=Inter:..." rel="stylesheet">

<!-- Thay bằng font khác từ Google Fonts -->
```

**Đề xuất các font sang trọng:**
- Serif: Lora, Playfair Display, Cormorant, Crimson Pro
- Sans-serif: Inter, Work Sans, Outfit, Manrope

### 3. Thay đổi text rotating

Tìm trong `index.html` (dòng ~759):

```javascript
const rotatingTexts = [
    'một lời mời gọi',
    'một cánh cửa',
    'một hướng dẫn',
    'một hành trình',
    'sự chữa lành'
];
```

Thêm hoặc thay đổi các từ trong array này!

### 4. Thay đổi thông tin liên hệ

Tìm section `#lien-he` trong `index.html` (dòng ~660), update:

```html
<a href="mailto:info@mettasingingbowl.com" class="btn-primary">GỬI EMAIL</a>
<a href="tel:+84123456789" class="btn-secondary">GỌI ĐIỆN</a>
```

Và các thông tin địa chỉ, email, phone phía dưới.

## Cách DEPLOY website

### Option 1: GitHub Pages (MIỄN PHÍ, ĐỀ XUẤT)

**Bước 1:** Tạo GitHub repository
```bash
cd /home/t/mettasingingbowl
git init
git add .
git commit -m "Initial commit - Metta Singing Bowl website"
```

**Bước 2:** Push lên GitHub
```bash
# Tạo repo trên github.com trước
git remote add origin https://github.com/yourusername/mettasingingbowl.git
git branch -M main
git push -u origin main
```

**Bước 3:** Enable GitHub Pages
1. Vào Settings của repo
2. Chọn Pages từ sidebar
3. Source: chọn branch `main` và folder `/root`
4. Save

Website sẽ có URL: `https://yourusername.github.io/mettasingingbowl/`

### Option 2: Netlify (MIỄN PHÍ, DỄ HƠN)

1. Vào https://www.netlify.com
2. Đăng ký/đăng nhập
3. Drag & drop toàn bộ folder `mettasingingbowl` vào Netlify
4. Netlify tự động deploy và cho bạn URL miễn phí

**Ưu điểm:**
- Cực kỳ đơn giản
- HTTPS miễn phí
- Custom domain miễn phí
- Deploy lại chỉ cần drag & drop

### Option 3: Vercel (MIỄN PHÍ)

Tương tự Netlify:
1. Vào https://vercel.com
2. Import GitHub repo hoặc upload folder
3. Deploy tự động

### Custom Domain (Tuỳ chọn)

Sau khi deploy, bạn có thể mua domain `mettasingingbowl.com`:

**Nơi mua domain rẻ:**
- Namecheap: ~$10-15/năm
- Google Domains: ~$12/năm
- Cloudflare: ~$9/năm

Sau đó config DNS trỏ về GitHub Pages/Netlify/Vercel theo hướng dẫn của từng platform.

## Checklist trước khi deploy

- [ ] Đã thay thế tất cả ảnh placeholder
- [ ] Đã test video background (nếu dùng)
- [ ] Đã update thông tin liên hệ (email, phone, địa chỉ)
- [ ] Đã test responsive trên mobile/tablet
- [ ] Đã optimize ảnh (compress, resize)
- [ ] Đã test tất cả links
- [ ] Đã thêm favicon (icon cho tab browser)
- [ ] Đã update meta description cho SEO

## Tối ưu hóa Performance

### 1. Lazy Loading Images

Đã có sẵn trong code:
```html
<img src="..." alt="..." loading="lazy">
```

### 2. Compress Images

- Online: TinyPNG, Squoosh.app
- Giảm 50-70% dung lượng mà không mất quality

### 3. Minify CSS/JS (Khi production)

Dùng tools:
- CSS: https://cssminifier.com
- JS: https://javascript-minifier.com

### 4. Use CDN

Đang dùng Tailwind CSS từ CDN (nhanh, cache tốt)

## SEO Basics

### Đã có sẵn:
- ✅ Meta description
- ✅ Meta keywords
- ✅ Semantic HTML (h1, h2, sections)
- ✅ Alt text cho images

### Nên thêm:
- [ ] Google Analytics
- [ ] Facebook Pixel (nếu chạy ads)
- [ ] Structured Data (Schema.org)

## Troubleshooting

### Video không chạy trên mobile?

Thêm `playsinline` attribute:
```html
<video autoplay muted loop playsinline>
```

### Font không load?

Check internet connection và Google Fonts URL. Có thể download fonts về local.

### Website chậm?

1. Compress images
2. Optimize video (lower bitrate)
3. Enable browser caching

## Liên hệ & Support

Nếu cần hỗ trợ customize hoặc có vấn đề technical:
- Check documentation này trước
- Search Google với error message
- Ask ChatGPT/Claude với error cụ thể

## Credits

- Design inspiration: Sara Auster (saraauster.com)
- Fonts: Google Fonts (Lora, Inter)
- CSS Framework: Tailwind CSS
- Temporary images: Squarespace CDN (thay thế bằng ảnh của bạn)

---

**Made with ❤️ for Metta Singing Bowl**

Chúc bạn thành công với website! 🎵🔔
