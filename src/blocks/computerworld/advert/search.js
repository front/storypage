
import Solr from '../solr';

const solrEndpoint = 'https://solrproxy.devz.no/solr/newsfront-advertorials';
const sitePath = 'http://bilag.cw.no';
const imageSource = 'http://static.cw.newsfront.no/sites/default/files/styles/crop_image_SOURCE_STYLE/public';


export function getImageUrl (path, source = 'landscape', style = 'large') {
  const prefix = imageSource.replace('SOURCE', source).replace('STYLE', style);
  return `${prefix}/${path}`;
}


export async function getRandomAdvert () {
  const client = new Solr(solrEndpoint);
  const res = await client.getArticles(25, 0, {
    bundle: 'advert',
    type: 'article',
  }, {
    fl: 'entity_id,title,teaser,media,path_alias',
    sort: 'published desc',
  });

  res.docs.sort(() => 0.5 - Math.random());
  const adv = res.docs[0];
  if(!adv) { return {}; }

  const media = adv.media && JSON.parse(adv.media);
  const image = media && media.image && media.image.main;

  return {
    id: adv.entity_id,
    title: adv.title,
    teaser: adv.teaser,
    image: image ? getImageUrl(image.path, 'main', 'medium') : '',
    caption: image ? image.alt : '',
    link: `${sitePath}/${adv.path_alias}`,
  };
}
