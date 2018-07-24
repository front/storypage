export default posts => {
  // console.log('template posts', posts);
  const primary = {
    title: posts[0].title.raw,
    teaser: posts[0].excerpt.raw,
    categoryId: posts[0].categories[0],
    date: posts[0].date,
    imageId: posts[0].featured_media,
    authorId: posts[0].author,
  };

  return [
    [ 'minerva/article-primary', {
      ...primary,
      // title: 'Handel dreier seg om å vinne',
      // teaser: 'Trumps tiltagende handelskrig har sitt opphav i presidentens primitive syn på handel. Fredag truer en ny alvorlig omdreining.',
      // category: 'Kommentar',
    }, [] ],
    [ 'gutenbergjs/section', { maxWidth: '1182px' }, [
      [ 'gutenbergjs/row', { colmuns: 2, widths: '8,4' }, [
        [ 'minerva/article-secondary', {
          layout: 'col8 column-start1',
          title: 'Handel dreier seg om å vinne',
          teaser: 'Trumps tiltagende handelskrig har sitt opphav i presidentens primitive syn på handel. Fredag truer en ny alvorlig omdreining.',
          category: 'Kommentar',
        } ],
        [ 'minerva/article-secondary', {
          layout: 'col4 column-start9',
          title: 'Handel dreier seg om å vinne',
          teaser: 'Trumps tiltagende handelskrig har sitt opphav i presidentens primitive syn på handel. Fredag truer en ny alvorlig omdreining.',
          category: 'Kommentar',
        } ],
      ] ],
    ] ],
    [ 'gutenbergjs/section', { maxWidth: '1182px' }, [
      [ 'gutenbergjs/row', { colmuns: 2, widths: '4,8' }, [
        [ 'minerva/section', { layout: 'col4 column-start1' }, [
          [ 'minerva/article-teaser', {
            title: 'Handel dreier seg om å vinne',
            teaser: 'Trumps tiltagende handelskrig har sitt opphav i presidentens primitive syn på handel. Fredag truer en ny alvorlig omdreining.',
          } ],
          [ 'minerva/article-teaser', {
            title: 'Handel dreier seg om å vinne',
            teaser: 'Trumps tiltagende handelskrig har sitt opphav i presidentens primitive syn på handel. Fredag truer en ny alvorlig omdreining.',
          } ],
          [ 'minerva/article-teaser', {
            title: 'Handel dreier seg om å vinne',
            teaser: 'Trumps tiltagende handelskrig har sitt opphav i presidentens primitive syn på handel. Fredag truer en ny alvorlig omdreining.',
          } ],
        ] ],
        [ 'gutenbergjs/section', { layout: 'col8 column-start5' }, [
          [ 'minerva/article-tertiary', {
            title: 'Handel dreier seg om å vinne',
            teaser: 'Trumps tiltagende handelskrig har sitt opphav i presidentens primitive syn på handel. Fredag truer en ny alvorlig omdreining.',
            category: 'Kommentar',
            imageUrl: 'https://www.minervanett.no/wp-content/uploads/2018/06/kunst_utstilling-960x500.jpg',
          } ],
          [ 'minerva/article-tertiary', {
            title: 'Handel dreier seg om å vinne',
            teaser: 'Trumps tiltagende handelskrig har sitt opphav i presidentens primitive syn på handel. Fredag truer en ny alvorlig omdreining.',
            category: 'Kommentar',
            imageUrl: 'https://www.minervanett.no/wp-content/uploads/2018/06/kunst_utstilling-960x500.jpg',
          } ],
          [ 'minerva/article-tertiary', {
            title: 'Handel dreier seg om å vinne',
            teaser: 'Trumps tiltagende handelskrig har sitt opphav i presidentens primitive syn på handel. Fredag truer en ny alvorlig omdreining.',
            category: 'Kommentar',
            imageUrl: 'https://www.minervanett.no/wp-content/uploads/2018/06/kunst_utstilling-960x500.jpg',
          } ],
          [ 'minerva/article-tertiary', {
            title: 'Handel dreier seg om å vinne',
            teaser: 'Trumps tiltagende handelskrig har sitt opphav i presidentens primitive syn på handel. Fredag truer en ny alvorlig omdreining.',
            category: 'Kommentar',
            imageUrl: 'https://www.minervanett.no/wp-content/uploads/2018/06/kunst_utstilling-960x500.jpg',
          } ],
        ] ],
      ] ],
    ] ],
    [ 'gutenbergjs/section', { maxWidth: '1182px' }, [
      [ 'gutenbergjs/row', { colmuns: 2, widths: '6,6' }, [
        [ 'core/paragraph', { layout: 'col6 column-start1', placeholder: 'An ad' } ],
        [ 'minerva/podcast-box', { layout: 'col6 column-start7', customBackgroundColor: '#BF5048', title: 'Podkast', subtitle: 'Hør siste episode25: Episode 25: Kristoffer Egeberg', teaser: 'Minervapodden snakker med redaktør i faktisk.no, Kristoffer Egeberg, og spør rett ut: Ville faktasjekkens flaggskip vært bedre om de ansatte noen fra den innvandringskritiske høyresiden? På veien til det spørsmålet er vi innom Terje Tvedt, proteinpulver, Dagsavisens relevans, betydningen av viral spredning og problemene med den upolitiske journalisten.' } ],
      ] ],
    ] ],
    [ 'gutenbergjs/section', { maxWidth: '980px' }, [
      [ 'minerva/article-tertiary', {
        title: 'Handel dreier seg om å vinne',
        teaser: 'Trumps tiltagende handelskrig har sitt opphav i presidentens primitive syn på handel. Fredag truer en ny alvorlig omdreining.',
        category: 'Kommentar',
        imageUrl: 'https://www.minervanett.no/wp-content/uploads/2018/06/kunst_utstilling-960x500.jpg',
      } ],
      [ 'minerva/article-tertiary', {
        title: 'Handel dreier seg om å vinne',
        teaser: 'Trumps tiltagende handelskrig har sitt opphav i presidentens primitive syn på handel. Fredag truer en ny alvorlig omdreining.',
        category: 'Kommentar',
        imageUrl: 'https://www.minervanett.no/wp-content/uploads/2018/06/kunst_utstilling-960x500.jpg',
      } ],
      [ 'minerva/article-tertiary', {
        title: 'Handel dreier seg om å vinne',
        teaser: 'Trumps tiltagende handelskrig har sitt opphav i presidentens primitive syn på handel. Fredag truer en ny alvorlig omdreining.',
        category: 'Kommentar',
        imageUrl: 'https://www.minervanett.no/wp-content/uploads/2018/06/kunst_utstilling-960x500.jpg',
      } ],
      [ 'minerva/article-tertiary', {
        title: 'Handel dreier seg om å vinne',
        teaser: 'Trumps tiltagende handelskrig har sitt opphav i presidentens primitive syn på handel. Fredag truer en ny alvorlig omdreining.',
        category: 'Kommentar',
        imageUrl: 'https://www.minervanett.no/wp-content/uploads/2018/06/kunst_utstilling-960x500.jpg',
      } ],
      [ 'minerva/article-tertiary', {
        title: 'Handel dreier seg om å vinne',
        teaser: 'Trumps tiltagende handelskrig har sitt opphav i presidentens primitive syn på handel. Fredag truer en ny alvorlig omdreining.',
        category: 'Kommentar',
        imageUrl: 'https://www.minervanett.no/wp-content/uploads/2018/06/kunst_utstilling-960x500.jpg',
      } ],
      [ 'minerva/article-tertiary', {
        title: 'Handel dreier seg om å vinne',
        teaser: 'Trumps tiltagende handelskrig har sitt opphav i presidentens primitive syn på handel. Fredag truer en ny alvorlig omdreining.',
        category: 'Kommentar',
        imageUrl: 'https://www.minervanett.no/wp-content/uploads/2018/06/kunst_utstilling-960x500.jpg',
      } ],
      [ 'core/button', { className: 'minerva-button', align: 'center', text: 'Last flere artikler', customBackgroundColor: '#FFF', customTextColor: '#000', url: 'https://www.minervanett.no/arkiv/' } ],
    ] ],
  ];
};
