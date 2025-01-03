// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Composables
import { createVuetify } from "vuetify";

export default createVuetify({
  theme: {
    defaultTheme: "light",
    themes: {
      light: {
        colors: {
          accent: "#444CF7",
          accentLight: "#8084F9",
          accentGray: "#e5e5f7",
          // background: "#F8FAFC",
        },
      },
    },
  },
});
