import React from 'react';
import {submitEvent} from '../eventWrappers';
import {getNodeRenderOptions, updateNode} from '../selectors/nodes';
import {Renderer} from '../shapes/rendererShapes';

const Expandable = ({onChange, node, children, index, renderIcon, className}) => {
  const {hasChildren, isExpanded} = getNodeRenderOptions(node);

  const handleChange = () => onChange({...updateNode(node, {expanded: !isExpanded}), index});

  return (
    <span onDoubleClick={handleChange} className={className}>
      {hasChildren &&
        renderIcon &&
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
