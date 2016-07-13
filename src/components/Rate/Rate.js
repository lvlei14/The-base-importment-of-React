import React, { PropTypes } from 'react';
const styles = require('./Rate.scss');
const RCRate = require('rc-rate');

class Rate extends React.Component {
  static propTypes = {
    rates: PropTypes.arrayOf({
      name: PropTypes.string,
      field: PropTypes.string,
      score: PropTypes.number
    }).isRequired,
    onChange: PropTypes.func,
    editable: PropTypes.bool,
    initTextComment: PropTypes.string,
    commentPlaceholder: PropTypes.string,
    scoreTips: PropTypes.func,
  };

  static defaultProps = {
    initTextComment: '',
    commentPlaceholder: '请填写文字评论信息',
    editable: true,
    scoreTips: (score) => {
      let tips = '';
      if (score <= 0) {
        tips = <i style={{fontStyle: 'normal', color: '#CA3922'}}>尚未评价</i>;
      } else if (score > 0 && score <= 3) {
        tips = '任需努力';
      } else {
        tips = '很好';
      }
      return tips;
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      rates: props.rates,
      comment: props.initTextComment
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.rates !== nextProps.rates) {
      this.setState({rates: nextProps.rates});
    }
    if (this.props.initTextComment !== nextProps.initTextComment) {
      this.setState({comment: nextProps.initTextComment});
    }
  }

  clickRateStar(score, index) {
    const rates = this.state.rates;
    const self = this;
    this.setState({
      rates: [...rates.slice(0, index), {...rates[index], score: score}, ...rates.slice(index + 1)]
    }, () => {
      self.props.onChange(self.state);
    });
  }

  handleCommentInput(event) {
    const self = this;
    this.setState({
      comment: event.target.value
    }, () => {
      self.props.onChange(self.state);
    });
  }

  render() {
    const scoreTips = this.props.scoreTips;
    const editable = this.props.editable;
    return (
      <div className={styles.rateContainer}>
        {
          this.state.rates && this.state.rates.map((rate, index) => {
            return (
              <div key={index}>
                <p>{rate.name}</p>
                {
                  editable ?
                    <RCRate value={rate.score} onChange={(score) => this.clickRateStar(score, index)}/>
                    :
                    <RCRate value={rate.score} />
                }
                <span>{scoreTips(rate.score)}</span>
              </div>
            );
          })
        }
        <div className={styles.commentContainer}>
          {
            !this.props.editable ?
              <textarea disabled placeholder={this.props.commentPlaceholder} value={this.state.comment} />
              :
              <textarea placeholder={this.props.commentPlaceholder}
                        value={this.state.comment}
                        onChange={this.handleCommentInput.bind(this)} />
          }
        </div>
      </div>
    );
  }
}

export default Rate;
