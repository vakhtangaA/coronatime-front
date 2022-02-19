module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        btnColor: '#0FBA68',
        bgNewCases: '#F3EBFF',
        bgRecoveredCases: '#EBFCF3',
        bgDeathCases: '#FEFDEC',
        tableHeader: '#f6f6f7',
      },
      backgroundImage: {
        caseChart: 'url(/images/caseCharts.png)',
      },
      spacing: {
        minHeightChartImg: '8rem',
        'max-w-10xl': '1500px',
      },
      maxWidth: {
        '604px': '604px',
      },
    },
  },
  plugins: [],
};
