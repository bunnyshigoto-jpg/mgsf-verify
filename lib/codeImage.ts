// lib/codeImage.ts
// 目的：把 6 位数字渲染成“像素风位图图片”，返回 data:image/png;base64,...

type DigitMap = number[][];

// 5x7 的像素字模（你可以之后微调每个数字的像素点来更像原站）
const DIGITS: Record<string, DigitMap> = {
  "0": [
    [0,1,1,1,0],
    [1,0,0,0,1],
    [1,0,0,1,1],
    [1,0,1,0,1],
    [1,1,0,0,1],
    [1,0,0,0,1],
    [0,1,1,1,0],
  ],
  "1": [
    [0,0,1,0,0],
    [0,1,1,0,0],
    [1,0,1,0,0],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [1,1,1,1,1],
  ],
  "2": [
    [0,1,1,1,0],
    [1,0,0,0,1],
    [0,0,0,0,1],
    [0,0,0,1,0],
    [0,0,1,0,0],
    [0,1,0,0,0],
    [1,1,1,1,1],
  ],
  "3": [
    [1,1,1,1,0],
    [0,0,0,0,1],
    [0,0,1,1,0],
    [0,0,0,0,1],
    [0,0,0,0,1],
    [1,0,0,0,1],
    [0,1,1,1,0],
  ],
  "4": [
    [0,0,0,1,0],
    [0,0,1,1,0],
    [0,1,0,1,0],
    [1,0,0,1,0],
    [1,1,1,1,1],
    [0,0,0,1,0],
    [0,0,0,1,0],
  ],
  "5": [
    [1,1,1,1,1],
    [1,0,0,0,0],
    [1,1,1,1,0],
    [0,0,0,0,1],
    [0,0,0,0,1],
    [1,0,0,0,1],
    [0,1,1,1,0],
  ],
  "6": [
    [0,1,1,1,0],
    [1,0,0,0,1],
    [1,0,0,0,0],
    [1,1,1,1,0],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [0,1,1,1,0],
  ],
  "7": [
    [1,1,1,1,1],
    [0,0,0,0,1],
    [0,0,0,1,0],
    [0,0,1,0,0],
    [0,1,0,0,0],
    [0,1,0,0,0],
    [0,1,0,0,0],
  ],
  "8": [
    [0,1,1,1,0],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [0,1,1,1,0],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [0,1,1,1,0],
  ],
  "9": [
    [0,1,1,1,0],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [0,1,1,1,1],
    [0,0,0,0,1],
    [1,0,0,0,1],
    [0,1,1,1,0],
  ],
};

export function randomSixDigits() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// 关键：用 canvas “按像素块画出来”，天然锯齿/硬边（像 GIF）
export function makeCodePngDataUrl(code: string, opts?: {
  scale?: number;      // 像素放大倍数：越大越“像素”
  gap?: number;        // 数字之间的间距（像素）
  color?: string;      // 红色
  bg?: string | null;  // 背景：null=透明
}) {
  const scale = opts?.scale ?? 3;        // 3 或 4 最像验证码
  const gap = opts?.gap ?? 2;            // 数字间距
  const color = opts?.color ?? "#D32F2F";
  const bg = opts?.bg ?? null;

  const chars = code.split("").filter((c) => c in DIGITS);
  const digitW = 5, digitH = 7;

  // 计算画布尺寸（按像素块计算）
  const w = (chars.length * digitW + (chars.length - 1) * gap) * scale;
  const h = digitH * scale;

  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;

  const ctx = canvas.getContext("2d");
  if (!ctx) return "";

  // 关闭抗锯齿：让边缘更“硬”
  // @ts-ignore
  ctx.imageSmoothingEnabled = false;

  if (bg) {
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);
  } else {
    ctx.clearRect(0, 0, w, h);
  }

  ctx.fillStyle = color;

  let xOffset = 0;
  for (const ch of chars) {
    const map = DIGITS[ch];
    for (let y = 0; y < digitH; y++) {
      for (let x = 0; x < digitW; x++) {
        if (map[y][x]) {
          ctx.fillRect(
            (xOffset + x) * scale,
            y * scale,
            scale,
            scale
          );
        }
      }
    }
    xOffset += digitW + gap;
  }

  return canvas.toDataURL("image/png");
}
