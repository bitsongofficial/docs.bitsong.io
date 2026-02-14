export default defineAppConfig({
  ui: {
    colors: {
      primary: 'bitsong',
      secondary: 'sky',
      neutral: 'zinc'
    },
    contentNavigation: {
      slots: {
        link: 'text-base font-medium',
      }
    }
  },
  header: {
    title: 'docs',
    logo: {
      alt: 'BitSong',
      light: '/logo.svg',
      dark: '/logo.svg',
    }
  }
})