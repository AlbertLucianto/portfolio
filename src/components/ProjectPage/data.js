import colors from '../styles/colors';

export default [
  {
    title: 'Pintu Web App',
    description: 'Migrating the organisation\'s biggest source of fund for 8 years in goal to improve administration, security, performance, and usability.',
    detail: 'This project is also serves as Indonesian student\'s data management in Nanyang Technological University. My role is as UI/UX and Frontend Developer, and improving some of the application server. Tools used include React, Redux, Flask, MySQL, NGINX.',
    backgroundColor: 'rgb(255,45,85)', // Apple Guideline pink
    imageUrl: 'static/pintu-shop.png',
    links: [{ name: 'Website', url: 'https://pintusingapura.org/app' }],
    stacks: [
      { name: 'React', imgUrl: 'https://cdn-images-1.medium.com/max/1600/1*dTkerp9GmV4lA2NkHWRLlQ.png', url: 'https://reactjs.org/' },
      { name: 'Redux', imgUrl: 'https://raw.githubusercontent.com/reactjs/redux/master/logo/logo.png', url: 'https://redux.js.org/docs/introduction/' },
      { name: 'Immutable.js', imgUrl: 'https://cloudinary-a.akamaihd.net/bountysource/image/upload/d_noaoqqwxegvmulwus0un.png,c_pad,w_200,h_200,b_white/pfxsayjjyvwk3amjidxo.png', url: 'https://facebook.github.io/immutable-js/' },
      { name: 'Flask', imgUrl: 'http://www.unixstickers.com/image/data/stickers/flask/Flask-logo.sh.png', url: 'http://flask.pocoo.org/' },
      { name: 'SQLAlchemy', imgUrl: 'https://www.fullstackpython.com/img/logos/sqlalchemy.jpg', url: 'https://www.sqlalchemy.org/' },
      { name: 'NGINX', imgUrl: 'https://www.nuno-sarmento.com/wp-content/uploads/2017/07/nginx.png', url: 'https://www.nginx.com/' },
      { name: 'Ansible', imgUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Ansible_Logo.png', url: 'https://www.ansible.com/' },
    ],
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
    stacks: [
      { name: 'Angular', imgUrl: 'https://angular.io/assets/images/logos/angular/angular.png', url: 'https://angular.io/' },
      { name: 'Electron', imgUrl: 'https://camo.githubusercontent.com/79904b8ba0d1bce43022bbd5710f0ea1db33f54f/68747470733a2f2f7261776769742e636f6d2f73696e647265736f726875732f617765736f6d652d656c656374726f6e2f6d61737465722f656c656374726f6e2d6c6f676f2e737667', url: 'https://electronjs.org/' },
      { name: 'Redux', imgUrl: 'https://raw.githubusercontent.com/reactjs/redux/master/logo/logo.png', url: 'https://redux.js.org/docs/introduction/' },
      { name: 'RxJS', imgUrl: 'https://raw.githubusercontent.com/Reactive-Extensions/RxJS/master/doc/designguidelines/images/984368.png', url: 'http://reactivex.io/rxjs/' },
      { name: 'Redux Observable', imgUrl: 'https://cdn-images-1.medium.com/max/600/1*YFFWL4PhXKSDId3GEeRlYA.png', url: 'https://redux-observable.js.org/' },
    ],
  },
  {
    title: 'Interactive Digital Book',
    description: 'An application for composing interactive digital book. Interactions include in-air hand gestures and voice recognition.',
    detail: 'Built on Unity3D. Interesting encounters include async object modification, low-level mesh-collider for object selection and editing using raycast. AWS is deployed for storing and accessing digital books.',
    backgroundColor: colors.orange,
    links: [{ name: 'Repo', url: 'https://github.com/albertlucianto/interactive-digital-book' }],
    stacks: [
      { name: 'Unity3D', imgUrl: 'https://seeklogo.com/images/U/unity-logo-988A22E703-seeklogo.com.png', url: 'https://unity3d.com/' },
      { name: 'AWS', imgUrl: 'static/aws-logo.png', url: 'aws.amazon.com/‎' },
      { name: 'Leap Motion', imgUrl: 'https://static1.squarespace.com/static/4f35ab56cb1284395213ff6f/t/518ede9ee4b0dde685f6a1ff/1368317599400/LeapRefreshLogo.png', url: 'https://www.leapmotion.com/' },
      { name: 'Autodesk Maya', imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtAWLfTfFXxoLxUAleMXkciD3cug7x0gz3VK4WnznTEQL29Bnl', url: 'https://www.autodesk.com.sg/products/maya/overview' },
    ],
  },
  {
    title: 'ICN Musical: Lakonna',
    description: 'Built main website for theatre drama by Indonesian Cultural Production.',
    detail: 'This project consists of two websites, one is the main website and the other is a demographic. I\'m responsible of the Web Design and Frontend development of the main website, created using Vue.js',
    backgroundColor: '#77210b',
    imageUrl: 'static/lakonna-web.gif',
    imgSize: 'large',
    links: [{ name: 'Website', url: 'https://icnmusical.com/lakonna' }],
    stacks: [
      { name: 'Vue.js', imgUrl: 'https://vuejs.org/images/logo.png', url: 'https://vuejs.org/' },
      { name: 'Adobe Illustrator', imgUrl: 'https://helpx.adobe.com/content/dam/help/mnemonics/ai_cc_app_RGB.svg' },
      { name: 'Adobe Photoshop', imgUrl: 'static/photoshop-logo.png' },
    ],
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
    stacks: [
      { name: 'Vue.js', imgUrl: 'https://vuejs.org/images/logo.png', url: 'https://vuejs.org/' },
      { name: 'TensorFlow', imgUrl: 'https://pbs.twimg.com/profile_images/773317101012586496/q8sc1KuZ_400x400.jpg', url: 'https://www.tensorflow.org/' },
    ],
  },
  {
    title: 'Hot Potato',
    description: 'Hot potato is a simple game inpsired by Google internal tool. Players simply can create and pass potato to anyone for a limited time, otherwise they drop it.',
    detail: 'This project is built on a serverless GraphQL with Graphcool and Vue.js',
    imageUrl: 'static/hot-potato.gif',
    backgroundColor: colors.orange,
    links: [
      { name: 'Demo', url: 'https://albertlucianto.github.io/hot-potato' },
      { name: 'Repo', url: 'https://github.com/albertlucianto/hot-potato' },
    ],
    stacks: [
      { name: 'Vue.js', imgUrl: 'https://vuejs.org/images/logo.png', url: 'https://vuejs.org/' },
      { name: 'Vue Router', imgUrl: 'static/vue-router-logo.png', url: 'https://router.vuejs.org/en/' },
      { name: 'GraphQL', imgUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/GraphQL_Logo.svg/768px-GraphQL_Logo.svg.png', url: 'http://graphql.org/' },
      { name: 'Apollo GraphQL', imgUrl: 'https://s3.amazonaws.com/media-p.slid.es/uploads/345677/images/3094428/agcdgv0j6vh2q55ygu9i.png', url: 'https://www.apollographql.com/' },
      { name: 'Graphcool', imgUrl: 'https://seeklogo.com/images/G/graphcool-logo-E2E92C1A2B-seeklogo.com.png', url: 'https://www.graph.cool/' },
    ],
  },
];
