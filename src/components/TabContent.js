import React from 'react';

module.exports = class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: ''
    };
    // console.log('TabContent.constructor', this.props.tabs, this.props.content);
  }
  componentDidMount() {
    // console.log('TabContent.componentDidMount');
  }
  componentDidUpdate(prevProps, prevState) {
    console.log('TabContent.componentDidUpdate', prevProps, prevState);
  }
  componentWillReceiveProps(nextProps) {
    console.log('TabContent.componentWillReceiveProps', nextProps);
  }
  render() {
    console.log('TabContent.render', this.props.tabs, this.props.content);
    const selectedContent = this.props.tabs.filter(tab => this.props.content === tab.id).pop();
    let content = '';
    if (selectedContent) {
      content = selectedContent.content;
    }
    return (
      <div className="tab-pane active">
        {content}
      </div>
    );
  }
};
