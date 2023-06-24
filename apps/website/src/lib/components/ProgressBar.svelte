<script lang="ts">
  export let title = '';
  export let percentage = 50;
  function hslToHex(h, s, l) {
    // Convert hue to degrees
    h %= 360;
    if (h < 0) {
      h += 360;
    }

    // Normalize saturation and lightness values
    s = Math.max(0, Math.min(s, 100)) / 100;
    l = Math.max(0, Math.min(l, 100)) / 100;

    // Calculate RGB values
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = l - c / 2;

    let r, g, b;
    if (h >= 0 && h < 60) {
      r = c;
      g = x;
      b = 0;
    } else if (h >= 60 && h < 120) {
      r = x;
      g = c;
      b = 0;
    } else if (h >= 120 && h < 180) {
      r = 0;
      g = c;
      b = x;
    } else if (h >= 180 && h < 240) {
      r = 0;
      g = x;
      b = c;
    } else if (h >= 240 && h < 300) {
      r = x;
      g = 0;
      b = c;
    } else {
      r = c;
      g = 0;
      b = x;
    }

    // Convert RGB values to HEX
    const componentToHex = (component) => {
      const hex = Math.round(component * 255).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };

    const hexR = componentToHex(r + m);
    const hexG = componentToHex(g + m);
    const hexB = componentToHex(b + m);

    return '#' + hexR + hexG + hexB;
  }
  function getColor(percentage, toHex = true) {
    if (percentage >= 100) {
      percentage = 100;
    } else if (percentage <= 0) {
      percentage = 1;
    }
    let hue = (190 / 100) * percentage;
    if (toHex) {
      return hslToHex(hue, 100, 30);
    }
    return `hsl(${hue}, 100%, 25%)`;
  }
</script>

<div class="flex flex-col md:min-w-[224px] print:!min-w-fit">
  <div class="mb-1 flex justify-between ">
    <span class="text-base font-medium text-primary-900-50-token print:!text-primary-900">{title}</span>
    <!-- <span class="text-sm font-medium text-blue-700 dark:text-white">{percentage}%</span> -->
  </div>
  <div class="h-2.5 w-full rounded-full bg-surface-800-100-token print:bg-gray-800 ">
    <div
      class={`h-2.5 rounded-full`}
      style={`width: ${percentage}%; background-color: ${getColor(percentage, false)}`} />
  </div>
</div>
