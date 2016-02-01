import React from 'react';
import Tab from './Tab';
import TabContent from './TabContent';

/**
 * Tabs Root Component
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
    this.refs.tab0.setState({selected: true});
  }
  // 탭이 추가/삭제 된 경우 컴포넌트의 업데이트가 발생
  componentDidUpdate(prevProps, prevState) {
    console.log('Tabs.componentDidUpdate', prevProps, prevState);
    this.props.tabs.forEach((tab, i) => {
      this.refs[`tab${i}`].setState({selected: tab.id === this.state.content});
    });
  }
  componentWillReceiveProps(nextProps) {
    console.log('Tabs.componentWillReceiveProps', nextProps);
  }
  // 탭 추가 시 이벤트
  handleClick() {
    console.log('handleClick');
    const tabs = this.state.tabs;
    const _id = tabs[tabs.length - 1].id + 1;
    const newTab = {
      id: _id,
      title: 'tab' + _id,
      content: 'Tab ' + _id
    };
    tabs.push(newTab);
    this.setState({tabs});
    this.setState({content: newTab.id});
  }
  // 탭 삭제 시 이벤트
  handleTabRemove(id) {
    console.log('handleTabRemove', id);
    const tabs = this.state.tabs;
    // @FIXME 마지막 요소가 삭제 될때...
    if (tabs.length === 1) {
      return;
    }
    let idx = 0;

    tabs.map((tab, i) => {
      if (tab.id === id) {
        idx = i;
      }
    });
    console.log('>>>>idx', idx);
    tabs.splice(idx, 1);

    let newContentId = id;
    console.log('this.state', this.state);

    if (tabs.length > 0 && this.state.content === id) {
      if (idx === 0) {
        newContentId = tabs[idx].id;
      } else {
        newContentId = tabs[idx - 1].id;
      }
      console.log('handleTabRemove selected tab --', newContentId);
      // 삭제 한 탭이 현재 선택된 탭이 아닌 경우만 활성화 된 아이디를 변경해준다.
      this.setState({content: newContentId});
    }
    this.setState({tabs});
  }
  // 탭 선택 시 Active 처리
  handleTabContentChange(id) {
    this.activedTab(id);
    // this.setState({content:id}, this.activedTab.bind(this, id));
    // this.setState({ content: id });
    // this.props.tabs.forEach((tab, i) => {
    //   this.refs[`tab${i}`].setState({selected: tab.id == id});
    // });
  }
  // 활성화 처리 (따로 구현하려고 했는데 this 참조 문제 발생 )
  activedTab(id) {
    this.setState({content: id}); // 자식의 상태를 바꾸면서 rerender 되면서 다시 그리게 된다.
    this.props.tabs.forEach((tab, i) => {
      this.refs[`tab${i}`].setState({selected: tab.id === id}); // 다른 자식의 상태를 바꿔주는게 정상 작동 하지 않음
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
          content={this.state.content}
        />
      </div>
    );
  }
}
Tabs.defaultProps = {
  tabs: [
    {id: 1, title: 'tab1', content: 'Tab 1'},
    {id: 2, title: 'tab2', content: 'Tab 2'},
    {id: 3, title: 'tab3', content: 'Tab 3'},
    {id: 4, title: 'tab4', content: 'Tab 4'}
  ]
};
export default Tabs;
