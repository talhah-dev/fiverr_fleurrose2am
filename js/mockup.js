

class RoomSimulator {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;
    this.artworkImg = this.container.querySelector('.mockup-artwork-img');
    this.frameEl = this.container.querySelector('.mockup-frame');
    this.captionEl = this.container.querySelector('.mockup-caption');
    this.isFramed = options.framed !== undefined ? options.framed : true;
    this.currentWidthCm = options.widthCm || 45;
    this.currentRatio = options.ratio || (16 / 9);

    this.render();
  }

  setArtwork(src, title, widthCm = 45, ratio = 16 / 9) {
    if (this.artworkImg) {
      this.artworkImg.src = src;
      this.artworkImg.alt = title;
    }
    this.currentWidthCm = widthCm;
    this.currentRatio = ratio;
    this.render();
  }

  toggleFramed() {
    this.isFramed = !this.isFramed;
    this.render();
  }

  render() {
    if (!this.frameEl) return;
    if (this.isFramed) {
      this.frameEl.classList.add('framed');
    } else {
      this.frameEl.classList.remove('framed');
    }

    const widthPercent = Math.min(60, Math.max(15, (this.currentWidthCm / 300) * 100 * 1.3));
    this.frameEl.style.width = `${widthPercent}%`;
    this.frameEl.style.aspectRatio = `${this.currentRatio}`;
  }
}

window.RoomSimulator = RoomSimulator;
