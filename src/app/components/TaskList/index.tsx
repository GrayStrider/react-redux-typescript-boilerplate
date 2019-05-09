import * as React from 'react';
import { connect } from 'react-redux';
import { map } from 'lodash';
import { Wrapper } from './styles';
import Task from '../Task';
import Scrollbar from '../Scrollbar';
import { getCurrentListTasks2 } from 'app/components/TaskList/selectors';
import { Loader } from 'semantic-ui-react';
import { AsyncReactor } from '@ovotech/async-reactor-ts';
import { Aigle } from 'aigle';
import { list } from 'postcss';

// @ts-ignore
Aigle.mixin(require('lodash'));

function TaskList(props) {
  const { filteredTasks } = props;
  const sleep = m => new Promise(r => setTimeout(r, m));

  let asyncTasks = map(filteredTasks,
    async (task) => (
      <Task taskID={task.id} key={task.id}/>
    ));

  const asyncWrapper = (
    <AsyncReactor
      loader={async () => {
        console.time('Slept for');
        await sleep(3000);
        console.timeEnd('Slept for');
        return JSON.stringify(
          filteredTasks
        );
      }}>
      {({ loading, result }) => {
        if (loading) {
          return <div>Loading...</div>;
        }

        return <div>{result}</div>;
      }}
    </AsyncReactor>
  );
  const listWrapper = <>
    {
      map(filteredTasks,
        (task) => <Task taskID={task.id} key={task.id}/>)
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
  filteredTasks: getCurrentListTasks2(state)
});

export default connect(mapStateToProps, null)(TaskList);
