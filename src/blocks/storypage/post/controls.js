/**
 * External dependencies
 */
import React from 'react';
import { find, map, reduce, isUndefined, pickBy } from 'lodash';
import { stringify } from 'querystringify';
import { i18n, components, editor, element } from '@frontkom/gutenberg-js';

const { __ } = i18n;
const { Fragment } = element;
const {
  ButtonGroup,
  Button,
  CategorySelect,
  FontSizePicker,
  IconButton,
  PanelBody,
  RangeControl,
  // TextControl,
  ToggleControl,
} = components;
const {
  MediaUpload,
  PanelColor,
} = editor;

const POST_TYPES = [
  {
    name: __('Auto'),
    slug: 'auto',
  },
  /* {
    name: __('With id'),
    slug: 'withid',
  }, */
  {
    name: __('Static'),
    slug: 'static',
  },
];

const FONT_SIZES = [
  {
    name: 'small',
    shortName: 'S',
    size: 14,
  },
  {
    name: 'regular',
    shortName: 'M',
    size: 16,
  },
  {
    name: 'large',
    shortName: 'L',
    size: 36,
  },
  {
    name: 'larger',
    shortName: 'XL',
    size: 48,
  },
];

// getFontSize event
export function getFontSize ({ customFontSize, fontSize }) {
  if (fontSize) {
    const fontSizeObj = find(FONT_SIZES, { name: fontSize });
    if (fontSizeObj) {
      return fontSizeObj.size;
    }
  }

  if (customFontSize) {
    return customFontSize;
  }
}

// onSelectImage event
export function onSelectImage ({ setAttributes }, media) {
  const toUpdate = { imageUrl: media.url, imageId: media.id, type: 'static' };

  if (media.data) {
    toUpdate.data = reduce(media.data, (result, value, key) => {
      key = key.replace('_', '-');
      result[ `data-${key}` ] = value;

      return result;
    }, {});
  }

  setAttributes(toUpdate);
}

/** Toolbar */

// Media Upload Toolbar
export const MediaUploadToolbar = ({ props }) => {
  const {
    attributes,
  } = props;

  const { imageId } = attributes;

  return (
    <MediaUpload
      onSelect={ media => onSelectImage(props, media) }
      type="image"
      value={ imageId }
      render={ ({ open }) => (
        <IconButton
          className="components-toolbar__control"
          label={ __('Edit image') }
          icon="edit"
          onClick={ open }
        />
      ) }
    />
  );
};

/** InspectorControls */

// Post Settings Panel
export const PostSettingsPanel = ({ props, options }) => {
  const {
    attributes,
    setAttributes,
    categories,
  } = props;

  const {
    // id,
    type,
    categoryId,
  } = attributes;

  const { title } = options || {};

  return (
    <PanelBody title={ title || __('Post Settings') }>
      <div className="components-post-type-picker__buttons">
        <ButtonGroup aria-label={ __('Post type') }>
          {
            map(POST_TYPES, ({ name, slug }) => {
              return (
                <Button
                  key={ slug }
                  isLarge
                  isPrimary={ type === slug }
                  aria-pressed={ type === slug }
                  onClick={ () => {
                    setAttributes({ type: slug });
                  } }
                >
                  { name }
                </Button>
              );
            })
          }
        </ButtonGroup>
      </div>
      {
        /* (type === 'withid') &&
        <TextControl
          value={ id }
          label={ __('Post id') }
          onChange={ nextId => {
            setAttributes({ id: parseInt(nextId) });
          } }
        /> */
      }

      {
        type === 'auto' &&
        <CategorySelect
          key="query-controls-category-select"
          categoriesList={ categories }
          label={ __('Last from (category)') }
          noOptionLabel={ __('All') }
          selectedCategoryId={ categoryId }
          onChange={ nextCategory => {
            setAttributes({ categoryId: nextCategory });
          } }
        />
      }
    </PanelBody>
  );
};

// Image Settings Panel
export const ImageSettingsPanel = ({ props, options }) => {
  const { attributes, setAttributes } = props;
  const {
    imageUrl,
    hasImage,
    hasParallax,
    dimRatio,
  } = attributes;

  const { title } = options || {};

  return (
    <PanelBody title={ title ||  __('Image Settings') }>
      <ToggleControl
        label={ __('Show image') }
        checked={ !! hasImage }
        onChange={ () => {
          setAttributes({ hasImage: ! hasImage });
        } }
      />
      { !! imageUrl && hasImage && (
        <Fragment>
          <ToggleControl
            label={ __('Fixed Background') }
            checked={ !! hasParallax }
            onChange={ () => {
              setAttributes({ hasParallax: ! hasParallax });
            } }
          />
          <RangeControl
            label={ __('Background Dimness') }
            value={ dimRatio }
            onChange={ ratio => {
              setAttributes({ dimRatio: ratio });
            } }
            min={ 0 }
            max={ 100 }
            step={ 10 }
          />
        </Fragment>
      ) }
    </PanelBody>
  );
};

