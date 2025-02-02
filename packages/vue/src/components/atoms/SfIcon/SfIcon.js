const HEX_REGEX = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
const RGB_REGEX = /rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)/;
const SF_SIZES = ["xxs", "xs", "sm", "md", "lg", "xl", "xxl", "xl3", "xl4"];

export default {
  name: "SfIcon",
  props: {
    /**
     * Icon SVG path
     */
    path: {
      type: String,
      default: ""
    },
    /**
     * Custom size of the icon
     * It can be our standard sizes, or `12px` or `1.2rem` or nothing.
     * Standard sizes: `xxs`, `xs`, `sm`, `md`, `lg`, `xl`, `xxl`, `xl3`, `xl4`.
     */
    size: {
      type: String,
      default: ""
    },
    /**
     * Custom color of the icon
     * It can be according to our standard colors, or `#fff` or `rgb(255,255,255)` or nothing.
     * Standard colors: `primary`, `secondary`, `white`, `black`, `accent`, `gray-primary`, `gray-secondary`, `light-primary`, `light-secondary`, `pink-primary`, `pink-secondary`, `yellow-primary`, `yellow-secondary`, `blue-primary`, `blue-secondary`.
     */
    color: {
      type: String,
      default: ""
    }
  },
  computed: {
    isDecimalOrHexColor() {
      const color = this.color.trim();
      return RGB_REGEX.test(color) || HEX_REGEX.test(color);
    },
    isSFSizes() {
      const size = this.size.trim();
      return SF_SIZES.includes(size);
    },
    iconColor() {
      return !this.isDecimalOrHexColor
        ? `sf-icon--color-${this.color.trim()}`
        : this.color;
    },
    iconSize() {
      return this.isSFSizes ? `sf-icon--size-${this.size.trim()}` : "";
    }
  },
  mounted() {
    if (this.isDecimalOrHexColor) {
      this.$refs.icon.style.setProperty("--icon-color", this.color);
    }

    if (!this.isSFSizes) {
      this.$refs.icon.style.setProperty("--icon-size", this.size);
    }
  }
};
