import React from 'react';
import styled from 'styled-components';
import { colors } from '../colors';
import { screens } from '../../constants';

const QuestionModal = styled.div`
  display: ${props => props.isModalVisible ? 'inherit' : 'none'};
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.4);
`;

const ModalContent = styled.div`
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
`;

class QuestionList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      currQuestion: { id: null, text: null, mechanismType: null, choices: [] },
      selectedChoice: null
    };
    this.handleChoiceChange = this.handleChoiceChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.dismissModal = this.dismissModal.bind(this);
  }

  componentDidMount() {

  }

  componentWillMount() {

  }

  handleChoiceChange(choice) {
    this.setState(state => {
      return {
        ...state,
        selectedChoice: choice,
      }
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.marketActions.addPrediction({
      question: this.state.currQuestion,
      prediction: this.state.selectedChoice,
    });

    this.setState(state => {
      return {
        ...state,
        isModalVisible: false,
      }
    });
  }

  presentModal() {
    return (
      <QuestionModal id="questionModal" isModalVisible={this.state.isModalVisible}>
        <ModalContent id="modalContent">
          {this.state.currQuestion.text}
          <form onSubmit={this.handleSubmit}>
            <div>
              <label>
                <input type="radio"
                  value={this.state.currQuestion.choices[0]}
                  checked={this.state.selectedChoice === this.state.currQuestion.choices[0]}
                  onChange={() => this.handleChoiceChange(this.state.currQuestion.choices[0])}/>
                {this.state.currQuestion.choices[0]}
              </label>
              <label>
                <input
                  type="radio" value={this.state.currQuestion.choices[1]}
                  checked={this.state.selectedChoice === this.state.currQuestion.choices[1]}
                  onChange={() => this.handleChoiceChange(this.state.currQuestion.choices[1])}/>
                {this.state.currQuestion.choices[1]}
              </label>
            </div>
            <button type="submit">Submit</button>
            <button onClick={this.dismissModal}>Exit</button>
          </form>
        </ModalContent>
      </QuestionModal>
    );
  }

  changeModalState(data) {
    this.setState(state => {
      return {
        ...state,
        isModalVisible: !state.isModalVisible,
        currQuestion: data
      }
    });
  }

  dismissModal() {
    this.setState(state => {
      return {
        ...state,
        isModalVisible: false
      }
    });
  }

  getQuestionList(questions) {
    return questions.map((data, inx) => {
      return (
        <div key={data.id} onClick={() => this.changeModalState(data)}>
          <h1>{ data.text }</h1>
        </div>
      );
    });
  }

  render() {
    return (
      <div className="hero-body is-dark is-fullscreen">
        {this.getQuestionList(this.props.questions)}
        {this.presentModal()}
      </div>
    );
  }
}

export default QuestionList;