// Text Settings Panel
export const TextSettingsPanel = ({ props, options }) => {
  const {
    attributes,
    setAttributes,
    fallbackFontSize,
  } = props;

  const { title } = options || {};

  const fontSize = getFontSize(attributes);

  return (
    <PanelBody title={ title || __('Text Settings') } className="blocks-font-size">
      <FontSizePicker
        fontSizes={ FONT_SIZES }
        fallbackFontSize={ fallbackFontSize }
        value={ fontSize }
        onChange={ fontSizeValue => {
          const thresholdFontSize = find(FONT_SIZES, { size: fontSizeValue });

          if (thresholdFontSize) {
            setAttributes({
              fontSize: thresholdFontSize.name,
              customFontSize: undefined,
            });
            return;
          }

          setAttributes({
            fontSize: undefined,
            customFontSize: fontSizeValue,
          });
        } }
      />
    </PanelBody>
  );
};

// Text Color Panel
export const TextColorPanel = ({ props, options }) => {
  const {
    setTextColor,
    textColor,
  } = props;

  const { title } = options || {};

  return (
    <PanelColor
      colorValue={ textColor.value }
      initialOpen={ false }
      title={ title || __('Text Color') }
      onChange={ setTextColor }
    />
  );
};

// Selectors
export function withSelectMedia (select, props) {
  const { imageId } = props.attributes;

  return {
    media: imageId ? select('core').getMedia(imageId) : null,
  };
}

export function withSelectCategory (select, props) {
  const { categoryId } = props.attributes;

  return {
    category: categoryId ? find(select('core').getCategories(), { id: categoryId }) : null,
  };
}

export function withSelectCategories (select) {
  return {
    categories: select('core').getCategories(),
  };
}

export function withSelectAuthor (select, props) {
  const { authorId } = props.attributes;

  return {
    author: authorId ? find(select('core').getAuthors(), { id: authorId }) : null,
  };
}

export function withAPIDataPost (props) {
  if (props.attributes.type === 'auto') {
    const postQuery = stringify(pickBy({
      category_id: props.attributes.categoryId,
      order: 'desc',
      orderby: 'date',
      per_page: 1,
    }, value => ! isUndefined(value)));

    return {
      postResults: `/wp/v2/posts?${postQuery}`,
    };
  }

  return {
    postResults: null,
  };
}

// componentDidUpdate
export function didUpdateMedia (prevProps, props) {
  const { media, attributes } = props;

  if (media && (media !== prevProps.media || media.source_url !== attributes.imageUrl)) {
    return { imageUrl: media.source_url };
  }

  return {};
}

export function didUpdateCategory (prevProps, props) {
  const { category, attributes } = props;

  if (category && (category !== prevProps.category || category.name !== attributes.category)) {
    return {
      category: category.name,
      categoryUrl: category.link,
    };
  }

  return {};
}

export function didUpdateAuthor (prevProps, props) {
  const { author, attributes } = props;

  if (author && (author !== prevProps.author || author.name !== attributes.author)) {
    return {
      author: author.name,
      authorUrl: author.link,
      authorImageUrl: author.avatar_urls[96],
    };
  }

  return {};
}

export function didUpdatePost (prevProps, props) {
  const { postResults, attributes } = props;
  const { type, title } = attributes;

  const postRes = postResults.data ? postResults.data[ 0 ] : null;

  if (type === 'auto' && postResults && postRes && (postResults !== prevProps.postResults || title !== postRes.title.raw)) {
    return {
      id: parseInt(postRes.id),
      title: postRes.title.raw,
      teaser: postRes.excerpt.raw,
      categoryId: postRes.categories[0],
      date: postRes.date,
      imageId: postRes.featured_media,
      authorId: postRes.author,
      link: postRes.link,
    };
  }
}

// helpers
export function dimRatioToClass (ratio) {
  return (ratio === 0 || ratio === 50) ?
    null :
    'has-background-dim-' + (10 * Math.round(ratio / 10));
}

export function backgroundImageStyles (url) {
  return url ?
    { backgroundImage: `url(${url})` } :
    undefined;
}
