const textEl = document.getElementById('text');
const bootEl = document.getElementById('boot');
const canvas = document.getElementById('matrixCanvas');
const contentEl = document.getElementById('content');

const bootText = 
  "Authenticating NFC tag...\n" +
  "Identity confirmed: MICHAEL\n" +
  "System Online";

let i = 0;

function type() {
  if (i < bootText.length) {
    textEl.textContent += bootText[i];
    i++;
    setTimeout(type, 75);
  } else {
    setTimeout(() => {
      bootEl.style.display = 'none';
      canvas.style.display = 'block';
      startMatrix();

      setTimeout(() => {
        contentEl.style.display = 'block';
      }, 1500);
    }, 1000);
  }
}

function startMatrix() {
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const letters = '01';
  const fontSize = 14;
  const columns = canvas.width / fontSize;
  const drops = Array(Math.floor(columns)).fill(1);

  function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'rgba(0, 255, 0, 0.3)';
    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
      const text = letters.charAt(Math.floor(Math.random() * letters.length));
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }

      drops[i]++;
    }
  }

  setInterval(draw, 50);
}

type();
