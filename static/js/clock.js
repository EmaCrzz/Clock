export default function drawClock({ ctx = null, radius = null, now = null }) {
  drawFace(ctx, radius);
  drawNumbers(ctx, radius);
  drawMarks(ctx, radius);
  drawTime(ctx, radius, now);
}

function drawFace(ctx, radius) {
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, 2 * Math.PI);
  ctx.fillStyle = "#fafafa";
  ctx.fill();
  let grad = ctx.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05);

  grad.addColorStop(0, "#000");
  grad.addColorStop(0.5, "#3e3e3e");
  grad.addColorStop(1, "#000");
  ctx.strokeStyle = grad;

  ctx.lineWidth = radius * 0.05;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(0, 0, radius * 0.05, 0, 2 * Math.PI);
  ctx.fillStyle = "#333";
  ctx.fill();
}

function drawNumbers(ctx, radius) {
  let ang;
  ctx.font = radius * 0.18 + "px Michroma";

  ctx.textBaseline = "middle";
  ctx.textAlign = "center";

  for (let num = 1; num < 13; num++) {
    ang = (num * Math.PI) / 6;
    ctx.rotate(ang);
    ctx.translate(0, -radius * 0.7);
    ctx.rotate(-ang);
    ctx.fillText(num.toString(), 0, 0);
    ctx.rotate(ang);
    ctx.translate(0, radius * 0.7);
    ctx.rotate(-ang);
  }
}

function drawTime(ctx, radius, now) {
  let hour = now.getHours();
  let minute = now.getMinutes();
  let second = now.getSeconds();

  hour = hour % 12;
  hour =
    (hour * Math.PI) / 6 +
    (minute * Math.PI) / (6 * 60) +
    (second * Math.PI) / (360 * 60);
  drawHand(ctx, hour, radius * 0.5, radius * 0.05);
  minute = (minute * Math.PI) / 30 + (second * Math.PI) / (30 * 60);
  drawHand(ctx, minute, radius * 0.8, radius * 0.05);
  second = (second * Math.PI) / 30;
  drawHand(ctx, second, radius * 0.9, radius * 0.02, "#f44336");
}

function drawHand(ctx, pos, length, width, color) {
  ctx.beginPath();
  ctx.lineWidth = width;
  ctx.strokeStyle = color || "#333";
  ctx.lineCap = "round";
  ctx.moveTo(0, 0);
  ctx.rotate(pos);
  ctx.lineTo(0, -length);
  ctx.stroke();
  ctx.rotate(-pos);
}

function drawMarks(ctx, radius) {
  ctx.lineCap = "square";
  for (let num = 0; num < 30; num++) {
    ctx.save();
    ctx.rotate(num * ((2 * Math.PI) / 60));
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = "#333";
    ctx.beginPath();
    ctx.moveTo(0, -radius * 0.9);
    ctx.lineTo(0, -radius * 0.87);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, radius * 0.9);
    ctx.lineTo(0, radius * 0.87);
    ctx.stroke();
    ctx.restore();
  }
  for (let num = 0; num < 30; num++) {
    ctx.save();
    ctx.rotate(num * ((2 * Math.PI) / 12));
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = "#333";
    ctx.beginPath();
    ctx.moveTo(0, -radius * 0.9);
    ctx.lineTo(0, -radius * 0.87);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, radius * 0.9);
    ctx.lineTo(0, radius * 0.87);
    ctx.stroke();
    ctx.restore();
  }
}
