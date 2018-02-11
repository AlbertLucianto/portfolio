import colors from '../styles/colors';

export default [
  {
    title: 'Pintu Web App',
    description: 'Migrating the organisation\'s biggest source of fund for 8 years in goal to improve administration, security, performance, and usability.',
    detail: 'This project is also serves as Indonesian student\'s data management in Nanyang Technological University. My role is as UI/UX and Frontend Developer, and improving some of the application server. Tools used include React, Redux, Flask, MySQL, NGINX.',
    backgroundColor: 'rgb(255,45,85)', // Apple Guideline pink
    imageUrl: 'static/pintu-shop.png',
    links: [{ name: 'Website', url: 'https://pintusingapura.org/app' }],
  },
  {
    title: '3D SVG Editor',
    description: 'Mini Adobe Illustrator for creating 3D SVG assets.',
    detail: 'This project is intended to help me creating 3D assets rather than manually using CSS while working on my portfolio. This application is built using Angular and Electron. Some other notable libraries are Redux, Angular Redux, and RxJS.',
    backgroundColor: colors.purple,
    imageUrl: 'static/3d-svg-editor.gif',
    imgSize: 'large',
    links: [
      { name: 'Demo', url: 'https://albertlucianto.github.io/3d-svg-editor' },
      { name: 'Repo', url: 'https://github.com/albertlucianto/3d-svg-editor' },
    ],
  },
  {
    title: 'Interactive Digital Book',
    description: 'An application for composing interactive digital book. Interactions include in-air hand gestures and voice recognition.',
    detail: 'Built on Unity3D. Interesting encounters include async object modification, low-level mesh-collider for object selection and editing using raycast. AWS is deployed for storing and accessing digital books.',
    backgroundColor: colors.orange,
    links: [{ name: 'Repo', url: 'https://github.com/albertlucianto/interactive-digital-book' }],
  },
  {
    title: 'ICN Musical: Lakonna',
    description: 'Built main website for theatre drama by Indonesian Cultural Production.',
    detail: 'This project consists of two websites, one is the main website and the other is demographic. I\'m responsible of the Web Design and Frontend development of the main website, created using Vue.js',
    backgroundColor: '#77210b',
    imageUrl: 'static/lakonna-web.gif',
    imgSize: 'large',
    links: [{ name: 'Website', url: 'https://icnmusical.com/lakonna' }],
  },
  {
    title: 'Better Bus',
    description: 'A crowd level detection using Darknet Convolutional Neural Network and recommendation system in shuttle bus.',
    detail: 'Achieved 3rd Place in SingTel Techfest Hackathon 2018. Client side is build on Vue.js',
    backgroundColor: 'rgb(0,122,255)', // Apple Guideline blue
    imageUrl: 'static/better-bus.gif',
    links: [
      { name: 'Demo', url: 'https://albertlucianto.github.io/better-bus' },
      { name: 'Frontend', url: 'https://github.com/albertlucianto/better-bus' },
    ],
  },
  {
    title: 'Hot Potato',
    description: 'Hot potato is a simple game inpsired (or cloned to be exact) by Google internal tool. Players simply can create and pass potato to anyone for a limited time, otherwise they will drop it.',
    detail: 'This project is built on a serverless GraphQL with Graphcool and Vue.js',
    imageUrl: 'static/hot-potato.gif',
    backgroundColor: colors.orange,
    links: [
      { name: 'Demo', url: 'https://albertlucianto.github.io/hot-potato' },
      { name: 'Repo', url: 'https://github.com/albertlucianto/hot-potato' },
    ],
  },
];
