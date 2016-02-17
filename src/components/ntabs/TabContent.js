import React from 'react';

export default class extends React.Component {
  constructor(props) {
    super(props);
    console.log('Content--', props);
  }

  render() {
    return (
      <div className="tab-pane active">
        {this.props.content}
      </div>
    );
  }
}
