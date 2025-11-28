# Hướng dẫn cho AI Agents

## Chiến lược ảnh: Nhúng Base64 vào HTML

Website sử dụng **single-file approach** - tất cả ảnh được nhúng trực tiếp vào `index.html` dưới dạng base64 data URI.

---

## 1. Kết quả nghiên cứu

### So sánh Format ảnh cho Base64 embedding

| Format | Nén so với JPEG | Browser Support | Khuyến nghị |
|--------|-----------------|-----------------|-------------|
| **WebP** | 25-35% nhỏ hơn | 97%+ (2024) | ✅ **Ưu tiên dùng** |
| JPEG | Baseline | 100% | Fallback nếu cần |
| AVIF | 50%+ nhỏ hơn | ~93% | Chưa phổ biến đủ |
| PNG | Lớn hơn nhiều | 100% | Chỉ cho ảnh trong suốt |

**Kết luận:** Dùng **WebP** để tiết kiệm ~30% dung lượng so với JPEG.

### So sánh Tool optimize ảnh

| Tool | Tốc độ | RAM | Chất lượng WebP | Có sẵn |
|------|--------|-----|-----------------|--------|
| **cwebp** (Google) | Nhanh | Thấp | ✅ Tốt nhất | ❌ Cần cài |
| **ffmpeg** | Nhanh | Trung bình | ✅ Tốt | ✅ Có sẵn |
| ImageMagick | Chậm | Cao (~1.2GB) | Trung bình | ✅ Có sẵn |
| libvips | Rất nhanh | Rất thấp (~94MB) | ✅ Tốt | ❌ Cần cài |

**Kết luận:** Dùng **ffmpeg** (có sẵn), hoặc cài **cwebp** để có kết quả tốt nhất.

### Best practices cho Base64 Data URI

- ✅ Phù hợp cho ảnh < 50KB (sau khi optimize)
- ✅ Giảm HTTP requests, đơn giản hóa deployment
- ⚠️ Base64 tăng size ~33% → ảnh 30KB thành ~40KB trong HTML
- ⚠️ Không cache riêng được → mỗi lần load HTML = load lại ảnh
- ❌ Không dùng cho ảnh > 100KB

---

## 2. Thông số tối ưu

### Kích thước ảnh chuẩn

| Thông số | Giá trị | Lý do |
|----------|---------|-------|
| Width | **600px** | Vừa đủ cho container 568px |
| Height | **500px** | Khớp với CSS `height: 500px` |
| Format | **WebP** | Nhỏ hơn JPEG 25-35% |
| Quality | **75-80** | Cân bằng chất lượng/dung lượng |
| Target size | **20-40KB** | Base64 sẽ thành ~27-53KB |

---

## 3. Quy trình chuẩn

### Bước 1: Lưu ảnh gốc
```
assets/
├── ten-anh.jpg         # Ảnh gốc (chất lượng cao, giữ lại)
```

### Bước 2: Optimize với ffmpeg (có sẵn)

```bash
# Cách 1: Xuất WebP (khuyến nghị)
ffmpeg -i assets/TEN_ANH.jpg \
  -vf "scale=600:500:force_original_aspect_ratio=increase,crop=600:500" \
  -quality 75 \
  assets/TEN_ANH_opt.webp

# Cách 2: Xuất JPEG (fallback)
ffmpeg -i assets/TEN_ANH.jpg \
  -vf "scale=600:500:force_original_aspect_ratio=increase,crop=600:500" \
  -q:v 8 \
  assets/TEN_ANH_opt.jpg
```

### Bước 2 (thay thế): Dùng cwebp nếu đã cài

```bash
# Cài đặt (1 lần)
sudo apt install webp

# Convert với cwebp (chất lượng tốt hơn ffmpeg)
# Resize trước bằng ffmpeg, sau đó convert WebP
ffmpeg -i assets/TEN_ANH.jpg \
  -vf "scale=600:500:force_original_aspect_ratio=increase,crop=600:500" \
  assets/TEN_ANH_resized.jpg

cwebp -q 75 assets/TEN_ANH_resized.jpg -o assets/TEN_ANH_opt.webp
rm assets/TEN_ANH_resized.jpg
```

### Bước 3: Tạo Base64 và nhúng HTML

```bash
# Tạo base64 string
base64 -w 0 assets/TEN_ANH_opt.webp

# Hoặc JPEG
base64 -w 0 assets/TEN_ANH_opt.jpg
```

### Bước 4: Nhúng vào HTML

```html
<!-- Source: assets/ten-anh.jpg | Optimized: 600x500 WebP q75 -->
<img src="data:image/webp;base64,UklGRl..." alt="Mô tả" class="grid-img">

<!-- Hoặc JPEG -->
<!-- Source: assets/ten-anh.jpg | Optimized: 600x500 JPEG q8 -->
<img src="data:image/jpeg;base64,/9j/4A..." alt="Mô tả" class="grid-img">
```

---

## 4. Script tiện ích (tùy chọn)

Tạo file `optimize-image.sh` để tự động hóa:

```bash
#!/bin/bash
# Usage: ./optimize-image.sh assets/ten-anh.jpg

INPUT=$1
BASENAME=$(basename "$INPUT" | sed 's/\.[^.]*$//')
OUTPUT_WEBP="assets/${BASENAME}_opt.webp"

# Resize và convert sang WebP
ffmpeg -y -i "$INPUT" \
  -vf "scale=600:500:force_original_aspect_ratio=increase,crop=600:500" \
  -quality 75 \
  "$OUTPUT_WEBP"

# Hiển thị kích thước
echo "Original: $(du -h "$INPUT" | cut -f1)"
echo "Optimized: $(du -h "$OUTPUT_WEBP" | cut -f1)"

# Tạo base64
echo ""
echo "Base64 (copy vào src):"
echo "data:image/webp;base64,$(base64 -w 0 "$OUTPUT_WEBP")"
```

---

## 5. Cấu trúc thư mục

```
assets/
├── giang-avatar.jpg          # Ảnh gốc (chất lượng cao)
├── giang-avatar_opt.webp     # Ảnh đã optimize (600x500, WebP q75)
├── [ten-anh].jpg             # Ảnh gốc khác
└── [ten-anh]_opt.webp        # Ảnh optimize tương ứng
```

---

## 6. Checklist khi thêm ảnh mới

- [ ] Lưu ảnh gốc vào `assets/`
- [ ] Chạy optimize (ffmpeg hoặc cwebp)
- [ ] Kiểm tra size < 50KB
- [ ] Tạo base64
- [ ] Thêm comment source trong HTML
- [ ] Test hiển thị trên browser

---

## 7. Lưu ý quan trọng

- **Luôn giữ ảnh gốc** trong `assets/` để có thể re-optimize sau
- **Comment source file** trong HTML: `<!-- Source: assets/xxx.jpg -->`
- **Tối đa 10 ảnh** nhúng (~500KB-1MB HTML max)
- **WebP fallback**: Nếu cần hỗ trợ browser cũ, dùng JPEG
- **Kiểm tra size** sau khi base64: nên < 70KB per image
