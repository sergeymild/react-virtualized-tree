import React from 'react';
import PropTypes from 'prop-types';
import {AutoSizer, List, CellMeasurerCache, CellMeasurer} from 'react-virtualized';

import {FlattenedNode} from './shapes/nodeShapes';
import TreeState, {State} from './state/TreeState';

export default class Tree extends React.Component {
  constructor(props) {
    super(props);
    this._cache = new CellMeasurerCache({
      fixedWidth: true,
      defaultHeight: props.height,
      fixedHeight: !!props.height,
      minHeight: props.height || 30,
    });
  }

  getRowCount = () => {
    const {nodes} = this.props;

    return nodes instanceof State ? nodes.flattenedTree.length : nodes.length;
  };

  getNodeDeepness = (node, index) => {
    const {nodes} = this.props;

    if (nodes instanceof State) {
      TreeState.getNodeDeepness(nodes, index);
    }

    return nodes instanceof State ? TreeState.getNodeDeepness(nodes, index) : node.deepness;
  };

  getNode = index => {
    const {nodes} = this.props;

    return nodes instanceof State
      ? {...TreeState.getNodeAt(nodes, index), deepness: this.getNodeDeepness({}, index)}
      : nodes[index];
  };

  rowRenderer = ({node, key, measure, style, NodeRenderer, index}) => {
    const {nodeMarginLeft} = this.props;

    return (
      <NodeRenderer
        key={key}
        style={{
          ...style,
          marginLeft: node.deepness * nodeMarginLeft,
          userSelect: 'none',
          cursor: 'pointer',
        }}
        node={node}
        onChange={this.props.onChange}
        measure={measure}
        index={index}
      />
    );
  };

  measureRowRenderer = nodes => ({key, index, style, parent}) => {
    const {NodeRenderer} = this.props;
    const node = this.getNode(index);

    return (
      <CellMeasurer cache={this._cache} columnIndex={0} key={key} rowIndex={index} parent={parent}>
        {m => this.rowRenderer({...m, index, node, key, style, NodeRenderer})}
      </CellMeasurer>
    );
  };

  onRef = r => (this._list = r);

  renderList = ({height, width: autoWidth}) => (
    <List
      deferredMeasurementCache={this._cache}
      ref={this.onRef}
      height={height}
      rowCount={this.getRowCount()}
      rowHeight={this.props.height || this._cache.rowHeight}
      rowRenderer={this.measureRowRenderer(this.props.nodes)}
      width={this.props.width || autoWidth}
      scrollToIndex={this.props.scrollToIndex}
      scrollToAlignment={this.props.scrollToAlignment}
    />
  );

  render() {
    return <AutoSizer disableWidth={Boolean(this.props.width)}>{this.renderList}</AutoSizer>;
  }
}

Tree.propTypes = {
  nodes: PropTypes.arrayOf(PropTypes.shape(FlattenedNode)).isRequired,
  NodeRenderer: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  nodeMarginLeft: PropTypes.number,
  width: PropTypes.number,
  scrollToIndex: PropTypes.number,
  scrollToAlignment: PropTypes.string,
  height: PropTypes.number,
};
