import * as React from 'react';
import { Button, Grid, Icon, Image } from 'semantic-ui-react';
import { connect } from 'react-redux';

import { Wrapper } from './styles';
import Lists from '../Lists';
import TaskList from '../TaskList';
import InputNewTask from '../InputNewTask';
import TaskDetails from '../TaskDetails';
import AccountPane from '../AccountPane';
import TaskListHeader from '../TaskList/TaskListHeader';
import { ping } from 'app/actions/pingPong';
import { throttle } from 'lodash';

function TickTick(props) {
  const {menuOpen} = props;

  return (
    <Wrapper menuOpen={menuOpen}>
      <Grid columns={3}>
        <Grid.Column
          className='left'>
          <AccountPane/>
          <Lists/>
        </Grid.Column>

        <Grid.Column className='center'>
          <TaskListHeader/>
          <InputNewTask/>
          <TaskList/>
        </Grid.Column>

        <Grid.Column className='right'>
          <TaskDetails/>
        </Grid.Column>

      </Grid>
    </Wrapper>
  );
}

const dispatchProps = {
};

const mapStateToProps = (state, props) => ({
  menuOpen: state.ticktick.ui.menuOpen
});

export default connect(mapStateToProps, dispatchProps)(TickTick);
