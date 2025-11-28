# Hướng dẫn cho AI Agents

## Chiến lược ảnh: Nhúng Base64 vào HTML

Website sử dụng **single-file approach** - tất cả ảnh được nhúng trực tiếp vào `index.html` dưới dạng base64 data URI.

---

## Thông số chốt

| Thông số | Giá trị |
|----------|---------|
| Format | **WebP** |
| Tool | **cwebp** (cài: `sudo apt install webp`) |
| Quality | **80** |
| Target | **~30KB** WebP (~40KB base64) |
| DPR | **2x** (full retina) |

**Công thức tính size:** `Container_W * 2` x `Container_H * 2` (full retina)

**Lưu ý:** Nếu retina size > ảnh gốc → dùng size ảnh gốc (không upscale)

---

## Kích thước theo CSS class

| CSS Class | Container | Output (2x) | Ghi chú |
|-----------|-----------|-------------|---------|
| `.grid-img` | 568x500px | **1136x1000** | Ảnh trong grid-2, `object-fit: cover` |
| `.img-placeholder` | 568x500px | **1136x1000** | Placeholder |
| *(thêm class mới khi cần)* | | | |

---

## Quy trình

### 1. Lưu ảnh gốc vào `assets/`

### 2. Xác định kích thước
- Tìm CSS class của `<img>` trong `index.html`
- Tra bảng trên để lấy WxH phù hợp

### 3. Optimize với ffmpeg + cwebp

```bash
# Pre-crop về tỷ lệ container rồi resize (ví dụ container 568x500, output 2x = 1136x1000)
ffmpeg -y -i assets/INPUT.jpg \
  -vf "crop=iw:iw*500/568,scale=1136:1000" \
  assets/INPUT_resized.jpg

# Convert WebP với cwebp
cwebp -q 80 assets/INPUT_resized.jpg -o assets/INPUT_opt.webp

# Dọn dẹp
rm assets/INPUT_resized.jpg
```

**Giải thích crop:** `crop=iw:iw*CONTAINER_H/CONTAINER_W` giữ full width, cắt height theo tỷ lệ container.

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
- [ ] Xác định container size từ CSS class
- [ ] Tính output size: container * 1.4
- [ ] Chạy ffmpeg (pre-crop + resize) + cwebp q80
- [ ] Kiểm tra size ~30KB WebP
- [ ] Tạo base64, nhúng HTML với comment source
- [ ] Test browser (desktop + mobile)
