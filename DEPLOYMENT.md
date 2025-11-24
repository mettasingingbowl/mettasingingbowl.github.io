# Hướng dẫn Deploy Website Metta Singing Bowl

## Tổng quan

Document này hướng dẫn chi tiết cách deploy website lên Internet với 3 options miễn phí phổ biến nhất.

## Pre-deployment Checklist

Trước khi deploy, đảm bảo:

- [ ] Đã test website locally (mở `index.html` trên browser)
- [ ] Đã thay thế tất cả ảnh placeholder
- [ ] Đã cập nhật thông tin liên hệ (email, phone, địa chỉ)
- [ ] Đã thêm video background (nếu muốn)
- [ ] Đã test responsive trên mobile (F12 > Device Toolbar)
- [ ] Đã optimize tất cả ảnh/video (compress)
- [ ] Đã test tất cả links nội bộ

## Option 1: Netlify (ĐỀ XUẤT CHO NGƯỜI MỚI) ⭐

### Ưu điểm:
- ✅ Cực kỳ đơn giản (drag & drop)
- ✅ HTTPS miễn phí tự động
- ✅ Deploy lại dễ dàng
- ✅ Custom domain miễn phí
- ✅ Form handling (nếu cần contact form sau này)
- ✅ CDN toàn cầu (website nhanh khắp thế giới)

### Bước deploy:

**Bước 1:** Chuẩn bị files
```bash
cd /home/t/mettasingingbowl
# Đảm bảo có đủ files:
# - index.html
# - about.html
# - assets/ (với ảnh/video của bạn)
```

**Bước 2:** Vào Netlify
1. Mở https://www.netlify.com
2. Click "Sign up" (có thể dùng GitHub, Google, hoặc Email)
3. Sau khi đăng nhập, vào dashboard

**Bước 3:** Deploy
1. Click "Add new site" > "Deploy manually"
2. Kéo thả toàn bộ folder `mettasingingbowl` vào
3. Chờ 10-30 giây
4. ✅ Xong! Bạn có URL kiểu: `https://random-name-123.netlify.app`

**Bước 4:** Đổi tên site (optional)
1. Vào "Site settings" > "Change site name"
2. Đổi thành: `mettasingingbowl` hoặc tên khác
3. URL mới: `https://mettasingingbowl.netlify.app`

**Bước 5:** Custom domain (nếu đã mua domain)
1. Vào "Domain settings"
2. Click "Add custom domain"
3. Nhập: `mettasingingbowl.com`
4. Follow hướng dẫn config DNS

### Update website sau khi deploy:

**Cách 1: Drag & Drop lại**
- Vào site dashboard
- Click "Deploys" tab
- Drag & drop folder mới
- Netlify tự động update

**Cách 2: Connect với Git (recommended)**
- Push code lên GitHub
- Vào Netlify > "Add new site" > "Import from Git"
- Connect GitHub repo
- Mỗi lần push lên GitHub, Netlify tự động deploy

---

## Option 2: GitHub Pages (MIỄN PHÍ MÃI MÃI)

### Ưu điểm:
- ✅ Miễn phí không giới hạn
- ✅ Tích hợp với Git (version control)
- ✅ Phù hợp cho developers
- ✅ HTTPS miễn phí

### Nhược điểm:
- ❌ Phức tạp hơn Netlify một chút
- ❌ Không có form handling

### Bước deploy:

**Bước 1: Cài đặt Git (nếu chưa có)**
```bash
# Kiểm tra Git đã có chưa
git --version

# Nếu chưa có, cài đặt:
# Ubuntu/Debian:
sudo apt-get install git

# macOS:
brew install git
```

**Bước 2: Config Git lần đầu**
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

**Bước 3: Tạo GitHub repository**
1. Vào https://github.com
2. Đăng ký/đăng nhập
3. Click dấu "+" > "New repository"
4. Đặt tên: `mettasingingbowl`
5. Chọn "Public"
6. **KHÔNG** check "Add README"
7. Click "Create repository"

**Bước 4: Push code lên GitHub**
```bash
cd /home/t/mettasingingbowl

# Initialize Git (nếu chưa có)
git init

# Add tất cả files
git add .

# Commit
git commit -m "Initial commit - Metta Singing Bowl website"

# Đổi branch sang main
git branch -M main

# Add remote (thay YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/mettasingingbowl.git

# Push lên GitHub
git push -u origin main
```

**Bước 5: Enable GitHub Pages**
1. Vào repository trên GitHub
2. Click "Settings" (tab trên cùng)
3. Scroll xuống "Pages" ở sidebar trái
4. Trong "Source":
   - Branch: chọn `main`
   - Folder: chọn `/root`
5. Click "Save"
6. Chờ 2-3 phút

**Bước 6: Truy cập website**
- URL: `https://YOUR_USERNAME.github.io/mettasingingbowl/`
- GitHub sẽ hiển thị URL này trong Settings > Pages

### Custom domain với GitHub Pages:

**Nếu bạn có domain `mettasingingbowl.com`:**

1. Vào Settings > Pages
2. Trong "Custom domain", nhập: `mettasingingbowl.com`
3. Click "Save"
4. Vào nhà cung cấp domain (Namecheap, GoDaddy, etc.)
5. Thêm DNS records:
   ```
   Type: A
   Name: @
   Value: 185.199.108.153
   
   Type: A
   Name: @
   Value: 185.199.109.153
   
   Type: A
   Name: @
   Value: 185.199.110.153
   
   Type: A
   Name: @
   Value: 185.199.111.153
   
   Type: CNAME
   Name: www
   Value: YOUR_USERNAME.github.io
   ```
6. Chờ 24-48 giờ để DNS propagate

