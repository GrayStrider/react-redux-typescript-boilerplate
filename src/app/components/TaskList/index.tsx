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
import { useAsync } from 'react-async';
import { any } from 'prop-types';

const _ = require('lodash');

// @ts-ignore
Aigle.mixin(_);
const sleep = m => new Promise(r => setTimeout(r, m));

function TaskList(props) {
  const { filteredTasks } = props;

  const asyncfn = async () => {
    return await map(filteredTasks,
      (task) => <Task taskID={task.id} key={task.id}/>)
  }
  // memo doesn't seem to help
  const MyComponent = React.memo((): any => {
    const { data, error, isLoading } = useAsync({ promiseFn: asyncfn})
    if (isLoading) return "Loading..."
    if (error) return `Something went wrong: ${error.message}`
    if (data)
      return (
        <>{data}</>
      )
    return null
  })
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
        <MyComponent/>
      </Scrollbar>
    </Wrapper>
  );
}

const mapStateToProps = (state) => ({
  filteredTasks: getCurrentListTasks2(state)
});

export default connect(mapStateToProps, null)(TaskList);
