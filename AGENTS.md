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

**Dùng g3pip (gemini-3-pro-image-preview) từ pptx_sh:**
```bash
# Load API key
source ~/mx/pptx_sh/keys.sh

# Generate image với g3pip
curl -s -X POST \
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-pro-image-preview:generateContent" \
  -H "x-goog-api-key: $GEMINI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"contents":[{"parts":[{"text":"PROMPT_MÔ_TẢ_ẢNH"}]}],"generationConfig":{"responseModalities":["IMAGE"]}}' \
  | jq -r '.candidates[0].content.parts[0].inlineData.data' | base64 -d > output.jpg

# Resize về 1200x630
ffmpeg -y -i output.jpg \
  -vf "scale=1200:630:force_original_aspect_ratio=decrease,pad=1200:630:(ow-iw)/2:(oh-ih)/2:color=#F5F0E8" \
  -q:v 2 og-[tên-quiz].jpg
```

**Style OG image:**
- Background cream sạch (#F5F0E8), KHÔNG border/frame
- KHÔNG text trên ảnh
- Biểu tượng/silhouette elegant với soft glow
- Minimalist, spiritual, premium wellness style

**Ví dụ prompt tốt (Dosha quiz):**
```
Create a 1200x630 elegant wellness image. Clean cream/beige background. 
Show 3 human silhouettes in different yoga poses representing Dosha elements:
- LEFT - VATA (Air): standing gracefully with arms raised up, purple/lavender swirl glow
- CENTER - PITTA (Fire): warrior II pose, orange/gold flame glow at solar plexus  
- RIGHT - KAPHA (Water): seated meditation in water drop shape, teal glow at heart
Each silhouette soft and ethereal. NO TEXT, NO BORDERS, NO FRAMES.
```

**Nguyên tắc thiết kế:**
| Yếu tố | Nên | Không nên |
|--------|-----|-----------|
| Background | Cream sạch | Busy, gradient phức tạp |
| Biểu tượng | Silhouette mờ + glow | Cartoon, quá chi tiết |
| Màu sắc | 2-3 màu chủ đạo | Rainbow, neon |
| Tư thế người | Đa dạng, có ý nghĩa | Giống nhau, nằm như chết |
| Text | KHÔNG | Có chữ |

**Tham khảo:**
- `assets/og-chakra.jpg` - 7 lotus mandalas
- `assets/og-energy.jpg` - Golden waves trừu tượng
- `yoga/assets/og-dosha.jpg` - 3 silhouettes yoga poses

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

---

## Nguyên tắc làm việc cho AI Assistant

### Chủ động phát hiện vấn đề
AI cần **chủ động phát hiện** các vấn đề tiềm ẩn trong codebase và đề xuất giải pháp, không chỉ làm theo yêu cầu.

**Ví dụ các vấn đề cần chú ý:**
- **Social sharing không cá nhân hóa**: Khi user share kết quả quiz lên Facebook, OG image/title là chung cho cả quiz → không hấp dẫn → cần tạo trang kết quả riêng cho từng loại với OG riêng
- **Mobile UX issues**: Thiếu fallback cho iOS Safari, thiếu touch-friendly buttons
- **SEO thiếu sót**: Thiếu meta tags, structured data, sitemap
- **Performance**: Images chưa optimize, thiếu lazy loading
- **Accessibility**: Thiếu alt text, contrast kém, thiếu ARIA labels

### Cách đề xuất
1. Phát hiện vấn đề khi review code hoặc thực hiện task
2. Giải thích ngắn gọn vấn đề và tác động
3. Đề xuất giải pháp cụ thể, khả thi
4. Hỏi user có muốn implement không trước khi làm

### Pattern đã áp dụng: Personalized Quiz Results
Khi tạo quiz có nhiều kết quả khác nhau:
```
/results/
  ├── [quiz]-[result-type-1].html  ← OG riêng cho kết quả 1
  ├── [quiz]-[result-type-2].html  ← OG riêng cho kết quả 2
  └── ...

Quiz chính redirect đến trang kết quả phù hợp với params:
window.location.href = 'results/[type].html?score=X&param=Y';
```

Đã implement cho:
- Dosha Quiz: 7 kết quả (vata, pitta, kapha, dual, tri)
- Năng lượng Quiz: 5 mức năng lượng
- Luân xa Quiz: 7 chakra (theo luân xa yếu nhất)

---

## Bài học UX

### Share Result > Share Quiz Link
**Vấn đề:** Trang kết quả có 2 nút: "Chia sẻ kết quả" và "Gửi link trắc nghiệm"

**Bài học:** Chỉ cần nút "Chia sẻ kết quả" vì:
1. **Motivation cao hơn**: User muốn khoe kết quả của mình, không phải quảng cáo quiz
2. **Đã có link về quiz**: Trang kết quả có link "Làm lại trắc nghiệm" và khi bạn bè click vào kết quả được share, họ tự tìm được quiz
3. **Đơn giản hơn**: Ít lựa chọn = ít confusion = conversion tốt hơn

**Nguyên tắc:** Khi thiết kế CTA, chọn 1 action chính thay vì cho nhiều options làm user phân vân.
