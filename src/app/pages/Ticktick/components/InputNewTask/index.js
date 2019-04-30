import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Icon, Input, Popup } from 'semantic-ui-react';
import onClickOutside from 'react-onclickoutside';
import { Wrapper } from './styles';
import { InputButtonBar } from './inputButtonBar';
import { addTask } from './actions';


function InputNewTask(props) {
  const placeholder = `Add new task in ${props.selectedList.name}`;
  InputNewTask.handleClickOutside = () => toggleButtonBar(false);

  const [buttonBarActive, toggleButtonBar] = useState(false);
  const [inputValue, changeInputValue] = useState('');

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      const params = {
        taskContent: inputValue,
        priority: 3,
        selectedList: props.selectedList,
      };
      props.addTask(params);
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

InputNewTask.propTypes = {
  selectedList: PropTypes.object,
  addTask: PropTypes.func,
};

const mapStateToProps = state => ({
  selectedList: state.ticktick.lists.selectedList,
});

const mapDispatchToProps = dispatch => ({
  addTask: (params) => dispatch(addTask(params)),
});

const clickOutsideConfig = { handleClickOutside: () => InputNewTask.handleClickOutside };
export default connect(mapStateToProps, mapDispatchToProps)
(onClickOutside(InputNewTask, clickOutsideConfig));
