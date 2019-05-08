import * as React from 'react';
import { connect } from 'react-redux';
import { Icon, Input, Popup } from 'semantic-ui-react';
import onClickOutside from 'react-onclickoutside';
import { Wrapper } from './styles';
import { InputButtonBar } from './inputButtonBar';
import { addTask, TaskInput } from '../../actions/index';
import { EPriorities } from 'app/types/types';
import { bindActionCreators } from 'redux';


function InputNewTask(props) {
  const placeholder = `Add new task in ${props.selectedList.name}`;
  // @ts-ignore
  InputNewTask.handleClickOutside = () => toggleButtonBar(false);

  const [buttonBarActive, toggleButtonBar] = React.useState(false);
  const [inputValue, changeInputValue] = React.useState('');

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      props.addTask({
        title: inputValue,
        priority: EPriorities.None,
      });
      changeInputValue('');
    }
  };

  const handleChange = (event) => {
    changeInputValue(event.target.value);
  };

  return (
    <Wrapper buttonBarActive={buttonBarActive}>
      <div role='presentation'
           onClick={() => toggleButtonBar(true)}>

        <Input placeholder={placeholder}
               value={inputValue}
               onKeyDown={handleKeyDown}
               onChange={handleChange}
               fluid/>

      </div>


      <InputButtonBar active={buttonBarActive}
                      className='inputButtonBar'>

        <Popup trigger={

          <Icon name='calendar alternate outline'/>
        }
               content='popup content'
               on='click'
               horizontalOffset={12}
               verticalOffset={5}

        />


        <Icon name='exclamation circle'/>
        <Icon name='folder outline'/>
      </InputButtonBar>
    </Wrapper>
  );
}

const mapStateToProps = state => ({
  selectedList: state.ticktick.ui.selectedList,
});

const dispatchProps = (dispatch) => bindActionCreators({
  addTask: ({title, priority}:TaskInput) => addTask({title, priority})
}, dispatch);


// @ts-ignore
const clickOutsideConfig = { handleClickOutside: () => InputNewTask.handleClickOutside };
export default connect(mapStateToProps, dispatchProps)
(onClickOutside(InputNewTask, clickOutsideConfig));