import ReactGA from 'react-ga4';

export const initGA = () => {
  ReactGA.initialize('G-374285105');
};

export const logPageView = () => {
  ReactGA.send({ hitType: 'pageview', page: window.location.pathname });
};
