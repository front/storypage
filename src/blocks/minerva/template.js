function getPostAttributes (post) {
  return {
    title: post.title.raw,
    teaser: post.excerpt.raw,
    categoryId: post.categories[0],
    date: post.date,
    imageId: post.featured_media,
    authorId: post.author,
    link: post.link,
  };
}

export default posts => {
  let primary, secondary, tertiary;
  const boxedTeasers = [], teasers = [];

  for (let i = 0; i < posts.length; i++) {
    if (i === 0) {
      primary = getPostAttributes(posts[i]);
    }
    else if (i === 1) {
      secondary = getPostAttributes(posts[i]);
    }
    else if (i === 2) {
      tertiary = getPostAttributes(posts[i]);
    }
    else if (i >= 3 && i <= 15) {
      teasers.push({
        ...getPostAttributes(posts[i]),
        className: 'grid-item',
      });
    }
    else if (i >= 16 && i <= 19) {
      boxedTeasers.push({
        ...getPostAttributes(posts[i]),
        className: 'grid-item',
        customFontSize: 24,
        customTextColor: '#BF5048',
        showCategory: false,
        hasImage: false,
      });
    }
  }

  return [
    [ 'minerva/article-primary', { ...primary }, [] ],
    [ 'storypage/section', { className: 'container', contentClass: 'top-border-desktop' }, [
      [ 'storypage/row', { columns: 2, widths: '8,4' }, [
        [ 'minerva/article-secondary', {
          layout: 'col8 column-start1',
          ...secondary,
        } ],
        [ 'minerva/article-tertiary', {
          layout: 'col4 column-start9',
          ...tertiary,
          customFontSize: 36,
          fontSize: 'large',
        } ],
      ] ],
    ] ],
    [ 'storypage/section', { className: 'container', contentClass: 'l-row' }, [
      [ 'storypage/row', { columns: 2, widths: '4,8' }, [
        [ 'minerva/section', { layout: 'col4 column-start1', className: 'boxed', title: 'Mest lest', contentClass: 'gallery-one extra-space-xl' }, [
          [ 'minerva/article-teaser', { ...boxedTeasers[0] } ],
          [ 'minerva/article-teaser', { ...boxedTeasers[1] } ],
          [ 'minerva/article-teaser', { ...boxedTeasers[2] } ],
        ] ],
        [ 'minerva/section', { layout: 'col8 column-start5', contentClass: 'gallery-one extra-space-l' }, [
          [ 'minerva/article-teaser', { ...teasers[0] } ],
          [ 'minerva/article-teaser', { ...teasers[1] } ],
          [ 'minerva/article-teaser', { ...teasers[2] } ],
          [ 'minerva/article-teaser', { ...teasers[3] } ],
        ] ],
      ] ],
    ] ],
    [ 'storypage/section', { className: 'container', contentClass: 'l-row' }, [
      [ 'storypage/row', { columns: 2, widths: '6,6' }, [
        [ 'core/paragraph', { layout: 'col6 column-start1', placeholder: 'An ad' } ],
        [ 'storypage/section', { layout: 'col6 column-start7', contentClass: 'l-col-half' }, [
          [ 'minerva/podcast-box', {
            title: 'Podkast',
            subtitle: 'Hør siste episode25: Episode 25: Kristoffer Egeberg',
            teaser: 'Minervapodden snakker med redaktør i faktisk.no, Kristoffer Egeberg, og spør rett ut: Ville faktasjekkens flaggskip vært bedre om de ansatte noen fra den innvandringskritiske høyresiden? På veien til det spørsmålet er vi innom Terje Tvedt, proteinpulver, Dagsavisens relevans, betydningen av viral spredning og problemene med den upolitiske journalisten.',
          } ],
        ] ],
      ] ],
    ] ],
    /* [ 'storypage/section', {className: 'container', contentClass: 'l-row' }, [
      [ 'minerva/article-tertiary', {
        ...tertiaries[4],
        // title: 'Handel dreier seg om å vinne',
        // teaser: 'Trumps tiltagende handelskrig har sitt opphav i presidentens primitive syn på handel. Fredag truer en ny alvorlig omdreining.',
        // category: 'Kommentar',
        // imageUrl: 'https://www.minervanett.no/wp-content/uploads/2018/06/kunst_utstilling-960x500.jpg',
      } ],
      [ 'minerva/article-tertiary', {
        ...tertiaries[5],
        // title: 'Handel dreier seg om å vinne',
        // teaser: 'Trumps tiltagende handelskrig har sitt opphav i presidentens primitive syn på handel. Fredag truer en ny alvorlig omdreining.',
        // category: 'Kommentar',
        // imageUrl: 'https://www.minervanett.no/wp-content/uploads/2018/06/kunst_utstilling-960x500.jpg',
      } ],
      [ 'minerva/article-tertiary', {
        ...tertiaries[6],
        // title: 'Handel dreier seg om å vinne',
        // teaser: 'Trumps tiltagende handelskrig har sitt opphav i presidentens primitive syn på handel. Fredag truer en ny alvorlig omdreining.',
        // category: 'Kommentar',
        // imageUrl: 'https://www.minervanett.no/wp-content/uploads/2018/06/kunst_utstilling-960x500.jpg',
      } ],
      [ 'minerva/article-tertiary', {
        ...tertiaries[7],
        // title: 'Handel dreier seg om å vinne',
        // teaser: 'Trumps tiltagende handelskrig har sitt opphav i presidentens primitive syn på handel. Fredag truer en ny alvorlig omdreining.',
        // category: 'Kommentar',
        // imageUrl: 'https://www.minervanett.no/wp-content/uploads/2018/06/kunst_utstilling-960x500.jpg',
      } ],
      [ 'minerva/article-tertiary', {
        ...tertiaries[8],
        // title: 'Handel dreier seg om å vinne',
        // teaser: 'Trumps tiltagende handelskrig har sitt opphav i presidentens primitive syn på handel. Fredag truer en ny alvorlig omdreining.',
        // category: 'Kommentar',
        // imageUrl: 'https://www.minervanett.no/wp-content/uploads/2018/06/kunst_utstilling-960x500.jpg',
      } ],
      [ 'minerva/article-tertiary', {
        ...tertiaries[9],
        // title: 'Handel dreier seg om å vinne',
        // teaser: 'Trumps tiltagende handelskrig har sitt opphav i presidentens primitive syn på handel. Fredag truer en ny alvorlig omdreining.',
        // category: 'Kommentar',
        // imageUrl: 'https://www.minervanett.no/wp-content/uploads/2018/06/kunst_utstilling-960x500.jpg',
      } ],
      [ 'core/button', { className: 'minerva-button', align: 'center', text: 'Last flere artikler', customBackgroundColor: '#FFF', customTextColor: '#000', url: 'https://www.minervanett.no/arkiv/' } ],
    ] ],*/
  ];
};
