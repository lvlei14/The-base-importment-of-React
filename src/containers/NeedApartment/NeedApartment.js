import React, { Component, PropTypes } from 'react';
import HeadNaviBar from '../../components/HeadNaviBar/HeadNaviBar';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
// import Modal from '../../components/Modal/Modal';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

const styles = require('./NeedApartment.scss');

@connect(
  state => ({...state}), {
    pushState: push,
  }
)
export default class NeedApartment extends Component {
  static propTypes = {
    pushState: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
  }

  changeTab(index) {
    alert(index);
  }

  goAddAppartNeed() {
    this.props.pushState('/add-appart-need');
  }

  render() {
    return (
      <div className={'duty ' + styles.duty}>
        <HeadNaviBar>我的需求</HeadNaviBar>
        <Tabs className="tabs" onSelect={this.changeTab}>
          <TabList style={{marginBottom: 0}} className="tabList tabList3" activeTabClassName="tabListOn">
            <Tab>待接受</Tab>
            <Tab>已接受</Tab>
            <Tab>已完成</Tab>
          </TabList>

          <TabPanel>
            <div className="topCardBg">
              <div className={'list ' + styles.needApartListCon}>
                <header>王五</header>
                <p>2222</p>
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            已接受内容
          </TabPanel>
          <TabPanel>
            已完成内容
          </TabPanel>
        </Tabs>
        <div className="addBigBtn" onClick={this.goAddAppartNeed.bind(this)}></div>
      </div>
    );
  }
}

