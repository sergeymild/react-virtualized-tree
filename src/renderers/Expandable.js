import React from 'react';
import {submitEvent} from '../eventWrappers';
import {getNodeRenderOptions, updateNode} from '../selectors/nodes';
import {Renderer} from '../shapes/rendererShapes';

const Expandable = ({onChange, node, children, index, renderIcon}) => {
  const {hasChildren, isExpanded} = getNodeRenderOptions(node);

  const handleChange = () => onChange({...updateNode(node, {expanded: !isExpanded}), index});

  return (
    <span onDoubleClick={handleChange}>
      {hasChildren &&
        renderIcon({
          onKeyDown: submitEvent(handleChange),
          onClick: handleChange,
          tabIndex: 0,
        })}
      {children}
    </span>
  );
};

Expandable.propTypes = {...Renderer};

export default Expandable;
