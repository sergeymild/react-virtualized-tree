import React, {Component} from 'react';

import Tree from '../../../src/TreeContainer';
import Renderers from '../../../src/renderers';
import {Nodes} from '../../../testData/sampleTree';
import {createEntry} from '../toolbelt';

const {Expandable} = Renderers;

class ChangeRenderers extends Component {
  state = {
    nodes: Nodes,
  };

  handleChange = nodes => {
    console.log(nodes);
    this.setState({nodes});
  };

  render() {
    return (
      <Tree nodes={this.state.nodes} height={50} onChange={this.handleChange}>
        {({style, node, ...rest}) => (
          <Expandable
            style={style}
            renderIcon={props => {
              return <div {...props}>i</div>;
            }}
            node={node}
            {...rest}
          >
            <span>{node.name}</span>
          </Expandable>
        )}
      </Tree>
    );
  }
}

export default createEntry(
  'customize-renderers',
  'ChangeRenderers',
  'Customize default renderers',
  <div>
    <p>
      A good example of a possible customization of a default renderer is customizing the tree to display as a folder
      structure.
    </p>

    <p>
      By exposing <code>iconsClassNameMap</code> it is possible to pass in the styles applied to the Expandable
      rendererer, the available style options are:
    </p>
    {'{ '}
    <code>expanded: string; collapsed: string; lastChild: string;</code>
    {' }'}
  </div>,
  ChangeRenderers,
);
