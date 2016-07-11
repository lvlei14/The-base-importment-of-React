import React, {Component, PropTypes} from 'react';
import HeadNaviBar from '../../components/HeadNaviBar/HeadNaviBar';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import { loadExpertItem } from '../../redux/modules/myneeds';

const styles = require('./MyNeeds.scss');

@connect(
  state => ({
    todo: state.myneeds.todo,
    completed: state.myneeds.completed,

  }), {
    pushState: push,
    loadExpertItem,
  }
)

export default class MyNeeds extends Component {
  static propTypes = {
    pushState: PropTypes.func,
    loadExpertItem: PropTypes.func,
    todo: PropTypes.array,
    completed: PropTypes.array,
  };

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    this.props.loadExpertItem();
  }

  componentWillReceiveProps() {

  }

  setImageByStatus(status) {
    let needsTypeImage = require('../../images/needsType-1.png');

    if (status === '处理中') {
      needsTypeImage = require('../../images/needsType-1.png');
    }else if (status === '已完成') {
      needsTypeImage = require('../../images/needsType-2.png');
    }else if (status === '已取消') {
      needsTypeImage = require('../../images/needsType-3.png');
    }else if (status === '已拒绝') {
      needsTypeImage = require('../../images/needsType-4.png');
    }
    return needsTypeImage;
  }

  goExpertNeedsDetail(_id, type, status) {
    this.props.pushState('/needs-detail/' + _id + '/' + type + '/' + status);
  }

  render() {
    const moreArrow = require('../../images/moreArrow.png');
    const needsBg = require('../../images/needsBg.png');
    const todo = this.props.todo || [];
    const completed = this.props.completed || [];
    return (
      <div>
        <HeadNaviBar>我的需求</HeadNaviBar>

        <Tabs className="tabs" onSelect={this.changeTab}>
          <TabList style={{marginBottom: 0}} className="tabList tabList2" activeTabClassName="tabListOn">
            <Tab>代办({todo.length})</Tab>
            <Tab>已办({completed.length})</Tab>
          </TabList>

          <TabPanel>
            {
              todo && todo.map((todoing) => {
                return (
                  <div id="underView" className={styles.bigUnderView}>
                    <div className={styles.underView} onClick={() => this.goExpertNeedsDetail(todoing._id, '1', todoing && todoing.status)}>
                      <img src={needsBg}/>
                      <div className={styles.rightText}>
                        <div className={styles.doctorName}>
                          <p className={styles.name}>{todoing.apartment.name}</p>
                        </div>
                        <p className={styles.hospital}>医疗类型:&nbsp;&nbsp;{todoing.medicalCategory}</p>
                        <p className={styles.jobTitle}>需求时间:&nbsp;&nbsp;{todoing.start_time}</p>
                        <div className={styles.phoneNum}>
                          <p className={styles.Num}>联系电话:&nbsp;&nbsp;{todoing.mobile}</p>
                          <a className={styles.dial} href={`tel:${todoing.mobile}`} onClick={(event) => {event.stopPropagation();}}>拨打电话</a>
                        </div>
                      </div>
                      <img className={styles.rightMore} src={moreArrow}/>
                    </div>
                  </div>
                  );
              })
            }
          </TabPanel>

          <TabPanel>
            {
              completed.map((complete) => {
                return (
                  <div id="underView" className={styles.bigUnderView} onClick={() => this.goExpertNeedsDetail(complete._id, '2', complete.status)}>
                    <div className={styles.underView}>
                      <img src={needsBg}/>
                      <div className={styles.rightText}>
                        <div className={styles.doctorName}>
                          <p className={styles.name}>{complete.apartment.name}</p>
                          <img src={this.setImageByStatus(complete && complete.status)}/>
                        </div>
                        <p className={styles.hospital}>医疗类型:&nbsp;&nbsp;{complete.medicalCategory}</p>
                        <p className={styles.jobTitle}>需求时间:&nbsp;&nbsp;{complete.start_time}</p>
                        <div className={styles.phoneNum}>
                          <p className={styles.Num}>联系电话:&nbsp;&nbsp;{complete.mobile}</p>
                          <a className={styles.dial} href={`tel:${complete.mobile}`} onClick={(event) => {event.stopPropagation();}}>拨打电话</a>
                        </div>
                      </div>
                      <img className={styles.rightMore} src={moreArrow}/>
                    </div>
                  </div>
                );
              })
            }
          </TabPanel>
        </Tabs>


      </div>
    );
  }
}
