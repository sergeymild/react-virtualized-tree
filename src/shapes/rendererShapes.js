import PropTypes from 'prop-types';

import {FlattenedNode} from './nodeShapes';

export const Renderer = {
  measure: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  node: PropTypes.shape(FlattenedNode),
  index: PropTypes.number.isRequired,
  renderIcon: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object,
};
