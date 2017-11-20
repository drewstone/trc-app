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
    this.state = {isModalVisible: false}
  }

  componentDidMount() {

  }

  componentWillMount() {

  }

  getQuestionList(questions) {
    return questions.map((data, inx) => {
      return (
        <div key={data.id} onClick={() => {
          this.setState(state => {
            return {
              ...state,
              isModalVisible: !state.isModalVisible,
            }
          });
        }}>
          <h1>{ data.text }</h1>
        </div>
      );
    });
  }

  render() {
    return (
      <div className="hero is-dark is-fullscreen">
        {this.getQuestionList(this.props.questions)}
        <QuestionModal id="questionModal" isModalVisible={this.state.isModalVisible}>
        <ModalContent id="modalContent">
          some text here
        </ModalContent>
      </QuestionModal>
      </div>
    );
  }
}

export default QuestionList;

// export default function QuestionList({ screenActions, marketAction, questions }) {
//   this.state = {isModalVisible: true};
  
//   const QuestionModal = styled.div`
//     display: ${props => props.isModalVisible ? 'inherit' : 'none'};
//     position: fixed;
//     z-index: 1;
//     left: 0;
//     top: 0;
//     width: 100%;
//     height: 100%;
//     overflow: auto;
//     background-color: rgb(0,0,0);
//     background-color: rgba(0,0,0,0.4);
//   `;

//   const ModalContent = styled.div`
//     background-color: #fefefe;
//     margin: 15% auto;
//     padding: 20px;
//     border: 1px solid #888;
//     width: 80%;
//   `;

//   const getQuestionList = questions.map((data, idx) => {
//     return (
//       <div key={`${data.id}`} onClick={() => this.setState(prevState => ({isModalVisible: !prevState.isModalVisible}))}>
//         {data.text}
//         {/* TODO: on-click */}
//       </div>
//     )
//   });

//   return (
//     <div className="hero-body is-dark is-fullscreen">
//       {getQuestionList}
//       <QuestionModal id="questionModal" isModalVisible={this.state.isModalVisible}>
//       <ModalContent id="modalContent">
//         some text here
//       </ModalContent>
//     </QuestionModal>
//     </div>
//   );
// }
