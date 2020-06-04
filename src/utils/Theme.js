import { createMuiTheme } from "@material-ui/core/styles";
const defaultFontFamily = ["Poppins", "sans-serif"].join(",");

const Theme = createMuiTheme({
  typography: {
    fontFamily: defaultFontFamily,
  },
  overrides: {
    MuiTypography: {
      color: {
        green: {
          color: "green",
        },
      },
    },
  },
});

export default Theme;
