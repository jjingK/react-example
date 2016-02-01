import React from 'react';

/**
 * Tab component
 */
const Tab = class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false
    };
    //this.handleClick = this.handleClick.bind(this);
  }
  componentDidUpdate(prevProps, prevState) {
    //console.log('Tab.componentDidUpdate', prevProps, prevState);
  }
  handleClick(id) {
    this.props.onTabContentChange(id);
  }
  handleRemove(id) {
    this.props.onTabRemove(id);
  }
  render() {
    console.log('Tab.render', this.props, this.state);
    return (
      <li
        className={this.state.selected ? 'active': ''}
        key={this.props.id}
        id={this.props.idx}
        onClick={this.handleClick.bind(this, this.props.id)}
      >
        <span>{this.props.title}</span> <i className="fa fa-times" onClick={this.handleRemove.bind(this, this.props.id)}></i>
      </li>
    )
  }
}
/**
 * TabContent
 */
const TabContent = class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: ''
    }
    console.log('TabContent.constructor', this.props.tabs, this.props.content);
  }
  componentDidMount() {
    //const selectedContent = this.props.tabs.filter(tab => this.props.content == tab.id).pop();
    console.log('TabContent.componentDidMount');

    //this.setState({ content: selectedContent.content});
  }
  componentDidUpdate(prevProps, prevState) {
    console.log('TabContent.componentDidUpdate', prevProps, prevState);
  }
  componentWillReceiveProps(nextProps) {
    console.log('TabContent.componentWillReceiveProps', nextProps);
  }
  render() {
    console.log('TabContent.render', this.props.tabs, this.props.content);
    const selectedContent = this.props.tabs.filter(tab => this.props.content == tab.id).pop();

    return (
      <div className="tab-pane active">
        {selectedContent.content}
      </div>
    )
  }
}

/**
 * Tab Root Component
 */
class Tabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: this.props.tabs[0].id, // 탭 패널 아이디 값
      tabs: this.props.tabs // 탭 데이터
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleTabRemove = this.handleTabRemove.bind(this);
    this.handleTabContentChange = this.handleTabContentChange.bind(this);
  }
  // 첫번째 탭 선택하기 위해 초기화
  componentDidMount() {
    this.refs.tab0.setState({ selected: true });
  }
  // 탭이 추가된 경우 컴포넌트의 업데이트가 발생
  componentDidUpdate(prevProps, prevState) {
    console.log('Tabs.componentDidUpdate', prevProps, prevState);
    this.props.tabs.forEach((tab, i) => {
      this.refs[`tab${i}`].setState({selected: tab.id == this.state.content});
    });
  }
  // 탭 추가 시 이벤트
  handleClick() {
    console.log('handleClick');
    const tabs = this.state.tabs;
    const len = tabs.length + 1;
    const newTab = {id: len, title: 'tab' + len, content: 'Tab ' + len}
    tabs.push(newTab);
    this.setState({ tabs: tabs });
    this.setState({ content: newTab.id});
  }
  // 탭 삭제 시 이벤트
  handleTabRemove(id) {
    console.log('handleTabRemove event', id);
    const tabs = this.state.tabs;
    tabs.splice(id-1, 1);
    let newContentId = id;
  console.log('this.state', this.state);
    if (this.state.content == id) {
      if (id == 1) {
        newContentId = id + 1;
      } else {
        newContentId = id - 1;
      }
      console.log('handleTabRemove selected tab --', newContentId );
      // 삭제 한 탭이 현재 선택된 탭이 아닌 경우만 활성화 된 아이디를 변경해준다.
      // this.setState({ content: newContentId });
    }
    this.setState({ tabs: tabs });
  }
  // 탭 선택 시 Active 처리
  handleTabContentChange(id) {
    this.setState({ content: id });
    this.props.tabs.forEach((tab, i) => {
      this.refs[`tab${i}`].setState({selected: tab.id == id});
    });
  }
  // 활성화 처리 (따로 구현하려고 했는데 this 참조 문제 발생 )
  activedTab(id) {
    this.setState({ selected: id });
    this.props.tabs.forEach((tab, i) => {
      this.refs[`tab${i}`].setState({selected: tab.id == id});
    });
  }
  render() {
    console.log('Tabs.render', this.state.tabs, this.state.content);
    return (
      <div className="tab-container">
        <ul>
        {
          this.state.tabs.map((tab, idx) => (
            <Tab
              key={`tab${idx}`}
              ref={`tab${idx}`}
              id={tab.id}
              title={tab.title}
              onTabRemove={this.handleTabRemove}
              onTabContentChange={this.handleTabContentChange}
            />
          ))
        }
          <button className="btn btn-default" onClick={this.handleClick}></button>
        </ul>
        <TabContent
          tabs={this.state.tabs}
          content={this.state.content} />
      </div>
    )
  }
}
Tabs.defaultProps = {
  tabs : [
    {id: 1, title: 'tab1', content: 'Tab 1'},
    {id: 2, title: 'tab2', content: 'Tab 2'},
    {id: 3, title: 'tab3', content: 'Tab 3'},
    {id: 4, title: 'tab4', content: 'Tab 4'}
  ]
}
export default Tabs;
