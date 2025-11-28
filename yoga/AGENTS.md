# Hướng dẫn cho AI Agents

## Chiến lược ảnh: Nhúng Base64 vào HTML

Website sử dụng **single-file approach** - tất cả ảnh được nhúng trực tiếp vào `index.html` dưới dạng base64 data URI.

---

## Thông số chốt

| Thông số | Giá trị |
|----------|---------|
| Format | **WebP** |
| Tool | **cwebp** (cài: `sudo apt install webp`) |
| Quality | **75** |
| Target | **~40KB** (base64 trong HTML) |
| Size mặc định | **600x500px** |

**Lưu ý:** Kích thước WxH cần scan CSS trong `index.html` để tối ưu cho từng vị trí ảnh.

---

## Kích thước theo CSS class

| CSS Class | Container | Khuyến nghị WxH | Ghi chú |
|-----------|-----------|-----------------|---------|
| `.grid-img` | 568x500px | **600x500** | Ảnh trong grid-2, có `object-fit: cover` |
| `.img-placeholder` | 100% x 500px | **600x500** | Placeholder |
| *(thêm class mới khi cần)* | | | |

---

## Quy trình

### 1. Lưu ảnh gốc vào `assets/`

### 2. Xác định kích thước
- Tìm CSS class của `<img>` trong `index.html`
- Tra bảng trên để lấy WxH phù hợp

### 3. Optimize với cwebp

```bash
# Resize bằng ffmpeg
ffmpeg -i assets/INPUT.jpg \
  -vf "scale=W:H:force_original_aspect_ratio=increase,crop=W:H" \
  assets/INPUT_resized.jpg

# Convert WebP với cwebp
cwebp -q 75 assets/INPUT_resized.jpg -o assets/INPUT_opt.webp

# Dọn dẹp
rm assets/INPUT_resized.jpg
```

### 4. Kiểm tra size
```bash
du -h assets/INPUT_opt.webp  # Target: ~30KB (base64 sẽ ~40KB)
```

### 5. Tạo base64 và nhúng HTML
```bash
base64 -w 0 assets/INPUT_opt.webp
```

```html
<!-- Source: assets/INPUT.jpg | Optimized: WxH WebP q75 -->
<img src="data:image/webp;base64,..." alt="Mô tả" class="grid-img">
```

---

## Cấu trúc assets/

```
assets/
├── giang-avatar.jpg      # Gốc
├── giang-avatar_opt.webp # Optimized (600x500, q75)
└── ...
```

---

## Checklist

- [ ] Ảnh gốc lưu `assets/`
- [ ] Xác định WxH từ CSS class
- [ ] Chạy ffmpeg + cwebp
- [ ] Size ~30KB (base64 ~40KB)
- [ ] Comment source trong HTML
- [ ] Test browser
