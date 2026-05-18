export default function ThemeScript() {
  return (
    <script
      suppressHydrationWarning
      // This is not dangerous because we are injecting a static, hardcoded string
      // that we control. There is no user input or dynamic data being interpolated here,
      // so there is no risk of XSS. We need this to run synchronously in the head
      // to prevent the theme flash.
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            const value = "; " + document.cookie;
            const parts = value.split("; theme=");
            let theme;
            if (parts.length === 2) theme = parts.pop().split(";").shift();
            
            if (theme === "dark") document.documentElement.classList.add("dark");
            else document.documentElement.classList.remove("dark");
          })()
        `,
      }}
    />
  );
}
