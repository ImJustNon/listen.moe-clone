import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  components: {
    Drawer: {
      parts: ['dialog', 'header', 'body'],
      variants: {
        primary: {
        },
        secondary: {
          dialog: {
            maxW: "200px",
          }
        }
      }
    }
  }
});

export default theme;
