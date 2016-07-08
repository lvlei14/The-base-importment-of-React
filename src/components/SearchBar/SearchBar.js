import React, { Component, PropTypes } from 'react';

const styles = require('./SearchBar.scss');

export default class SearchBar extends Component {
  static propTypes = {
    children: PropTypes.array,
    placeholder: PropTypes.string,
    changeSearchText: PropTypes.func,
    clickSearchBtn: PropTypes.func,
    clickClearSearch: PropTypes.func,
    searchText: PropTypes.string,
  }

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentWillReceiveProps() {
  }

  render() {
    return (
      <div>
        <dl className={styles.SearchBar}>
          <dt className="left">
            <i className="fa fa-search"></i>
            <input placeholder={this.props.placeholder} value={this.props.searchText} onChange={this.props.changeSearchText} />
          </dt>
          <dd className="right"><button onClick={this.props.clickSearchBtn}>搜索</button></dd>
        </dl>
      </div>
    );
  }
}

