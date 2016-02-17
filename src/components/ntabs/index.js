// import styles from './tab.css';
import React from 'react';
import ReactDOM from 'react-dom';
import Header from './TabHeader';
import Content from './TabContent';
import DefaultProps from './item';

class TabLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedId: props.tabs[0].id
    };

    this.handleAdd = this.handleAdd.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  handleAdd(e) {
    console.log('handleAdd', e);
    const newId = !this.props.tabs.length ? 1 : this.props.tabs[this.props.tabs.length - 1].id + 1;
    const newTab = {
      id: newId,
      title: `tab_${newId}`,
      content: `Tab _${newId}`
    };
    this.props.tabs.push(newTab);
    this.setState({selectedId: newTab.id});
  }

  handleChange(e) {
    const id = e.target.id ? e.target.id : ReactDOM.findDOMNode(e.target).parentNode.id;
    if (this.state.selectedId == id) return;
    this.setState({selectedId: id});
  }

  handleRemove(e) {
    e.stopPropagation();
    const id = ReactDOM.findDOMNode(e.target).parentNode.id;
    const item = this.props.tabs.find(tab => tab.id == id);
    const itemIndex = this.props.tabs.indexOf(item);
    this.props.tabs.splice(itemIndex, 1);

    if (!this.props.tabs.length) {
      this.setState({selectedId: ''});
    } else if (this.state.selectedId == id) {
      const index = !itemIndex ? 0 : itemIndex - 1;
      this.setState({selectedId: this.props.tabs[index].id});
    } else {
      this.setState({selectedId: this.state.selectedId});
    }
  }

  render() {
    return (
      <div className="tab-container" >
        <Header
          selectedId={this.state.selectedId}
          onTabAdd={this.handleAdd}
          onTabRemove={this.handleRemove}
          onTabChange={this.handleChange}
          {...this.props}
        />
        <Content
          {...this.props.tabs.find(tab => tab.id == this.state.selectedId)}
        />
      </div>
    );
  }
}
TabLayout.defaultProps = DefaultProps;

export default TabLayout;