### Update website:
```bash
# Edit files...

git add .
git commit -m "Update content"
git push

# GitHub Pages tự động rebuild trong 1-2 phút
```

---

## Option 3: Vercel (NHANH & HIỆN ĐẠI)

### Ưu điểm:
- ✅ Rất nhanh (CDN edge network)
- ✅ Easy deploy như Netlify
- ✅ Analytics miễn phí
- ✅ Preview deployments (xem trước mỗi thay đổi)

### Bước deploy:

**Bước 1:** Vào Vercel
1. Mở https://vercel.com
2. Sign up với GitHub/Google/Email

**Bước 2:** Deploy

**Cách A: Drag & Drop**
1. Click "Add New" > "Project"
2. Kéo thả folder vào
3. Click "Deploy"
4. ✅ Xong!

**Cách B: Import từ Git (recommended)**
1. Push code lên GitHub trước (xem hướng dẫn GitHub Pages)
2. Vào Vercel > "Add New" > "Project"
3. Click "Import Git Repository"
4. Chọn repo `mettasingingbowl`
5. Click "Deploy"

**Bước 3:** Custom domain
1. Vào project settings
2. Click "Domains"
3. Add domain và follow DNS instructions

---

## So sánh 3 Options

| Feature | Netlify | GitHub Pages | Vercel |
|---------|---------|--------------|--------|
| Dễ sử dụng | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Tốc độ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| HTTPS miễn phí | ✅ | ✅ | ✅ |
| Custom domain | ✅ | ✅ | ✅ |
| Analytics | Có (trả phí) | Không | Có (miễn phí) |
| Form handling | ✅ | ❌ | ❌ |
| Auto deploy từ Git | ✅ | ✅ | ✅ |

### Đề xuất:
- **Người mới bắt đầu:** Netlify
- **Developers (dùng Git):** GitHub Pages hoặc Vercel
- **Cần tốc độ cao nhất:** Vercel

---

## Mua Custom Domain

Sau khi deploy, bạn có thể mua domain `mettasingingbowl.com`:

### Nơi mua domain đề xuất:

1. **Namecheap** (Đề xuất #1)
   - URL: https://www.namecheap.com
   - Giá: ~$10-15/năm
   - Ưu điểm: Giá rẻ, dễ dùng, support tốt
   - Privacy protection miễn phí

2. **Google Domains**
   - URL: https://domains.google.com
   - Giá: ~$12/năm
   - Ưu điểm: Giao diện đơn giản, privacy miễn phí

3. **Cloudflare**
   - URL: https://www.cloudflare.com/products/registrar/
   - Giá: ~$9/năm (giá gốc, không markup)
   - Ưu điểm: Rẻ nhất, CDN miễn phí

### Sau khi mua domain:

1. Vào DNS settings của nhà cung cấp
2. Config DNS theo hướng dẫn của platform bạn chọn (Netlify/GitHub/Vercel)
3. Chờ 1-48 giờ để DNS propagate
4. ✅ Website lên `https://mettasingingbowl.com`

---

## Monitoring & Analytics

### Google Analytics (Miễn phí)

**Bước 1:** Tạo tài khoản
1. Vào https://analytics.google.com
2. Tạo property cho website

**Bước 2:** Lấy tracking code
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

**Bước 3:** Thêm vào `index.html` và `about.html`
- Paste code vào ngay trước tag `</head>`

**Bước 4:** Deploy lại
- Data sẽ bắt đầu hiển thị sau 24-48 giờ

---

## Troubleshooting

### Website không load sau deploy?

**Check:**
1. URL có đúng không?
2. Files có upload đầy đủ không? (index.html phải ở root)
3. Check console (F12) xem có lỗi gì

### Ảnh không hiển thị?

**Fix:**
1. Kiểm tra đường dẫn: `assets/images/file.jpg` (case-sensitive!)
2. Kiểm tra file có tồn tại trong folder deploy không
3. Check browser console (F12)

### Video không chạy?

**Fix:**
1. Đảm bảo có attributes: `autoplay muted loop playsinline`
2. Compress video < 10MB
3. Format phải là MP4 (H.264)

### HTTPS không hoạt động?

**Fix:**
- Netlify/Vercel: Tự động, chờ 1-2 phút
- GitHub Pages: Enable trong Settings > Pages > Enforce HTTPS

### Domain không hoạt động?

**Check:**
1. DNS đã config đúng chưa?
2. Chờ 24-48 giờ để DNS propagate
3. Dùng https://dnschecker.org để check

---

## Security Best Practices

- ✅ Luôn dùng HTTPS (tự động với Netlify/Vercel/GitHub Pages)
- ✅ Không commit sensitive data (API keys, passwords)
- ✅ Regular updates (nếu dùng frameworks sau này)
- ✅ Backup code (Git hoặc download từ hosting)

---

## Next Steps sau khi Deploy

1. **SEO:**
   - Submit sitemap lên Google Search Console
   - Tối ưu meta tags
   - Add structured data (Schema.org)

2. **Performance:**
   - Test trên PageSpeed Insights
   - Optimize images further
   - Add lazy loading

3. **Marketing:**
   - Share URL trên social media
   - Tạo Google My Business listing
   - Email signature với website link

4. **Maintenance:**
   - Update content thường xuyên
   - Check analytics hàng tuần
   - Backup định kỳ

---

## Support & Resources

- **Netlify Docs:** https://docs.netlify.com
- **GitHub Pages Docs:** https://docs.github.com/pages
- **Vercel Docs:** https://vercel.com/docs

Nếu gặp vấn đề, search Google với error message hoặc hỏi ChatGPT/Claude!

---

**Chúc bạn deploy thành công! 🚀**
