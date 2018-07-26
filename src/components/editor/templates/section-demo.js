export default [
  ['storypage/section', { maxWidth: '1182px' }, [
    [ 'core/heading', {
      content: 'Sections help you to organise your page content!',
    } ],
    [ 'core/paragraph', {
      content: 'Basically, a section is a container which could wrap one or more blocks and give them the same background.',
      fontSize: 'regular',
    } ],
  ]],

  ['core/separator', {}, []],
  ['storypage/section', { backgroundColor: 'very-light-gray',  maxWidth: '1182px' }, [
    [ 'core/paragraph', {
      content: 'Sections could have a max width...',
      align: 'center',
      fontSize: 'large',
    } ],
    [ 'core/paragraph', {
      content: '...or you can remove the \'max-width\' value in the Section Settings (sidebar) and make it full screen!',
      fontSize: 'regular',
      align: 'center',
    } ],
  ]],

  ['core/separator', {}, []],
  ['storypage/section', {
    hasImage: true,
    url: 'https://www.minervanett.no/wp-content/uploads/2018/07/Sologne.jpg',
  }, [
    [ 'core/paragraph', {
      content: 'You can set a background image...',
      align: 'center',
      fontSize: 'large',
      customTextColor: 'white',
    } ],
    [ 'core/paragraph', {
      content: '...or just a color, turning off the \'Has background image\' option and setting a background color in Section Settings.',
      align: 'center',
      fontSize: 'regular',
      customTextColor: 'white',
    } ],
  ]],

  ['core/separator', {}, []],
  ['storypage/section', { customBackgroundColor: 'black' }, [
    ['storypage/section', { maxWidth: '1182px' }, [
      [ 'core/paragraph', {
        content: 'Feel free to combine section with other blocks!',
        align: 'center',
        fontSize: 'large',
        customTextColor: 'white',
      } ],
      ['core/columns', { columns: 3 }, [
        [ 'core/column', {}, [
          [ 'core/paragraph', {
            placeholder: 'Column 1',
            content: 'For example, you can nest a section with max-width...',
            align: 'center',
            fontSize: 'regular',
            customTextColor: 'white',
          } ],
        ]],
        [ 'core/column', {}, [
          [ 'core/paragraph', {
            placeholder: 'Column 2',
            content: '...inside a full screen section with a background...',
            align: 'center',
            fontSize: 'regular',
            customTextColor: 'white',
          } ],
        ]],
        [ 'core/column', {}, [
          [ 'core/paragraph', {
            placeholder: 'Column 3',
            content: '...and then use columns to organise you content..',
            align: 'center',
            fontSize: 'regular',
            customTextColor: 'white',
          } ],
        ]],
      ]],
    ]],
  ]],
];
