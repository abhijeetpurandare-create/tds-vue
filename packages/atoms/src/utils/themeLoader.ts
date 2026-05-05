export const loadTheme = async () => {
  try {
    const response = await fetch('/Theme_Red.json');
    const themeData = await response.json();
    return themeData;
  } catch (error) {
    console.error('Error loading theme:', error);
    return {};
  }
}; 