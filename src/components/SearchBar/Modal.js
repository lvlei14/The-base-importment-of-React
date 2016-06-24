import React, { Component, PropTypes } from 'react';

const styles = require('./SearchBar.scss');

export default class SearchBar extends Component {
  static propTypes = {
    children: PropTypes.array,
    placeholder: PropTypes.string,
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
        <dl className={styles.SearchBar + ' topCardBg'}>
          <dt className="left">
            <i></i>
            <input placeholder={this.props.placeholder} />
          </dt>
          <dd className="right"><button>搜索</button></dd>
        </dl>
      </div>
    );
  }
}

