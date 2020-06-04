import { createMuiTheme } from "@material-ui/core/styles";
const defaultFontFamily = ["Poppins", "sans-serif"].join(",");

const Theme = createMuiTheme({
  typography: {
    fontFamily: defaultFontFamily,
  },
});

export default Theme;
