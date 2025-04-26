const theme = {
  nome: "PhotoFlow",
  logo: "/assets/LogoPhotoFlow.png",
  colors: {
    primary: "#4B7EFF",
    primaryDark: "#3A63CC",      // hover do botão primário
    onPrimary: "#FFFFFF",        // texto branco no botão primário

    secondary: "#ED89C3",
    background: "#FFFFFF",
    surface: "#F5F7FA",          // usado em cabeçalhos de tabela/cards

    text: "#101B34",
    textSecondary: "#5C6B89",
    borderLight: "#E0E6ED",      // linhas sutis

    success: "#28C76F",
    warning: "#FF9F43",
    danger: "#EA5455",

    inputBackground: "#FFFFFF",  // fundo dos inputs
    gray: "#E4E7EC",             // hover cinza
    grayLight: "#F1F3F5",  
    
    greenLogo: '#66D2CD',        // cor verde do logo

    // NOVO - para a sidebar
    sidebarBackground: "#F1F3F5",  // cor de fundo da sidebar
    sidebarText: "#101B34",        // cor do texto da sidebar
    sidebarHover: "#4B7EFF",       // cor de hover na sidebar
    sidebarItemActive: "#EA5455",  // cor para item ativo na sidebar
  },
  font: "Roboto, sans-serif",
  shadow: "0 4px 12px rgba(0, 0, 0, 0.08)" // sombra padrão para cards e modais
};

export default theme;
