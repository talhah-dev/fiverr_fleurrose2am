class RoomSimulator {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;
    this.artworkImg = this.container.querySelector('.mockup-artwork-img');
    this.frameEl = this.container.querySelector('.mockup-frame');
    this.isFramed = options.framed !== undefined ? options.framed : true;
    this.currentWidthCm = options.widthCm || 45;
    this.currentRatio = options.ratio || (16 / 9);
    this.currentTitle = options.title || '';
    this.render();
  }

  setArtwork(src, title, widthCm = 45, ratio = 16 / 9) {
    if (this.artworkImg) {
      this.artworkImg.src = src;
      this.artworkImg.alt = title;
    }
    this.currentTitle = title;
    this.currentWidthCm = widthCm;
    this.currentRatio = ratio;
    this.render();
  }

  setWallColor(hex) {
    if (this.container) {
      this.container.style.background = hex;
    }
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

    const isPortrait = this.currentRatio < 1;
    const effectiveWidthCm = isPortrait ? (this.currentWidthCm * this.currentRatio) : this.currentWidthCm;
    const widthPercent = Math.min(48, Math.max(9, (effectiveWidthCm / 300) * 100 * 1.15));
    this.frameEl.style.width = `${widthPercent}%`;
    this.frameEl.style.aspectRatio = `${this.currentRatio}`;
  }
}

window.RoomSimulator = RoomSimulator;
