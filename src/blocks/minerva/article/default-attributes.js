export const articleAttributes = {
  title: {
    type: 'array',
    source: 'children',
    selector: 'h1,h2,h3,h4,h5,h6',
    default: 'Handel dreier seg om å vinne',
  },
  teaser: {
    type: 'array',
    source: 'children',
    selector: 'p',
    default: 'Trumps tiltagende handelskrig har sitt opphav i presidentens primitive syn på handel. Fredag truer en ny alvorlig omdreining.',
  },
  category: {
    type: 'string',
    default: 'Kommentar',
  },
  date: {
    type: 'string',
    default: '03. juli 2018',
  },
  imageUrl: {
    type: 'string',
    default: 'https://www.minervanett.no/wp-content/uploads/2018/07/Sologne.jpg',
  },
  authorName: {
    type: 'string',
    default: 'Aksel Fridstrøm',
  },
  authorImageUrl: {
    type: 'string',
    default: 'https://www.minervanett.no/wp-content/uploads/2018/01/Aksel-128x128.jpg',
  },
};

export const backgroundImageStyles = url => {
  return url ?
    { backgroundImage: `url(${url})` } :
    undefined;
};
