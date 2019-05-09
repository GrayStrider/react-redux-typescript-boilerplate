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

const _ = require('lodash');

// @ts-ignore
Aigle.mixin(_);
const sleep = m => new Promise(r => setTimeout(r, m));

function TaskList(props) {
  const { filteredTasks } = props;

  const asyncfn = async () => {
    console.time('Slept for');
    await sleep(3000);
    console.timeEnd('Slept for');
    return JSON.stringify(
      filteredTasks
    );
  }

  const MyComponent = () => {
    const { data, error, isLoading } = useAsync({ promiseFn: asyncfn})
    if (isLoading) return "Loading..."
    if (error) return `Something went wrong: ${error.message}`
    if (data)
      return (
        <div>
          <strong>Loaded some data:</strong>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )
    return null
  }

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
  const array = [1, 2, 3];
  // @ts-ignore
  const asyncMap = () => Aigle.map(array, n => Aigle.delay(10, n * 2)).sum()
    .then(value => {
      console.log(value); // 12
    });



  return (
    <Wrapper>
      <Loader active={false}/>
      <Scrollbar style={{ height: '100%' }} autoHide>
        // @ts-ignore
        <MyComponent/>
      </Scrollbar>
    </Wrapper>
  );
}

const mapStateToProps = (state) => ({
  filteredTasks: getCurrentListTasks2(state)
});

export default connect(mapStateToProps, null)(TaskList);
