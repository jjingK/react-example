import React from 'react';
import Tab from './TabItem';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedId: props.selectedId
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({selectedId: nextProps.selectedId});  
  }

  render() {
    return (
      <ul>
        {
          this.props.tabs.map(tab => {
            return (
              <Tab 
                key={tab.id}
                selectedId={this.state.selectedId} 
                onTabFocus={this.props.onTabChange}
                onTabRemove={this.props.onTabRemove}
                {...tab}
              />
            )
          })
        }
        <button className="btn btn-default" onClick={this.props.onTabAdd}></button>
      </ul>
    );
  }
}

