import ReactGA from 'react-ga4';

export const initGA = () => {
  ReactGA.initialize('G-S23DTRN7LY');
};

export const logPageView = () => {
  ReactGA.send({ hitType: 'pageview', page: window.location.pathname });
};
