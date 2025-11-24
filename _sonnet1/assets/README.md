# Assets Directory

Thư mục này chứa tất cả các tài nguyên (images, videos, fonts) cho website Metta Singing Bowl.

## Cấu trúc thư mục

```
assets/
├── images/          # Hình ảnh
│   ├── hero-bowl.jpg          # Ảnh chuông xoay cho section giới thiệu
│   ├── dalat-forest.jpg       # Ảnh rừng thông Đà Lạt
│   ├── meditation-scene.jpg   # Ảnh meditation cho trang About
│   └── ...
├── videos/          # Video
│   └── hero-background.mp4    # Video background cho hero section
└── fonts/           # Custom fonts (nếu cần)
```

## Hướng dẫn thêm assets

### 1. Thêm ảnh mới

**Bước 1:** Download ảnh từ nguồn miễn phí:
- Unsplash: https://unsplash.com
- Pexels: https://www.pexels.com
- Pixabay: https://pixabay.com

**Bước 2:** Optimize ảnh:
- Resize về độ phân giải phù hợp (1200-2000px width)
- Compress bằng TinyPNG.com hoặc Squoosh.app
- Đặt tên file rõ ràng: `singing-bowl-hands.jpg`, `dalat-pine-forest.jpg`

**Bước 3:** Copy vào `assets/images/`

**Bước 4:** Sử dụng trong HTML:
```html
<img src="assets/images/ten-file.jpg" alt="Mô tả ảnh" loading="lazy">
```

### 2. Thêm video background

**Nguồn video miễn phí chất lượng cao:**
- Pixabay Videos: https://pixabay.com/videos/
- Videezy: https://videezy.com
- Pexels Videos: https://www.pexels.com/videos/

**Keywords tìm kiếm:**
- "water ripples"
- "sand waves"
- "calm water meditation"
- "zen garden"
- "peaceful nature"

**Yêu cầu video:**
- Duration: 10-30 giây (loopable)
- Resolution: 1080p (1920x1080)
- Format: MP4 (H.264)
- Dung lượng: < 5MB (đã compress)

**Cách thêm:**

1. Download video về
2. (Optional) Compress video:
   - Online: https://www.freeconvert.com/video-compressor
   - Settings: Bitrate 2-4 Mbps, 1080p hoặc 720p
3. Lưu vào `assets/videos/hero-background.mp4`
4. Update trong `index.html`:

```html
<!-- Tìm section .hero-section, thay đổi: -->
<video class="video-background" autoplay muted loop playsinline>
    <source src="assets/videos/hero-background.mp4" type="video/mp4">
</video>
```

### 3. Thêm custom fonts (advanced)

Nếu muốn dùng font tự host thay vì Google Fonts:

1. Download font từ Google Fonts (format: TTF hoặc WOFF2)
2. Copy vào `assets/fonts/`
3. Thêm vào CSS:

```css
@font-face {
    font-family: 'CustomFont';
    src: url('assets/fonts/CustomFont-Regular.woff2') format('woff2');
    font-weight: 400;
    font-display: swap;
}

body {
    font-family: 'CustomFont', sans-serif;
}
```

## Checklist Assets cần thiết

### Ảnh bắt buộc:
- [ ] `hero-bowl.jpg` - Ảnh chuông xoay chuyên nghiệp
- [ ] `dalat-forest.jpg` - Ảnh rừng thông Đà Lạt
- [ ] `meditation-scene.jpg` - Ảnh sound healing/meditation

### Ảnh tuỳ chọn (nâng cao trải nghiệm):
- [ ] `about-portrait.jpg` - Ảnh chân dung Giang Hoàng
- [ ] `workshop-1.jpg`, `workshop-2.jpg` - Ảnh các workshop/retreat
- [ ] `singing-bowl-collection.jpg` - Ảnh bộ sưu tập chuông
- [ ] `dalat-studio.jpg` - Ảnh studio/không gian Metta tại Đà Lạt

### Video:
- [ ] `hero-background.mp4` - Video background (water/sand ripples)
- [ ] (Optional) `about-video.mp4` - Video giới thiệu

### Icons/Logo:
- [ ] `favicon.ico` - Icon cho browser tab
- [ ] `logo.png` - Logo Metta (nếu có)
- [ ] `logo-white.png` - Logo trắng (cho footer)

## Tối ưu Performance

### Ảnh:
- Format: JPG cho photos, PNG cho graphics/logo
- Quality: 70-80% compression
- Max width: 2000px (retina display)
- Thêm `loading="lazy"` cho ảnh dưới fold

### Video:
- Max size: 5-10MB
- Format: MP4 (H.264 codec)
- Duration: 10-30s (loop)
- Bitrate: 2-4 Mbps

## Tools đề xuất

### Compress ảnh:
- TinyPNG: https://tinypng.com (best!)
- Squoosh: https://squoosh.app
- ImageOptim (macOS app)

### Compress video:
- HandBrake: https://handbrake.fr (free, powerful)
- Online: https://www.freeconvert.com/video-compressor
- FFmpeg (command line, advanced)

### Resize ảnh:
- Photopea: https://www.photopea.com (free Photoshop online)
- Canva: https://www.canva.com

## Lưu ý quan trọng

⚠️ **Copyright:**
- Chỉ dùng ảnh/video có license miễn phí thương mại
- Unsplash, Pexels, Pixabay đều OK
- Đọc license trước khi dùng

⚠️ **Dung lượng:**
- Tổng assets < 50MB để website load nhanh
- Mỗi ảnh < 500KB sau khi compress
- Video < 10MB

⚠️ **Backup:**
- Giữ bản gốc ở chỗ khác
- Commit vào Git để không mất

---

Happy designing! 🎨
