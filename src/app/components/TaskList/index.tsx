import * as React from 'react';
import { connect } from 'react-redux';

import { map } from 'lodash';
import { Wrapper } from './styles';
import Task from '../Task';
import Scrollbar from '../Scrollbar';
import { getCurrentListTasks2 } from 'app/components/TaskList/selectors';
import { Loader } from 'semantic-ui-react';
import { AsyncReactor } from '@ovotech/async-reactor-ts';


function TaskList(props) {
  const { filteredTasks } = props;
  const wait = ms => new Promise((r, j)=>setTimeout(r, ms))
  const mapFilteredTasks = () => Promise.all(map(filteredTasks,
    async (task) => (
      <Task taskID={task.id} key={task.id}/>
    )))
  const asyncWrapper = (
    <AsyncReactor
      loader={async () => await wait(5000)}>
      {({loading, result}) => {
        if (loading) {
          return <div>Loading...</div>
        }

        return <div>{result}</div>
      }}
    </AsyncReactor>
  )
  const ListWrapper = <>
    {
      map(filteredTasks,
        (task) => (
          <Task taskID={task.id} key={task.id}/>
        ))
    }
  </>;
  return (
    <Wrapper>
      <Loader active={false}/>
      <Scrollbar style={{ height: '100%' }} autoHide>
        {asyncWrapper}
      </Scrollbar>
    </Wrapper>
  );
}

const mapStateToProps = (state) => ({
  filteredTasks: getCurrentListTasks2(state),
  filteredTasks2: getCurrentListTasks2(state)
});

export default connect(mapStateToProps, null)(TaskList);
