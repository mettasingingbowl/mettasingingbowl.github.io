import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Waves,
  Flower2,
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
} from "lucide-react";

/**
 * GIANGMETTA (single-file React component)
 * - 3 menus: Luân xa / Năng lượng tần số / Dosha
 * - Each menu shows ONLY its own content + its own quiz
 * - 3 quizzes: Chakra (20), Energy Frequency (20), Dosha (20)
 * - Clear colors + pretty inline SVG illustrations
 * - Result section with % / scores + easy explanations
 * - Footer: giangmetta.com - thành lập từ 2016
 */

// ---------- UI helpers ----------

const cx = (...a) => a.filter(Boolean).join(" ");

const Card = ({ className = "", children }) => (
  <div
    className={cx(
      "rounded-2xl bg-white/80 backdrop-blur shadow-sm ring-1 ring-black/5",
      className
    )}
  >
    {children}
  </div>
);

const Pill = ({ className = "", children }) => (
  <span
    className={cx(
      "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold",
      className
    )}
  >
    {children}
  </span>
);

const Progress = ({ value }) => (
  <div className="h-2 w-full overflow-hidden rounded-full bg-black/5">
    <div className="h-full rounded-full bg-black/20" style={{ width: `${value}%` }} />
  </div>
);

const BigIllustration = ({ variant = "chakra", tone = "emerald" }) => {
  // Simple, elegant inline SVG. No external assets.
  const tones = {
    red: { a: "#ef4444", b: "#fb7185" },
    orange: { a: "#f97316", b: "#fb923c" },
    amber: { a: "#f59e0b", b: "#fbbf24" },
    emerald: { a: "#10b981", b: "#34d399" },
    sky: { a: "#0ea5e9", b: "#38bdf8" },
    indigo: { a: "#6366f1", b: "#818cf8" },
    violet: { a: "#8b5cf6", b: "#a78bfa" },
    slate: { a: "#64748b", b: "#94a3b8" },
  };
  const t = tones[tone] ?? tones.emerald;

  const common = (
    <>
      <defs>
        <linearGradient id={`g-${variant}-${tone}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={t.a} stopOpacity="0.95" />
          <stop offset="1" stopColor={t.b} stopOpacity="0.95" />
        </linearGradient>
        <radialGradient id={`r-${variant}-${tone}`} cx="50%" cy="40%" r="70%">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.85" />
          <stop offset="1" stopColor={t.b} stopOpacity="0.15" />
        </radialGradient>
      </defs>
      <rect x="0" y="0" width="520" height="240" rx="28" fill={`url(#r-${variant}-${tone})`} />
      <circle cx="420" cy="80" r="56" fill={`url(#g-${variant}-${tone})`} opacity="0.16" />
      <circle cx="100" cy="160" r="72" fill={`url(#g-${variant}-${tone})`} opacity="0.12" />
    </>
  );

  if (variant === "wave") {
    return (
      <svg viewBox="0 0 520 240" className="h-40 w-full">
        {common}
        <path
          d="M0 150 C 60 110, 120 190, 180 150 C 240 110, 300 190, 360 150 C 420 110, 460 170, 520 130"
          fill="none"
          stroke={`url(#g-${variant}-${tone})`}
          strokeWidth="10"
          strokeLinecap="round"
          opacity="0.85"
        />
        <path
          d="M0 175 C 60 135, 120 215, 180 175 C 240 135, 300 215, 360 175 C 420 135, 460 195, 520 155"
          fill="none"
          stroke={`url(#g-${variant}-${tone})`}
          strokeWidth="6"
          strokeLinecap="round"
          opacity="0.55"
        />
        <circle cx="260" cy="120" r="28" fill={`url(#g-${variant}-${tone})`} opacity="0.28" />
      </svg>
    );
  }

  if (variant === "dosha") {
    return (
      <svg viewBox="0 0 520 240" className="h-40 w-full">
        {common}
        <path
          d="M260 55 C 235 55, 215 78, 215 105 C 215 140, 245 160, 260 180 C 275 160, 305 140, 305 105 C 305 78, 285 55, 260 55 Z"
          fill={`url(#g-${variant}-${tone})`}
          opacity="0.22"
        />
        <path
          d="M150 165 C 190 130, 220 135, 260 155 C 300 135, 330 130, 370 165"
          fill="none"
          stroke={`url(#g-${variant}-${tone})`}
          strokeWidth="10"
          strokeLinecap="round"
          opacity="0.75"
        />
        <circle cx="260" cy="112" r="14" fill={`url(#g-${variant}-${tone})`} opacity="0.35" />
      </svg>
    );
  }

  // chakra (lotus-ish)
  return (
    <svg viewBox="0 0 520 240" className="h-40 w-full">
      {common}
      <g transform="translate(260 125)">
        {[...Array(10)].map((_, i) => (
          <path
            key={i}
            d="M0 -70 C 18 -45, 18 -15, 0 0 C -18 -15, -18 -45, 0 -70 Z"
            transform={`rotate(${i * 36})`}
            fill={`url(#g-${variant}-${tone})`}
            opacity={0.08 + (i % 2) * 0.05}
          />
        ))}
        <circle r="20" fill={`url(#g-${variant}-${tone})`} opacity="0.28" />
        <circle r="8" fill="#ffffff" opacity="0.75" />
      </g>
      <path
        d="M90 180 C 150 150, 220 170, 260 188 C 300 170, 370 150, 430 180"
        fill="none"
        stroke={`url(#g-${variant}-${tone})`}
        strokeWidth="6"
        strokeLinecap="round"
        opacity="0.45"
      />
    </svg>
  );
};

// ---------- Quiz data ----------

const LIKERT = [
  { label: "Không bao giờ", v: 0 },
  { label: "Hiếm khi", v: 1 },
  { label: "Thỉnh thoảng", v: 2 },
  { label: "Thường xuyên", v: 3 },
  { label: "Rất thường xuyên", v: 4 },
];

const chakras = [
  {
    key: "root",
    name: "Luân xa Gốc (Root / Muladhara)",
    tone: "red",
    colorLabel: "Đỏ",
    frequency: "396 Hz*",
    location: "Đáy cột sống / đáy chậu",
    represents: "Sinh tồn • An toàn • Nền tảng • Tiền bạc",
    element: "Đất",
    mantra: "LAM",
    keywords: "An toàn • Nền tảng • Niềm tin cuộc sống",
    tips: [
      "Đi bộ chậm, chạm đất bằng chân trần (nếu an toàn).",
      "Thở bụng 4–6 nhịp, chú ý vùng xương cùng/đáy chậu.",
      "Sắp xếp lại không gian sống, ưu tiên giấc ngủ đều.",
    ],
  },
  {
    key: "sacral",
    name: "Luân xa Xương cùng (Sacral / Svadhisthana)",
    tone: "orange",
    colorLabel: "Cam",
    frequency: "417 Hz*",
    location: "Dưới rốn (vùng bụng dưới) / xương cùng",
    represents: "Cảm xúc • Khoái cảm • Sáng tạo • Nữ tính",
    element: "Nước",
    mantra: "VAM",
    keywords: "Cảm xúc • Khoái cảm • Sáng tạo",
    tips: [
      "Uống đủ nước, vận động mềm (hông, xoay khung chậu).",
      "Viết 10 phút về cảm xúc mà không phán xét.",
      "Làm 1 hoạt động sáng tạo nhỏ mỗi ngày (vẽ, nấu ăn, nhạc).",
    ],
  },
  {
    key: "solar",
    name: "Luân xa Đám rối mặt trời (Solar Plexus / Manipura)",
    tone: "amber",
    colorLabel: "Vàng",
    frequency: "528 Hz*",
    location: "Vùng thượng vị (trên rốn, dưới xương ức)",
    represents: "Tự tin • Ý chí • Sức mạnh cá nhân • Ranh giới",
    element: "Lửa",
    mantra: "RAM",
    keywords: "Tự tin • Ý chí • Ranh giới",
    tips: [
      "Tập nói “không” một cách tử tế cho 1 việc nhỏ.",
      "Thở đều và nhẹ (đừng cố quá khi mệt).",
      "Ăn đúng bữa, ưu tiên thực phẩm ấm, dễ tiêu.",
    ],
  },
  {
    key: "heart",
    name: "Luân xa Tim (Heart / Anahata)",
    tone: "emerald",
    colorLabel: "Xanh lá",
    frequency: "639 Hz*",
    location: "Giữa ngực (vùng tim/phổi)",
    represents: "Yêu thương • Đồng cảm • Kết nối • Tha thứ",
    element: "Khí",
    mantra: "YAM",
    keywords: "Yêu thương • Đồng cảm • Tha thứ",
    tips: [
      "Tập mở ngực nhẹ: kéo giãn vai/ngực 2–3 phút.",
      "Viết 3 điều biết ơn mỗi ngày.",
      "Trao – nhận: xin hỗ trợ 1 việc nhỏ thay vì tự gánh.",
    ],
  },
  {
    key: "throat",
    name: "Luân xa Cổ họng (Throat / Vishuddha)",
    tone: "sky",
    colorLabel: "Xanh dương",
    frequency: "741 Hz*",
    location: "Cổ họng / vùng thanh quản",
    represents: "Giao tiếp • Biểu đạt • Sự thật • Ranh giới lời nói",
    element: "Không gian (Ether)",
    mantra: "HAM",
    keywords: "Giao tiếp • Biểu đạt • Sự thật",
    tips: [
      "Nói chậm hơn 10% và thở trước khi trả lời.",
      "Humming (ngân) 1–2 phút để rung cổ họng.",
      "Viết ra điều cần nói rồi chọn 1 câu ngắn để bắt đầu.",
    ],
  },
  {
    key: "thirdEye",
    name: "Luân xa Con mắt thứ ba (Third Eye / Ajna)",
    tone: "indigo",
    colorLabel: "Chàm",
    frequency: "852 Hz*",
    location: "Giữa hai chân mày (vùng trán)",
    represents: "Trực giác • Nhìn sâu • Sáng rõ • Tập trung",
    element: "Ánh sáng",
    mantra: "OM",
    keywords: "Trực giác • Nhìn sâu • Tập trung",
    tips: [
      "Giảm đa nhiệm: 1 việc – 1 thời điểm.",
      "Thiền 5–8 phút, chú ý điểm giữa hai chân mày.",
      "Giảm màn hình 60 phút trước ngủ.",
    ],
  },
  {
    key: "crown",
    name: "Luân xa Đỉnh đầu (Crown / Sahasrara)",
    tone: "violet",
    colorLabel: "Tím",
    frequency: "963 Hz*",
    location: "Đỉnh đầu",
    represents: "Ý nghĩa • Niềm tin • Kết nối tinh thần",
    element: "Ý thức",
    mantra: "Im lặng",
    keywords: "Ý nghĩa • Tâm linh • Kết nối",
    tips: [
      "Thiền quan sát hoặc cầu nguyện theo niềm tin cá nhân.",
      "Ở thiên nhiên (cây xanh/ánh nắng) 10–15 phút.",
      "Giữ thói quen ‘tiếp đất’ (ăn uống, lịch sinh hoạt đều).",
    ],
  },
];

const chakraQuiz = {
  id: "chakra",
  icon: Sparkles,
  title: "Kiểm tra cân bằng luân xa (20 câu)",
  subtitle: "Đánh giá xu hướng thiếu năng lượng / quá tải theo 7 luân xa.",
  variant: "likert",
  questions: [
    // Root
    { t: "Tôi thường lo lắng về an toàn, tiền bạc hoặc chỗ dựa.", chakra: "root", kind: "deficit" },
    { t: "Tôi cứng nhắc, sợ thay đổi và bám chặt thói quen cũ.", chakra: "root", kind: "excess" },
    { t: "Tôi hay thấy mệt mỏi, thiếu sức bền hoặc trì trệ.", chakra: "root", kind: "deficit" },

    // Sacral
    { t: "Tôi khó tận hưởng niềm vui, cảm xúc bị ‘tắt’ hoặc khô cạn.", chakra: "sacral", kind: "deficit" },
    { t: "Tôi dễ sa đà khoái cảm/giải trí, khó dừng lại đúng lúc.", chakra: "sacral", kind: "excess" },
    { t: "Tôi hay cảm thấy tội lỗi khi muốn điều mình thích.", chakra: "sacral", kind: "deficit" },

    // Solar
    { t: "Tôi thiếu tự tin khi quyết định; hay nghi ngờ bản thân.", chakra: "solar", kind: "deficit" },
    { t: "Tôi dễ nóng nảy, muốn kiểm soát người khác hoặc tình huống.", chakra: "solar", kind: "excess" },
    { t: "Tôi hay ‘nuốt giận’ rồi bị đầy bụng/khó tiêu khi căng thẳng.", chakra: "solar", kind: "deficit" },

    // Heart
    { t: "Tôi khó tin tưởng, khó mở lòng hoặc nhận yêu thương.", chakra: "heart", kind: "deficit" },
    { t: "Tôi hay hi sinh quá mức, dễ phụ thuộc cảm xúc vào người khác.", chakra: "heart", kind: "excess" },
    { t: "Tôi giữ nhiều tổn thương cũ và khó tha thứ (cho mình/người khác).", chakra: "heart", kind: "deficit" },

    // Throat
    { t: "Tôi ngại nói ra nhu cầu; sợ bị đánh giá khi bày tỏ.", chakra: "throat", kind: "deficit" },
    { t: "Tôi thường nói nhanh, nói nhiều hoặc cắt lời người khác.", chakra: "throat", kind: "excess" },
    { t: "Tôi hay ‘nói một đằng nghĩ một nẻo’ để chiều lòng người khác.", chakra: "throat", kind: "deficit" },

    // Third eye
    { t: "Tôi khó tập trung, trực giác mờ nhạt hoặc hay hoang mang.", chakra: "thirdEye", kind: "deficit" },
    { t: "Tôi overthink, tự ‘vẽ kịch bản’ và khó dừng suy nghĩ.", chakra: "thirdEye", kind: "excess" },
    { t: "Tôi hay bị đau đầu/nhức vùng trán khi stress.", chakra: "thirdEye", kind: "excess" },

    // Crown
    { t: "Tôi thấy cuộc sống thiếu ý nghĩa, mất kết nối với điều lớn hơn.", chakra: "crown", kind: "deficit" },
    { t: "Tôi dễ ‘bay’/mơ mộng, xa rời thực tế và quên chăm sóc thân thể.", chakra: "crown", kind: "excess" },
  ],
};

const energyQuiz = {
  id: "energy",
  icon: Waves,
  title: "Bài kiểm tra tần số năng lượng (20 câu)",
  subtitle: "Xác định xu hướng rung động: trầm • cân bằng • cao.",
  variant: "likert",
  questions: [
    { t: "Tôi thức dậy với cảm giác biết ơn hoặc hào hứng.", bucket: "high" },
    { t: "Tôi thấy bế tắc, khó thoát khỏi nỗi lo.", bucket: "low" },
    { t: "Tôi dễ mỉm cười hoặc cảm thấy nhẹ nhõm trong ngày.", bucket: "high" },
    { t: "Tôi hay cáu kỉnh/khó chịu vì những việc nhỏ.", bucket: "low" },
    { t: "Tôi có thể bình tĩnh quay về nhịp thở khi căng thẳng.", bucket: "mid" },
    { t: "Tôi thường so sánh bản thân và thấy thiếu thốn.", bucket: "low" },
    { t: "Tôi cảm nhận được tình thương (từ mình/đến người khác) khá thường xuyên.", bucket: "high" },
    { t: "Tôi khó ngủ vì tâm trí chạy liên tục.", bucket: "low" },
    { t: "Tôi giữ lời hứa với bản thân (dù là việc nhỏ).", bucket: "mid" },
    { t: "Tôi hay cảm thấy tội lỗi hoặc tự trách quá mức.", bucket: "low" },
    { t: "Tôi biết đặt ranh giới và nói ‘không’ khi cần.", bucket: "mid" },
    { t: "Tôi cảm thấy cơ thể nặng nề, thiếu sức sống.", bucket: "low" },
    { t: "Tôi có khoảnh khắc ‘flow’ khi làm việc/sáng tạo.", bucket: "high" },
    { t: "Tôi thường xuyên hoài nghi, khó tin vào điều tốt đẹp.", bucket: "low" },
    { t: "Tôi chủ động chăm sóc bản thân: ăn, ngủ, vận động ở mức ổn.", bucket: "mid" },
    { t: "Tôi thấy mình kết nối với mục đích hoặc ý nghĩa cá nhân.", bucket: "high" },
    { t: "Tôi bị cuốn vào drama/xung đột và khó thoát ra.", bucket: "low" },
    { t: "Tôi biết ‘tạm dừng’ trước khi phản ứng nóng.", bucket: "mid" },
    { t: "Tôi dễ tha thứ và buông bớt khi việc không như ý.", bucket: "high" },
    { t: "Tôi thường cảm thấy sợ hãi mơ hồ mà không rõ lý do.", bucket: "low" },
  ],
};

const doshaQuiz = {
  id: "dosha",
  icon: Flower2,
  title: "Kiểm tra Dosha (Vata • Pitta • Kapha) – 20 câu",
  subtitle: "Chọn phương án giống bạn nhất ở thời điểm gần đây.",
  variant: "tri",
  questions: [
    {
      t: "Dáng người của tôi thường:",
      a: "Gầy/nhỏ, xương rõ, khó tăng cân (Vata)",
      b: "Cân đối/đầy cơ, dễ nóng (Pitta)",
      c: "Đậm/khung to, dễ tăng cân (Kapha)",
      map: { a: "vata", b: "pitta", c: "kapha" },
    },
    {
      t: "Da của tôi thường:",
      a: "Khô, dễ nứt, lạnh (Vata)",
      b: "Nhạy cảm, dễ đỏ/nóng (Pitta)",
      c: "Mịn/ẩm, dày hơn (Kapha)",
      map: { a: "vata", b: "pitta", c: "kapha" },
    },
    {
      t: "Khi đói, tôi:",
      a: "Bữa đói bữa không, thất thường (Vata)",
      b: "Rất đói, dễ cáu nếu trễ bữa (Pitta)",
      c: "Đói vừa, có thể nhịn khá lâu (Kapha)",
      map: { a: "vata", b: "pitta", c: "kapha" },
    },
    {
      t: "Tiêu hoá của tôi thường:",
      a: "Hay đầy hơi/khó đoán (Vata)",
      b: "Mạnh, nóng, dễ ợ nóng (Pitta)",
      c: "Chậm, nặng bụng sau ăn (Kapha)",
      map: { a: "vata", b: "pitta", c: "kapha" },
    },
    {
      t: "Nhiệt độ cơ thể tôi:",
      a: "Hay lạnh tay chân (Vata)",
      b: "Hay nóng, dễ đổ mồ hôi (Pitta)",
      c: "Ổn định, chịu lạnh tốt hơn (Kapha)",
      map: { a: "vata", b: "pitta", c: "kapha" },
    },
    {
      t: "Tốc độ nói/làm của tôi:",
      a: "Nhanh, thay đổi, có lúc ‘quá đà’ (Vata)",
      b: "Nhanh – mục tiêu rõ, quyết liệt (Pitta)",
      c: "Chậm rãi, chắc chắn, bền bỉ (Kapha)",
      map: { a: "vata", b: "pitta", c: "kapha" },
    },
    {
      t: "Khi stress, tôi thường:",
      a: "Lo lắng, mất ngủ, nghĩ nhiều (Vata)",
      b: "Cáu/giận, muốn kiểm soát (Pitta)",
      c: "Thu mình, trì trệ, ăn nhiều (Kapha)",
      map: { a: "vata", b: "pitta", c: "kapha" },
    },
    {
      t: "Giấc ngủ của tôi:",
      a: "Nhẹ, dễ tỉnh, mơ nhiều (Vata)",
      b: "Vừa, dễ thức vì nóng/ý nghĩ (Pitta)",
      c: "Sâu, ngủ lâu, khó dậy (Kapha)",
      map: { a: "vata", b: "pitta", c: "kapha" },
    },
    {
      t: "Tóc của tôi thường:",
      a: "Khô, xơ, dễ gãy (Vata)",
      b: "Mỏng/dễ rụng, dễ bạc sớm (Pitta)",
      c: "Dày, bóng, mọc nhanh (Kapha)",
      map: { a: "vata", b: "pitta", c: "kapha" },
    },
    {
      t: "Tính cách nổi bật của tôi:",
      a: "Sáng tạo, linh hoạt, hay đổi ý (Vata)",
      b: "Tham vọng, quyết đoán, thẳng (Pitta)",
      c: "Điềm tĩnh, kiên nhẫn, dễ hài lòng (Kapha)",
      map: { a: "vata", b: "pitta", c: "kapha" },
    },
    {
      t: "Tôi học/làm việc tốt nhất khi:",
      a: "Có sự mới mẻ và nhịp thay đổi (Vata)",
      b: "Có mục tiêu và deadline rõ (Pitta)",
      c: "Có lịch đều, lặp lại ổn định (Kapha)",
      map: { a: "vata", b: "pitta", c: "kapha" },
    },
    {
      t: "Sở thích ăn uống của tôi:",
      a: "Thích ấm, béo nhẹ, dễ tiêu (Vata)",
      b: "Thích mát, vừa cay/chua, đậm vị (Pitta)",
      c: "Thích ngọt/béo, ăn ‘ngon miệng’ (Kapha)",
      map: { a: "vata", b: "pitta", c: "kapha" },
    },
    {
      t: "Khi trời lạnh, tôi:",
      a: "Khó chịu, run, cần giữ ấm (Vata)",
      b: "Ổn, nhưng không thích gió lạnh (Pitta)",
      c: "Chịu được khá tốt (Kapha)",
      map: { a: "vata", b: "pitta", c: "kapha" },
    },
    {
      t: "Khi trời nóng, tôi:",
      a: "Khá ổn, miễn đừng quá oi (Vata)",
      b: "Rất khó chịu, dễ bốc hỏa (Pitta)",
      c: "Chịu được, nhưng dễ uể oải (Kapha)",
      map: { a: "vata", b: "pitta", c: "kapha" },
    },
    {
      t: "Tôi thường ra quyết định:",
      a: "Nhanh nhưng hay đổi (Vata)",
      b: "Nhanh và dứt khoát (Pitta)",
      c: "Chậm, cân nhắc kỹ (Kapha)",
      map: { a: "vata", b: "pitta", c: "kapha" },
    },
    {
      t: "Tôi có xu hướng:",
      a: "Thích di chuyển/du lịch, không ngồi yên lâu (Vata)",
      b: "Thích cạnh tranh/đạt thành tích (Pitta)",
      c: "Thích an toàn/ổn định/ở nhà (Kapha)",
      map: { a: "vata", b: "pitta", c: "kapha" },
    },
    {
      t: "Khi ốm nhẹ, tôi thường:",
      a: "Đau nhức lặt vặt, khô, táo bón (Vata)",
      b: "Viêm/nóng, nổi mụn, ợ nóng (Pitta)",
      c: "Đờm/dị ứng, nặng đầu, phù (Kapha)",
      map: { a: "vata", b: "pitta", c: "kapha" },
    },
    {
      t: "Năng lượng trong ngày của tôi:",
      a: "Lúc cao lúc thấp, thất thường (Vata)",
      b: "Mạnh, tập trung, dễ ‘quá tải’ (Pitta)",
      c: "Ổn định, bền, nhưng dễ ì (Kapha)",
      map: { a: "vata", b: "pitta", c: "kapha" },
    },
    {
      t: "Tôi phản ứng với lời góp ý:",
      a: "Nhạy cảm, dễ lo (Vata)",
      b: "Tranh luận, bảo vệ quan điểm (Pitta)",
      c: "Im lặng, chịu đựng, buồn lâu (Kapha)",
      map: { a: "vata", b: "pitta", c: "kapha" },
    },
    {
      t: "Tôi cảm thấy cân bằng nhất khi:",
      a: "Giữ nếp sinh hoạt ấm áp, đều đặn (Vata)",
      b: "Giảm nóng, thư giãn và bớt ‘chiến’ (Pitta)",
      c: "Vận động nhiều hơn, nhẹ người (Kapha)",
      map: { a: "vata", b: "pitta", c: "kapha" },
    },
  ],
};

const QUIZZES = [chakraQuiz, energyQuiz, doshaQuiz];

// ---------- Scoring ----------

function clamp(n, a, b) {
  return Math.max(a, Math.min(b, n));
}

function pct(n, denom) {
  if (!denom) return 0;
  return Math.round((n / denom) * 100);
}

function scoreChakra(answers) {
  const acc = Object.fromEntries(chakras.map((c) => [c.key, { deficit: [], excess: [] }]));

  chakraQuiz.questions.forEach((q, i) => {
    const v = answers[i] ?? 0;
    acc[q.chakra][q.kind].push(v);
  });

  const per = chakras.map((c) => {
    const d = acc[c.key].deficit;
    const e = acc[c.key].excess;

    const dSum = d.reduce((s, x) => s + x, 0);
    const eSum = e.reduce((s, x) => s + x, 0);
    const dMax = d.length * 4;
    const eMax = e.length * 4;

    const deficitPct = pct(dSum, dMax);
    const excessPct = pct(eSum, eMax);

    const peak = Math.max(deficitPct, excessPct);
    const gap = Math.abs(deficitPct - excessPct);

    let status = "Tương đối cân bằng";
    let explain = "Luân xa này khá ổn. Bạn chỉ cần giữ thói quen tốt là được.";

    if (deficitPct >= 60 && deficitPct > excessPct + 10) {
      status = "Thiếu năng lượng";
      explain = "Bạn chọn nhiều câu thuộc nhóm ‘thiếu’ → giống như pin yếu. Hãy nuôi dưỡng từ từ và đều đặn.";
    } else if (excessPct >= 60 && excessPct > deficitPct + 10) {
      status = "Quá tải";
      explain = "Bạn chọn nhiều câu thuộc nhóm ‘quá’ → giống như chạy quá tải. Hãy làm chậm lại, nghỉ nhiều hơn, và đặt ranh giới.";
    } else if (peak >= 60 && gap <= 10) {
      status = "Dao động";
      explain = "Bạn vừa có dấu hiệu thiếu vừa có dấu hiệu quá tải. Thường do nhịp sống thất thường; hãy ổn định giờ ngủ/ăn/vận động.";
    } else if (peak >= 75) {
      status = "Lệch mạnh";
      explain = "Luân xa này đang lệch khá mạnh. Nên ưu tiên chăm sóc 1–2 tuần tới (ngủ/ăn/nhịp sống + bài tập gợi ý).";
    }

    const intensity = clamp(peak, 0, 100);

    return {
      ...c,
      deficitSum: dSum,
      excessSum: eSum,
      deficitMax: dMax,
      excessMax: eMax,
      deficitPct,
      excessPct,
      intensity,
      status,
      explain,
    };
  });

  const ranked = [...per].sort((a, b) => b.intensity - a.intensity);
  return { per, headline: ranked[0], secondary: ranked[1] };
}

function energyYoga(score) {
  if (score < 40) {
    return [
      "Restorative / Yoga Nidra: phục hồi, thả lỏng toàn thân",
      "Yin nhẹ + thở dài (hít 4 – thở 6), 5–10 phút",
      "Tránh tập quá nặng; ưu tiên an toàn và ngủ đủ",
    ];
  }
  if (score < 70) {
    return [
      "Hatha cơ bản hoặc Vinyasa nhẹ: ra mồ hôi vừa",
      "Thêm 5 phút thở + giãn cuối buổi (Savasana)",
      "Giữ đều 3–5 buổi/tuần để ổn định",
    ];
  }
  return [
    "Flow tỉnh thức (Vinyasa vừa): giữ nhịp thở, không ‘cố’",
    "Thiền 5 phút để giữ sáng rõ nhưng vẫn tiếp đất",
    "Đừng kín lịch: chừa khoảng nghỉ để cơ thể hồi",
  ];
}

function scoreEnergy(answers) {
  const bucketSum = { low: 0, mid: 0, high: 0 };
  const bucketMax = { low: 0, mid: 0, high: 0 };

  energyQuiz.questions.forEach((q, i) => {
    const raw = answers[i] ?? 0;
    const v = q.reverse ? 4 - raw : raw;
    bucketSum[q.bucket] += v;
    bucketMax[q.bucket] += 4;
  });

  const lowP = bucketMax.low ? bucketSum.low / bucketMax.low : 0;
  const midP = bucketMax.mid ? bucketSum.mid / bucketMax.mid : 0;
  const highP = bucketMax.high ? bucketSum.high / bucketMax.high : 0;

  const score = clamp(
    Math.round(
      ((highP * 0.55 + midP * 0.35 + (1 - lowP) * 0.45) / (0.55 + 0.35 + 0.45)) * 100
    ),
    0,
    100
  );

  let level = "Tần số cao";
  let tone = "emerald";
  let message = "Bạn đang ở trạng thái khá nhẹ nhàng, sáng rõ và có khả năng lan tỏa.";

  if (score < 40) {
    level = "Tần số trầm";
    tone = "slate";
    message = "Bạn có thể đang tích tụ mệt mỏi/stress. Ưu tiên phục hồi và an toàn trước.";
  } else if (score < 70) {
    level = "Tần số cân bằng";
    tone = "sky";
    message = "Bạn tương đối ổn định. Chỉ cần vài thói quen nhỏ để nâng rung động đều hơn.";
  }

  const tips =
    score < 40
      ? [
          "Ngủ đủ + ăn ấm, dễ tiêu trong 2–3 ngày.",
          "Đi bộ 10–20 phút và tắm nắng nhẹ (nếu phù hợp).",
          "Giảm kích thích: bớt mạng xã hội, caffeine, tin tiêu cực.",
        ]
      : score < 70
      ? [
          "Giữ nhịp thở: 4 giây hít – 6 giây thở, 5 phút.",
          "Hoàn thành 1 việc nhỏ mỗi sáng để tạo đà.",
          "Kết nối 1 người thân bằng cuộc gọi ngắn.",
        ]
      : [
          "Duy trì thói quen biết ơn/thiền 5 phút.",
          "Cho – nhận: làm 1 hành động tử tế mỗi ngày.",
          "Tạo ‘khoảng trống’ để cảm hứng xuất hiện (đừng kín lịch).",
        ];

  return {
    score,
    level,
    tone,
    message,
    buckets: {
      low: pct(bucketSum.low, bucketMax.low),
      mid: pct(bucketSum.mid, bucketMax.mid),
      high: pct(bucketSum.high, bucketMax.high),
    },
    tips,
  };
}

function scoreDosha(answers) {
  const counts = { vata: 0, pitta: 0, kapha: 0 };
  doshaQuiz.questions.forEach((q, i) => {
    const pick = answers[i];
    const key = q.map[pick] ?? null;
    if (key) counts[key] += 1;
  });

  const entries = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  const [dominant, domN] = entries[0];
  const [secondary, secN] = entries[1];

  const meta = {
    vata: {
      name: "Vata",
      tone: "violet",
      desc: "Không khí + Không gian: linh hoạt, sáng tạo, nhanh.",
      yoga: [
        "Hatha chậm, nhịp đều (đặc biệt buổi tối)",
        "Yin/Restorative (tiếp đất, thư giãn hệ thần kinh)",
        "Thở êm: hít 4 – thở 6, 3–5 phút",
      ],
      balance: [
        "Giữ ấm – đều – chậm: nếp sinh hoạt ổn định.",
        "Ưu tiên món ấm, ẩm, dễ tiêu (cháo, súp).",
        "Giãn cơ/ yoga nhẹ, thiền an thần.",
      ],
    },
    pitta: {
      name: "Pitta",
      tone: "amber",
      desc: "Lửa + Nước: sắc bén, tập trung, tham vọng.",
      yoga: [
        "Hatha/Vinyasa vừa phải (không ‘chiến’ quá)",
        "Yin mát: mở hông – thả lỏng vai/gáy",
        "Nghỉ giữa giờ + thở êm để hạ nhiệt",
      ],
      balance: [
        "Làm mát và mềm: nghỉ giữa giờ, đi bộ thư giãn.",
        "Ưu tiên món mát/nhạt hơn, giảm cay – rượu.",
        "Thực hành buông ‘hoàn hảo’, chọn đủ tốt.",
      ],
    },
    kapha: {
      name: "Kapha",
      tone: "emerald",
      desc: "Đất + Nước: bền bỉ, điềm tĩnh, ổn định.",
      yoga: [
        "Vinyasa/Power yoga nhẹ–vừa (ra mồ hôi một chút)",
        "Chuỗi đứng – thăng bằng – twist để ‘kích hoạt’",
        "Tập buổi sáng/đầu ngày để đỡ ì",
      ],
      balance: [
        "Vận động đều và mạnh hơn một chút mỗi ngày.",
        "Ưu tiên món nhẹ, ấm, ít dầu; giảm ngọt.",
        "Tạo sự mới mẻ: học 1 thứ nhỏ để ‘kích hoạt’.",
      ],
    },
  };

  const d = meta[dominant];
  const s = meta[secondary];

  return {
    counts,
    dominant,
    secondary,
    dominantMeta: d,
    secondaryMeta: s,
    pct: {
      vata: pct(counts.vata, doshaQuiz.questions.length),
      pitta: pct(counts.pitta, doshaQuiz.questions.length),
      kapha: pct(counts.kapha, doshaQuiz.questions.length),
    },
    summary: `Nổi trội: ${d.name} (${domN}/20). Thứ hai: ${s.name} (${secN}/20).`,
  };
}

// ---------- Menus ----------

const MENUS = [
  {
    id: "chakra",
    label: "Luân xa",
    tone: "violet",
    icon: Sparkles,
    desc: "Khái niệm 7 luân xa + bài quiz cân bằng",
  },
  {
    id: "energy",
    label: "Năng lượng tần số",
    tone: "sky",
    icon: Waves,
    desc: "Hiểu trạng thái rung động + gợi ý nâng năng lượng",
  },
  {
    id: "dosha",
    label: "Dosha",
    tone: "emerald",
    icon: Flower2,
    desc: "Thể tạng Ayurveda + chọn trường phái yoga hợp",
  },
];

function menuGrad(menuId) {
  if (menuId === "chakra") return "from-violet-600 to-fuchsia-500";
  if (menuId === "energy") return "from-sky-600 to-cyan-500";
  return "from-emerald-600 to-lime-500";
}

function menuVariant(menuId) {
  if (menuId === "chakra") return "chakra";
  if (menuId === "energy") return "wave";
  return "dosha";
}

// ---------- Main component ----------

export default function QuizHub() {
  const STORAGE_KEY = "giangmetta_quizhub_v1";

  // Tên web (hiển thị trên tab trình duyệt)
  useEffect(() => {
    try {
      if (typeof document !== "undefined") document.title = "GIANGMETTA";
    } catch (e) {
      // ignore
    }
  }, []);

  const [activeMenu, setActiveMenu] = useState("chakra"); // 'chakra'|'energy'|'dosha'
  const [activeQuizId, setActiveQuizId] = useState(null); // 'chakra'|'energy'|'dosha'|null
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [finished, setFinished] = useState(false);

  // Lưu vị trí đang làm để không bị “reset câu” khi lỡ rời quiz
  const [stepByQuiz, setStepByQuiz] = useState({ chakra: 0, energy: 0, dosha: 0 });

  // Popup cảnh báo khi đổi menu trong lúc đang làm quiz
  const [navGuard, setNavGuard] = useState({ open: false, targetMenu: null });

  // Load tiến trình (nếu có) từ localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const data = JSON.parse(raw);
      if (data?.activeMenu) setActiveMenu(data.activeMenu);
      if (data?.answers) setAnswers(data.answers);
      if (data?.stepByQuiz) setStepByQuiz((p) => ({ ...p, ...data.stepByQuiz }));
    } catch (e) {
      // ignore
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-save tiến trình
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          activeMenu,
          answers,
          stepByQuiz,
        })
      );
    } catch (e) {
      // ignore
    }
  }, [activeMenu, answers, stepByQuiz]);

  // Ghi nhớ câu đang làm cho từng quiz
  useEffect(() => {
    if (!activeQuizId) return;
    setStepByQuiz((p) => ({ ...p, [activeQuizId]: step }));
  }, [step, activeQuizId]);

  const quiz = useMemo(
    () => QUIZZES.find((q) => q.id === activeQuizId) ?? null,
    [activeQuizId]
  );

  const qCount = quiz?.questions?.length ?? 0;
  const currentAnswers = answers[activeQuizId] ?? [];

  const answeredCount = useMemo(() => {
    if (!quiz) return 0;
    const arr = answers[quiz.id] ?? [];
    return arr.filter((x) => x !== undefined && x !== null).length;
  }, [answers, quiz]);

  const progress = quiz ? Math.round((answeredCount / qCount) * 100) : 0;

  const backHome = () => {
    setActiveQuizId(null);
    setStep(0);
    setFinished(false);
  };

  const requestMenuChange = (menuId) => {
    // Nếu đang làm dở quiz (chưa xem kết quả) thì cảnh báo trước
    if (activeQuizId && !finished) {
      setNavGuard({ open: true, targetMenu: menuId });
      return;
    }
    // Không làm dở (hoặc đã xem kết quả) => đổi menu luôn
    setActiveMenu(menuId);
    backHome();
  };

  const confirmLeaveQuiz = () => {
    const target = navGuard.targetMenu;
    setNavGuard({ open: false, targetMenu: null });
    if (!target) return;
    setActiveMenu(target);
    backHome();
  };

  const cancelLeaveQuiz = () => setNavGuard({ open: false, targetMenu: null });

  const findResumeStep = (quizId) => {
    const q = QUIZZES.find((x) => x.id === quizId);
    const arr = answers[quizId] ?? [];
    if (!q) return 0;
    // Ưu tiên quay lại câu đầu tiên chưa trả lời
    const idx = q.questions.findIndex((_, i) => arr[i] === undefined || arr[i] === null);
    if (idx !== -1) return idx;
    // Nếu đã trả lời hết thì quay về câu cuối
    return Math.max(0, (q.questions?.length ?? 1) - 1);
  };

  const resetQuiz = () => {
    if (!activeQuizId) return;
    setAnswers((p) => ({ ...p, [activeQuizId]: [] }));
    setStep(0);
    setFinished(false);
  };

  const setAnswer = (value) => {
    if (!quiz) return;
    setAnswers((p) => {
      const prev = p[quiz.id] ? [...p[quiz.id]] : [];
      prev[step] = value;
      return { ...p, [quiz.id]: prev };
    });
  };

  const canNext = quiz
    ? currentAnswers[step] !== undefined && currentAnswers[step] !== null
    : false;

  const next = () => {
    if (!quiz) return;
    if (step < qCount - 1) setStep((s) => s + 1);
    else setFinished(true);
  };

  const prev = () => setStep((s) => Math.max(0, s - 1));

  const result = useMemo(() => {
    if (!quiz || !finished) return null;
    const arr = answers[quiz.id] ?? [];
    if (quiz.id === "chakra") return scoreChakra(arr);
    if (quiz.id === "energy") return scoreEnergy(arr);
    if (quiz.id === "dosha") return scoreDosha(arr);
    return null;
  }, [quiz, finished, answers]);

  const activeMenuMeta = MENUS.find((m) => m.id === activeMenu) ?? MENUS[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 text-slate-900">
      <header className="sticky top-0 z-30 border-b border-black/5 bg-white/70 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-2xl bg-black text-white shadow-sm">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm font-semibold">GIANGMETTA</div>
              <div className="text-xs text-slate-500">Bản xem thử • 3 menu riêng</div>
            </div>
          </div>

          <nav className="hidden items-center gap-1 md:flex">
            {MENUS.map((m) => {
              const Icon = m.icon;
              const active = m.id === activeMenu;
              return (
                <button
                  key={m.id}
                  onClick={() => {
                    // đổi menu (có cảnh báo nếu đang làm dở quiz)
                    requestMenuChange(m.id);
                  }}
                  className={cx(
                    "inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition",
                    active ? "bg-black text-white" : "text-slate-700 hover:bg-black/5"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {m.label}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            {activeQuizId ? (
              <button
                onClick={backHome}
                className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-black/5"
              >
                <ArrowLeft className="h-4 w-4" />
                Về {activeMenuMeta.label}
              </button>
            ) : (
              <Pill className="bg-emerald-100 text-emerald-800">
                <CheckCircle2 className="h-4 w-4" />
                Bản xem thử
              </Pill>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        <div className="mx-auto max-w-5xl px-4 pb-3 md:hidden">
          <div className="grid grid-cols-3 gap-2">
            {MENUS.map((m) => {
              const Icon = m.icon;
              const active = m.id === activeMenu;
              return (
                <button
                  key={m.id}
                  onClick={() => {
                    requestMenuChange(m.id);
                  }}
                  className={cx(
                    "inline-flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold transition",
                    active ? "bg-black text-white" : "bg-white text-slate-700 ring-1 ring-black/10"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {m.label}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-6">
        <AnimatePresence mode="wait">
          {!activeQuizId ? (
            <motion.div
              key={`home-${activeMenu}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="grid gap-5"
            >
              <MenuHero menu={activeMenuMeta} />

              <MenuContent
                menuId={activeMenu}
                onStartQuiz={() => {
                  setActiveQuizId(activeMenu);
                  // resume thông minh: câu chưa trả lời đầu tiên (hoặc câu gần nhất)
                  setStep(findResumeStep(activeMenu));
                  setFinished(false);
                }}
              />

              <Card className="p-4">
                <div className="text-sm font-semibold">Ghi chú</div>
                <div className="mt-1 text-sm text-slate-600">
                  Đây là bài quiz định hướng tự quan sát (self-check). Không thay thế chẩn đoán y khoa.
                  Điểm/% phản ánh câu trả lời của bạn ở thời điểm gần đây (có thể thay đổi theo giấc ngủ, stress, chu kỳ, công việc…).
                  Nếu bạn đang có triệu chứng kéo dài/ảnh hưởng mạnh, hãy cân nhắc gặp chuyên gia.
                </div>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="grid gap-5"
            >
              <QuizHeader
                quiz={quiz}
                progress={progress}
                step={step}
                qCount={qCount}
                finished={finished}
                onReset={resetQuiz}
              />

              {!finished ? (
                <QuestionPanel
                  quiz={quiz}
                  step={step}
                  qCount={qCount}
                  value={currentAnswers[step]}
                  onChange={setAnswer}
                  onPrev={prev}
                  onNext={next}
                  canNext={canNext}
                />
              ) : (
                <ResultPanel quiz={quiz} result={result} onReset={resetQuiz} onHome={backHome} />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="mx-auto max-w-5xl px-4 pb-8 pt-2 text-center text-xs text-slate-500">
        giangmetta.com - thành lập từ 2016
      </footer>

      <ConfirmLeaveModal
        open={navGuard.open}
        onCancel={cancelLeaveQuiz}
        onConfirm={confirmLeaveQuiz}
      />
    </div>
  );
}

function ConfirmLeaveModal({ open, onCancel, onConfirm }) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="w-full max-w-lg rounded-2xl bg-white p-5 shadow-xl ring-1 ring-black/10"
            initial={{ scale: 0.98, y: 8, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.98, y: 8, opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            <div className="text-base font-semibold">Bạn đang làm dở bài quiz</div>
            <div className="mt-2 text-sm text-slate-600">
              Nếu bạn rời sang menu khác, bạn sẽ <span className="font-semibold">tạm rời màn hình làm bài</span>.
              <span className="font-semibold"> Tiến trình vẫn được giữ</span> (bạn có thể quay lại làm tiếp),
              nhưng để tránh bấm nhầm, mình hỏi lại cho chắc.
            </div>

            <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end">
              <button
                onClick={onCancel}
                className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-black/5"
              >
                Tiếp tục làm
              </button>
              <button
                onClick={onConfirm}
                className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-black"
              >
                Rời quiz
              </button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function MenuHero({ menu }) {
  const Icon = menu.icon;
  return (
    <Card className="overflow-hidden">
      <div className={cx("bg-gradient-to-br p-5 text-white", menuGrad(menu.id))}>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <Pill className="bg-white/15 text-white ring-1 ring-white/20">
              <Icon className="h-4 w-4" />
              Menu: {menu.label}
            </Pill>
            <h1 className="mt-3 text-2xl font-semibold leading-tight md:text-3xl">
              {menu.label}
              <span className="block text-white/85">{menu.desc}</span>
            </h1>
            <p className="mt-2 text-sm text-white/85">
              Bạn làm quiz không phải để “đúng/sai”, mà để <span className="font-semibold text-white">nhìn ra xu hướng</span>.
              Sau đó chọn 1–2 bước nhỏ để cải thiện, tập đều 7 ngày rồi kiểm tra lại.
            </p>
          </div>

          <div className="w-full rounded-2xl bg-white/10 p-4 ring-1 ring-white/15 md:w-[380px]">
            <div className="text-sm font-semibold">Cách dùng nhanh (3 bước)</div>
            <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-white/85">
              <li>Đọc phần khái niệm của menu này (1–2 phút).</li>
              <li>Làm quiz (3–5 phút).</li>
              <li>Chọn 1–2 gợi ý dễ làm nhất và thực hành 7 ngày.</li>
            </ol>
          </div>
        </div>
      </div>
    </Card>
  );
}

function MenuContent({ menuId, onStartQuiz }) {
  if (menuId === "chakra") return <ChakraMenu onStartQuiz={onStartQuiz} />;
  if (menuId === "energy") return <EnergyMenu onStartQuiz={onStartQuiz} />;
  return <DoshaMenu onStartQuiz={onStartQuiz} />;
}

function ChakraMenu({ onStartQuiz }) {
  return (
    <div className="grid gap-4">
      <Card className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-sm font-semibold">Khái niệm luân xa (hiểu thật dễ)</div>
            <div className="mt-1 text-sm text-slate-600">
              Hiểu đơn giản: mỗi luân xa là một “vùng chủ đề” trong cơ thể – cảm xúc.
              <span className="font-semibold"> Thiếu năng lượng</span> = như pin yếu. <span className="font-semibold">Quá tải</span> = như chạy quá mạnh.
            </div>
          </div>
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-violet-100 text-violet-700">
            <Sparkles className="h-5 w-5" />
          </div>
        </div>

        <div className="mt-3 rounded-2xl bg-black/5 p-3">
          <div className="text-sm font-semibold">Bạn làm quiz luân xa để làm gì?</div>
          <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-slate-700">
            <li>Biết luân xa nào đang lệch nhất để ưu tiên trước.</li>
            <li>Nhận gợi ý cân bằng (thở, thói quen, yoga).</li>
            <li>Tập 7 ngày rồi làm lại để thấy thay đổi.</li>
          </ul>
        </div>
      </Card>

      <Card className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-sm font-semibold">7 luân xa: tượng trưng – màu – vị trí – tần số</div>
            <div className="mt-1 text-sm text-slate-600">
              Bảng dưới đây giúp bạn nhớ nhanh: mỗi luân xa liên quan điều gì và nằm ở đâu.
            </div>
          </div>
          <div className="hidden md:block">
            <BigIllustration variant="chakra" tone="violet" />
          </div>
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {chakras.map((c) => (
            <div key={c.key} className="rounded-2xl border border-black/10 bg-white p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold">{c.name}</div>
                  <div className="mt-1 text-xs text-slate-500">Vị trí: {c.location}</div>
                </div>
                <Pill className={cx("bg-black/5", toneText(c.tone))}>{c.colorLabel}</Pill>
              </div>

              <div className="mt-2 text-sm text-slate-700">
                <span className="font-semibold">Tượng trưng:</span> {c.represents}
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-600">
                <div>
                  <span className="font-semibold text-slate-900">Nguyên tố</span>: {c.element}
                </div>
                <div>
                  <span className="font-semibold text-slate-900">Âm</span>: {c.mantra}
                </div>
                <div className="col-span-2">
                  <span className="font-semibold text-slate-900">Tần số</span>: {c.frequency}
                </div>
              </div>

              <div className="mt-3 text-xs text-slate-600 leading-relaxed">Gợi ý nhanh: {c.tips[0]}</div>
            </div>
          ))}
        </div>

        <div className="mt-3 text-xs text-slate-500">
          * Tần số (Hz) là thông tin <span className="font-semibold">tham khảo</span> trong một số trường phái âm thanh/chakra (Solfeggio). Không phải chuẩn y khoa.
        </div>
      </Card>

      <QuizLaunch tileQuiz={chakraQuiz} onStart={onStartQuiz} />
    </div>
  );
}

function EnergyMenu({ onStartQuiz }) {
  const raise = [
    "Ngủ đủ + ăn uống đúng bữa (đây là ‘pin’ quan trọng nhất).",
    "Vận động nhẹ mỗi ngày: đi bộ, giãn cơ, yoga 10–20 phút.",
    "Thở chậm để hạ stress: hít 4 – thở 6 trong 3–5 phút.",
    "Giảm kích thích: bớt màn hình/tin tiêu cực/caffeine khi mệt.",
    "Kết nối: nói chuyện với 1 người tin cậy, ôm, cười, biết ơn.",
    "Dọn dẹp không gian: gọn hơn = đầu óc nhẹ hơn.",
  ];

  const keep = [
    "Đặt ranh giới: bớt ‘làm quá sức’ và bớt chiều lòng.",
    "Chia nhỏ việc: 1 việc – 1 bước, nghỉ ngắn giữa giờ.",
    "Uống nước + ăn ấm/dễ tiêu khi cơ thể ‘tụt pin’.",
    "Tập đều hơn tập nặng: 10 phút/ngày tốt hơn 1 buổi ‘chiến’/tuần.",
    "Theo dõi dấu hiệu: mất ngủ, cáu, uể oải = cần phục hồi.",
  ];

  return (
    <div className="grid gap-4">
      <Card className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-sm font-semibold">Tần số năng lượng là gì?</div>
            <div className="mt-1 text-sm text-slate-600">
              Ở web này, “tần số năng lượng” hiểu đơn giản là <span className="font-semibold">mức năng lượng tinh thần – cảm xúc</span> gần đây.
              Khi mệt/stress → tần số trầm. Khi ổn định → cân bằng. Khi nhẹ nhõm/ấm áp → tần số cao.
            </div>
          </div>
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-sky-100 text-sky-700">
            <Waves className="h-5 w-5" />
          </div>
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <div className="rounded-2xl bg-black/5 p-4">
            <div className="text-sm font-semibold">Bạn làm quiz này để làm gì?</div>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
              <li>Biết hôm nay nên tập kiểu <span className="font-semibold">phục hồi</span> hay <span className="font-semibold">năng động</span>.</li>
              <li>Giảm ‘tập sai trạng thái’ (mệt mà cố tập nặng → càng tụt pin).</li>
              <li>Chọn 1–2 thói quen để nâng năng lượng đều lên.</li>
            </ul>
          </div>
          <div className="rounded-2xl bg-black/5 p-4">
            <div className="text-sm font-semibold">Một cách đọc điểm thật nhanh</div>
            <div className="mt-2 text-sm text-slate-700">
              <span className="font-semibold">0–39</span>: ưu tiên phục hồi • <span className="font-semibold">40–69</span>: tập vừa • <span className="font-semibold">70–100</span>: flow tỉnh thức + giữ nhịp nghỉ.
            </div>
            <div className="mt-3">
              <BigIllustration variant="wave" tone="sky" />
            </div>
          </div>
        </div>

        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <div className="rounded-2xl border border-black/10 bg-white p-4">
            <div className="text-sm font-semibold">Cách nâng tần số (dễ làm)</div>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
              {raise.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-black/10 bg-white p-4">
            <div className="text-sm font-semibold">Cách giữ gìn năng lượng</div>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
              {keep.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>
          </div>
        </div>
      </Card>

      <QuizLaunch tileQuiz={energyQuiz} onStart={onStartQuiz} />
    </div>
  );
}

function DoshaMenu({ onStartQuiz }) {
  const doshaBasics = [
    {
      name: "Vata",
      tone: "violet",
      elements: "Không khí + Không gian",
      represents: "Chuyển động, thần kinh, sáng tạo, linh hoạt",
      whenOff: "Dễ lo, mất ngủ, khô, phân tán; cơ thể lạnh/thiếu ổn định",
      yoga: "Chậm, tiếp đất, giữ nhịp đều (Hatha chậm, Yin/Restorative)",
    },
    {
      name: "Pitta",
      tone: "amber",
      elements: "Lửa + Nước",
      represents: "Chuyển hoá, tiêu hoá, trí tuệ, tập trung",
      whenOff: "Dễ nóng nảy, bốc hoả, ‘chiến’, viêm/nóng; khó thư giãn",
      yoga: "Vừa phải, làm mát, mềm (Hatha/Vinyasa vừa, Yin mát)",
    },
    {
      name: "Kapha",
      tone: "emerald",
      elements: "Đất + Nước",
      represents: "Cấu trúc, bền bỉ, miễn dịch, ổn định",
      whenOff: "Dễ ì, chậm, nặng nề, trì trệ; bám vùng an toàn",
      yoga: "Năng động hơn để kích hoạt (Vinyasa/chuỗi đứng, twist)",
    },
  ];

  return (
    <div className="grid gap-4">
      <Card className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-sm font-semibold">Thể tạng (Dosha) đại diện cho cái gì?</div>
            <div className="mt-1 text-sm text-slate-600">
              Dosha là “mẫu cơ địa” trong Ayurveda: mỗi người đều có đủ 3 dosha, nhưng sẽ có 1–2 dosha <span className="font-semibold">nổi trội</span>.
              Biết dosha giúp bạn chọn kiểu yoga để <span className="font-semibold">cân bằng</span> (không phải để ‘chiến’).
            </div>
          </div>
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-emerald-100 text-emerald-700">
            <Flower2 className="h-5 w-5" />
          </div>
        </div>

        <div className="mt-3 rounded-2xl bg-black/5 p-3">
          <div className="text-sm font-semibold">Bạn làm quiz Dosha để làm gì?</div>
          <div className="mt-1 text-sm text-slate-700">
            Để chọn trường phái yoga phù hợp cơ địa và trạng thái stress. Khi tập đúng, bạn sẽ thấy <span className="font-semibold">dễ duy trì</span> hơn và cơ thể <span className="font-semibold">ít lệch</span> hơn.
          </div>
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {doshaBasics.map((d) => (
            <div key={d.name} className="rounded-2xl border border-black/10 bg-white p-4">
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold">{d.name}</div>
                <Pill className={cx("bg-black/5", toneText(d.tone))}>{d.elements}</Pill>
              </div>
              <div className="mt-2 text-sm text-slate-700">
                <span className="font-semibold">Đại diện:</span> {d.represents}
              </div>
              <div className="mt-2 text-sm text-slate-700">
                <span className="font-semibold">Khi lệch:</span> {d.whenOff}
              </div>
              <div className="mt-2 text-sm text-slate-700">
                <span className="font-semibold">Yoga hợp:</span> {d.yoga}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <BigIllustration variant="dosha" tone="emerald" />
        </div>
      </Card>

      <QuizLaunch tileQuiz={doshaQuiz} onStart={onStartQuiz} />
    </div>
  );
}

function QuizLaunch({ tileQuiz, onStart }) {
  const quiz = tileQuiz;
  const tone = quiz.id === "chakra" ? "violet" : quiz.id === "energy" ? "sky" : "emerald";
  const variant = menuVariant(quiz.id);

  return (
    <button onClick={onStart} className="text-left" aria-label={`Mở quiz: ${quiz.title}`}
    >
      <Card className="overflow-hidden transition hover:shadow-md">
        <div className={cx("p-4 bg-gradient-to-br text-white", menuGrad(quiz.id))}>
          <div className="flex items-start justify-between">
            <div className="grid gap-1">
              <div className="text-sm font-semibold">{quiz.title}</div>
              <div className="text-xs text-white/80">{quiz.subtitle}</div>
            </div>
            <div className="grid h-10 w-10 place-items-center rounded-2xl bg-white/15 ring-1 ring-white/20">
              <quiz.icon className="h-5 w-5" />
            </div>
          </div>
        </div>
        <div className="p-4">
          <BigIllustration variant={variant} tone={tone} />
          <div className="mt-2 flex items-center justify-between">
            <Pill className="bg-black/5 text-slate-700">20 câu hỏi</Pill>
            <Pill className="bg-black/5 text-slate-700">Bấm để làm</Pill>
          </div>
        </div>
      </Card>
    </button>
  );
}

function QuizHeader({ quiz, progress, step, qCount, finished, onReset }) {
  const grad = menuGrad(quiz.id);
  const Icon = quiz.icon;

  return (
    <Card className="overflow-hidden">
      <div className={cx("bg-gradient-to-br p-4 text-white", grad)}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Icon className="h-5 w-5" />
              <div className="text-sm font-semibold">{quiz.title}</div>
            </div>
            <div className="mt-1 text-xs text-white/85">{quiz.subtitle}</div>
          </div>
          <button
            onClick={onReset}
            className="inline-flex items-center gap-2 rounded-xl bg-white/15 px-3 py-2 text-sm font-semibold ring-1 ring-white/20 hover:bg-white/20"
          >
            <RotateCcw className="h-4 w-4" />
            Làm lại
          </button>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between text-sm">
          <div className="font-semibold">Tiến trình</div>
          <div className="text-slate-600">{finished ? "Hoàn thành" : `Câu ${step + 1}/${qCount}`}</div>
        </div>
        <div className="mt-2">
          <Progress value={progress} />
          <div className="mt-1 text-xs text-slate-500">{progress}% đã trả lời</div>
        </div>
      </div>
    </Card>
  );
}

function QuestionPanel({ quiz, step, qCount, value, onChange, onPrev, onNext, canNext }) {
  const q = quiz.questions[step];

  return (
    <Card className="p-5">
      <div className="flex items-center justify-between">
        <Pill className="bg-black/5 text-slate-700">Câu {step + 1} / {qCount}</Pill>
        <Pill className="bg-black/5 text-slate-700">Chọn 1 đáp án</Pill>
      </div>

      <div className="mt-4 text-lg font-semibold leading-snug">{q.t}</div>

      <div className="mt-4">
        {quiz.variant === "likert" ? (
          <div className="grid gap-2">
            {LIKERT.map((o) => (
              <label
                key={o.v}
                className={cx(
                  "flex cursor-pointer items-center justify-between rounded-2xl border px-4 py-3 transition",
                  value === o.v
                    ? "border-slate-900 bg-slate-900 text-white"
                    : "border-black/10 bg-white hover:bg-black/5"
                )}
              >
                <div className="text-sm font-semibold">{o.label}</div>
                <input
                  type="radio"
                  name={`q-${quiz.id}-${step}`}
                  value={o.v}
                  checked={value === o.v}
                  onChange={() => onChange(o.v)}
                  className="h-4 w-4"
                />
              </label>
            ))}
          </div>
        ) : (
          <div className="grid gap-2">
            {[
              { k: "a", label: q.a },
              { k: "b", label: q.b },
              { k: "c", label: q.c },
            ].map((o) => (
              <label
                key={o.k}
                className={cx(
                  "flex cursor-pointer items-start gap-3 rounded-2xl border px-4 py-3 transition",
                  value === o.k
                    ? "border-slate-900 bg-slate-900 text-white"
                    : "border-black/10 bg-white hover:bg-black/5"
                )}
              >
                <input
                  type="radio"
                  name={`q-${quiz.id}-${step}`}
                  value={o.k}
                  checked={value === o.k}
                  onChange={() => onChange(o.k)}
                  className="mt-1 h-4 w-4"
                />
                <div>
                  <div className="text-sm font-semibold">{o.label}</div>
                </div>
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="mt-5 flex items-center justify-between">
        <button
          onClick={onPrev}
          disabled={step === 0}
          className={cx(
            "inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold",
            step === 0 ? "text-slate-400" : "text-slate-700 hover:bg-black/5"
          )}
        >
          <ArrowLeft className="h-4 w-4" />
          Trước
        </button>

        <button
          onClick={onNext}
          disabled={!canNext}
          className={cx(
            "inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold",
            canNext ? "bg-slate-900 text-white hover:bg-black" : "bg-black/10 text-slate-400"
          )}
        >
          {step === qCount - 1 ? "Xem kết quả" : "Tiếp"}
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </Card>
  );
}

function ResultPanel({ quiz, result, onReset, onHome }) {
  if (!result) return null;
  if (quiz.id === "chakra") return <ChakraResult result={result} onReset={onReset} onHome={onHome} />;
  if (quiz.id === "energy") return <EnergyResult result={result} onReset={onReset} onHome={onHome} />;
  if (quiz.id === "dosha") return <DoshaResult result={result} onReset={onReset} onHome={onHome} />;
  return null;
}

function Actions({ onReset, onHome }) {
  return (
    <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      <button
        onClick={onHome}
        className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-black/5"
      >
        <ArrowLeft className="h-4 w-4" />
        Về trang menu
      </button>
      <button
        onClick={onReset}
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-black"
      >
        <RotateCcw className="h-4 w-4" />
        Làm lại bài này
      </button>
    </div>
  );
}

function ChakraResult({ result, onReset, onHome }) {
  const { per, headline, secondary } = result;

  return (
    <div className="grid gap-4">
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-br from-violet-600 to-fuchsia-500 p-4 text-white">
          <div className="text-sm font-semibold">Kết quả: Luân xa</div>
          <div className="mt-1 text-xs text-white/85">
            % Thiếu / % Quá tải = (điểm bạn chọn) / (điểm tối đa của nhóm câu hỏi đó). Mốc tham khảo: 0–35% (nhẹ) • 36–59% (vừa) • 60%+ (mạnh).
          </div>
        </div>
        <div className="p-4">
          <div className="grid gap-3 md:grid-cols-2">
            <HighlightChakra c={headline} tag="Nổi bật" />
            <HighlightChakra c={secondary} tag="Thứ hai" />
          </div>

          <div className="mt-3 rounded-2xl bg-black/5 p-3">
            <div className="text-sm font-semibold">Ghi chú cách hiểu kết quả</div>
            <div className="mt-1 grid gap-1 text-sm text-slate-700">
              <div><span className="font-semibold">Thiếu năng lượng</span>: như “pin yếu” → dễ mệt, khó làm tới. Ưu tiên ngủ/ăn đều và làm các bài tập gợi ý.</div>
              <div><span className="font-semibold">Quá tải</span>: như “chạy quá mạnh” → dễ căng, khó nghỉ. Ưu tiên làm chậm lại, thư giãn và đặt ranh giới.</div>
              <div><span className="font-semibold">Dao động</span>: lúc thiếu lúc quá → cần ổn định nhịp sống (giờ ngủ/ăn/vận động).</div>
              <div><span className="font-semibold">Tương đối cân bằng</span>: duy trì thói quen tốt là đủ.</div>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <div className="text-sm font-semibold">Chi tiết theo từng luân xa</div>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          {per.map((c) => (
            <ChakraMini key={c.key} c={c} />
          ))}
        </div>
        <Actions onReset={onReset} onHome={onHome} />
      </Card>
    </div>
  );
}

function HighlightChakra({ c, tag }) {
  return (
    <div className="rounded-2xl border border-black/10 bg-white p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <Pill className={cx("text-white", toneBg(c.tone))}>{tag}</Pill>
          <div className="mt-2 text-base font-semibold">{c.name}</div>
          <div className="mt-1 text-sm text-slate-600">{c.keywords}</div>
          <div className="mt-2 grid gap-1 text-xs text-slate-500">
            <div>Vị trí: {c.location}</div>
            <div>Tần số tham khảo: {c.frequency}</div>
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-2">
            <Pill className={cx("bg-black/5", toneText(c.tone))}>{c.status}</Pill>
            <Pill className="bg-black/5 text-slate-700">Mức lệch: {c.intensity}%</Pill>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-600">
            <div>
              Thiếu: <span className="font-semibold text-slate-900">{c.deficitPct}%</span>
              <span className="text-slate-500"> ({c.deficitSum}/{c.deficitMax})</span>
            </div>
            <div>
              Quá tải: <span className="font-semibold text-slate-900">{c.excessPct}%</span>
              <span className="text-slate-500"> ({c.excessSum}/{c.excessMax})</span>
            </div>
          </div>

          <div className="mt-2 text-sm text-slate-700">{c.explain}</div>
        </div>
        <div className="w-48">
          <BigIllustration variant="chakra" tone={c.tone} />
        </div>
      </div>
      <div className="mt-3 grid gap-1 text-sm text-slate-700">
        {c.tips.map((t, i) => (
          <div key={i} className="flex gap-2">
            <span className={cx("mt-1 inline-block h-2 w-2 rounded-full", toneDot(c.tone))} />
            <span>{t}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ChakraMini({ c }) {
  return (
    <div className="rounded-2xl border border-black/10 bg-white p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-sm font-semibold">{c.name}</div>
          <div className="mt-1 text-xs text-slate-500">Màu: {c.colorLabel} • Vị trí: {c.location}</div>
          <div className="mt-1 text-xs text-slate-500">Tần số tham khảo: {c.frequency}</div>
        </div>
        <Pill className={cx("bg-black/5", toneText(c.tone))}>{c.status}</Pill>
      </div>

      <div className="mt-3 grid gap-2">
        <div className="flex items-center justify-between">
          <div className="text-xs text-slate-600">Mức lệch</div>
          <div className="text-xs font-semibold text-slate-900">{c.intensity}%</div>
        </div>
        <Progress value={c.intensity} />

        <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
          <div>
            Thiếu: <span className="font-semibold text-slate-900">{c.deficitPct}%</span>
            <span className="text-slate-500"> ({c.deficitSum}/{c.deficitMax})</span>
          </div>
          <div>
            Quá tải: <span className="font-semibold text-slate-900">{c.excessPct}%</span>
            <span className="text-slate-500"> ({c.excessSum}/{c.excessMax})</span>
          </div>
        </div>

        <div className="text-xs text-slate-600 leading-relaxed">{c.explain}</div>
      </div>
    </div>
  );
}

function EnergyResult({ result, onReset, onHome }) {
  const grad =
    result.tone === "slate"
      ? "from-slate-700 to-slate-500"
      : result.tone === "sky"
      ? "from-sky-600 to-cyan-500"
      : "from-emerald-600 to-lime-500";

  return (
    <div className="grid gap-4">
      <Card className="overflow-hidden">
        <div className={cx("bg-gradient-to-br p-4 text-white", grad)}>
          <div className="text-sm font-semibold">Kết quả: Tần số năng lượng</div>
          <div className="mt-1 text-xs text-white/85">Điểm tổng hợp 0–100 (cao hơn = rung động cao hơn).</div>
        </div>
        <div className="p-4">
          <div className="grid gap-4 md:grid-cols-2 md:items-center">
            <div>
              <Pill className={cx("text-white", toneBg(result.tone))}>{result.level}</Pill>
              <div className="mt-2 text-3xl font-semibold">{result.score}/100</div>
              <div className="mt-2 text-sm text-slate-700">{result.message}</div>

              <div className="mt-3 rounded-2xl bg-black/5 p-3">
                <div className="text-sm font-semibold">Cách đọc điểm</div>
                <div className="mt-1 text-sm text-slate-700">
                  <span className="font-semibold">0–39</span> (Trầm): ưu tiên phục hồi • <span className="font-semibold">40–69</span> (Cân bằng): tập vừa • <span className="font-semibold">70–100</span> (Cao): flow tỉnh thức + nghỉ hợp lý.
                </div>
              </div>

              <div className="mt-4 grid gap-2">
                <div className="text-sm font-semibold">Phân rã theo nhóm (theo % trong 20 câu)</div>
                <Metric label="Thấp (stress)" value={result.buckets.low} tone="slate" />
                <Metric label="Trung (ổn định)" value={result.buckets.mid} tone="sky" />
                <Metric label="Cao (niềm vui/yêu thương)" value={result.buckets.high} tone="emerald" />
              </div>
            </div>

            <div>
              <BigIllustration variant="wave" tone={result.tone} />
              <div className="mt-3 rounded-2xl bg-black/5 p-3">
                <div className="text-sm font-semibold">Yoga phù hợp hôm nay</div>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
                  {energyYoga(result.score).map((t, i) => (
                    <li key={i}>{t}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-3 rounded-2xl bg-black/5 p-3">
                <div className="text-sm font-semibold">Gợi ý nâng rung động</div>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
                  {result.tips.map((t, i) => (
                    <li key={i}>{t}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <Actions onReset={onReset} onHome={onHome} />
        </div>
      </Card>
    </div>
  );
}

function Metric({ label, value, tone, note }) {
  return (
    <div className="rounded-2xl bg-white p-3 ring-1 ring-black/10">
      <div className="flex items-center justify-between text-sm">
        <div className="font-semibold">{label}</div>
        <div className="flex items-center gap-2">
          <Pill className={cx("bg-black/5", toneText(tone))}>{value}%</Pill>
          {note ? <span className="text-xs text-slate-500">{note}</span> : null}
        </div>
      </div>
      <div className="mt-2">
        <div className="h-2 w-full overflow-hidden rounded-full bg-black/5">
          <div className={cx("h-full rounded-full", toneBar(tone))} style={{ width: `${value}%` }} />
        </div>
      </div>
    </div>
  );
}

function DoshaResult({ result, onReset, onHome }) {
  const d = result.dominantMeta;
  const s = result.secondaryMeta;

  return (
    <div className="grid gap-4">
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-br from-emerald-600 to-lime-500 p-4 text-white">
          <div className="text-sm font-semibold">Kết quả: Dosha</div>
          <div className="mt-1 text-xs text-white/85">{result.summary}</div>
        </div>
        <div className="p-4">
          <div className="grid gap-4 md:grid-cols-2 md:items-center">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Pill className={cx("text-white", toneBg(d.tone))}>Nổi trội: {d.name}</Pill>
                <Pill className={cx("text-white", toneBg(s.tone))}>Thứ hai: {s.name}</Pill>
              </div>
              <div className="mt-2 text-sm text-slate-700">{d.desc}</div>

              <div className="mt-3 rounded-2xl bg-black/5 p-3">
                <div className="text-sm font-semibold">Cách đọc kết quả</div>
                <div className="mt-1 text-sm text-slate-700">
                  Mỗi câu bạn chọn sẽ cộng <span className="font-semibold">1 điểm</span> cho Vata/Pitta/Kapha. % = điểm/20.
                  Nếu 2 dosha gần nhau (chênh &lt; ~10%), bạn có thể là cơ địa phối hợp.
                </div>
              </div>

              <div className="mt-4 grid gap-2">
                <div className="text-sm font-semibold">Tỷ lệ</div>
                <Metric label="Vata" value={result.pct.vata} tone="violet" note={`${result.counts.vata}/20`} />
                <Metric label="Pitta" value={result.pct.pitta} tone="amber" note={`${result.counts.pitta}/20`} />
                <Metric label="Kapha" value={result.pct.kapha} tone="emerald" note={`${result.counts.kapha}/20`} />
              </div>
            </div>

            <div>
              <BigIllustration variant="dosha" tone={d.tone} />
              <div className="mt-3 rounded-2xl bg-black/5 p-3">
                <div className="text-sm font-semibold">Yoga phù hợp với {d.name}</div>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
                  {d.yoga.map((t, i) => (
                    <li key={i}>{t}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-3 rounded-2xl bg-black/5 p-3">
                <div className="text-sm font-semibold">Gợi ý cân bằng cho {d.name}</div>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
                  {d.balance.map((t, i) => (
                    <li key={i}>{t}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <Actions onReset={onReset} onHome={onHome} />
        </div>
      </Card>
    </div>
  );
}

// ---------- Tone helpers ----------

function toneBg(tone) {
  switch (tone) {
    case "red":
      return "bg-red-500";
    case "orange":
      return "bg-orange-500";
    case "amber":
      return "bg-amber-500";
    case "emerald":
      return "bg-emerald-500";
    case "sky":
      return "bg-sky-500";
    case "indigo":
      return "bg-indigo-500";
    case "violet":
      return "bg-violet-500";
    case "slate":
    default:
      return "bg-slate-600";
  }
}

function toneText(tone) {
  switch (tone) {
    case "red":
      return "text-red-600";
    case "orange":
      return "text-orange-600";
    case "amber":
      return "text-amber-700";
    case "emerald":
      return "text-emerald-700";
    case "sky":
      return "text-sky-700";
    case "indigo":
      return "text-indigo-700";
    case "violet":
      return "text-violet-700";
    case "slate":
    default:
      return "text-slate-700";
  }
}

function toneDot(tone) {
  switch (tone) {
    case "red":
      return "bg-red-500";
    case "orange":
      return "bg-orange-500";
    case "amber":
      return "bg-amber-500";
    case "emerald":
      return "bg-emerald-500";
    case "sky":
      return "bg-sky-500";
    case "indigo":
      return "bg-indigo-500";
    case "violet":
      return "bg-violet-500";
    case "slate":
    default:
      return "bg-slate-500";
  }
}

function toneBar(tone) {
  switch (tone) {
    case "violet":
      return "bg-violet-400";
    case "amber":
      return "bg-amber-400";
    case "emerald":
      return "bg-emerald-400";
    case "sky":
      return "bg-sky-400";
    case "slate":
    default:
      return "bg-slate-400";
  }
}
