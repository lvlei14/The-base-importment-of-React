import React, { Component, PropTypes } from 'react';

const styles = require('./Modal.scss');

export default class Modal extends Component {
  static propTypes = {
    children: PropTypes.array,
    showModal: PropTypes.boolean,
    title: PropTypes.string,
    clickConfirm: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      showModal: this.props.showModal
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      showModal: nextProps.showModal
    });
  }

  clickHideModal() {
    this.setState({
      showModal: false
    });
  }

  clickConfirm() {
    this.props.clickConfirm();
  }

  render() {
    return (
      <div>
        <div className={styles.modalFa} style={{display: this.state.showModal ? 'table' : 'none'}}>
          <div className={styles.modal}>
            <p className={'bodyBgWhite ' + styles.modalBg}></p>
            <div className={'bodyBgWhiteZindex ' + styles.modalSection}>
              <header className={'clearfix ' + styles.modalTitle}>
                <h3 className="left">{this.props.title}</h3>
                <span className="right" onClick={this.clickHideModal.bind(this)}>x</span>
              </header>
              <section className={styles.modalSectionSection}>{this.props.children}</section>
              <footer className={styles.modalButton + ' clearfix'}>
                <button className="left" onClick={this.clickHideModal.bind(this)}>取消</button>
                <button className={'right ' + styles.modalConfirm} onClick={this.clickConfirm.bind(this)}>确定</button>
              </footer>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

