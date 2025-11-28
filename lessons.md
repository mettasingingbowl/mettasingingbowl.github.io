# Lessons Learned

## Mobile Layout - Horizontal Overflow Issue

**Vấn đề:** Nav bar full width nhưng content bên dưới bị hẹp hơn, có khoảng trắng bên phải trên mobile.

**Nguyên nhân:**
1. Pseudo-elements (`::before`, `::after`) với positioning âm như `right: -20%`, `left: -10%` vượt ra ngoài viewport
2. Table có nhiều cột (ví dụ: schedule table 8 cột) gây overflow trên màn hình nhỏ

**Giải pháp:**

```css
html {
  scroll-behavior: smooth;
  overflow-x: hidden;  /* Quan trọng! */
}

body {
  overflow-x: hidden;  /* Cả 2 đều cần */
}
```

Với table rộng, wrap trong container có scroll riêng:
```html
<div style="overflow-x: auto;">
  <table style="min-width: 600px;">...</table>
</div>
```

**Lưu ý:** Cần thêm `overflow-x: hidden` vào CẢ `html` VÀ `body`, chỉ một trong hai có thể không đủ.
