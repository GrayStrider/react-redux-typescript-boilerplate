import produce from 'immer';
import { GlobalState } from 'app/pages/Ticktick/types/GlobalState';
import { Chance } from 'chance';
import { ETabs, TCustomLists, TLists, TTags, TTaskID, TTasks } from 'app/pages/Ticktick/types/types';
import GenerateMockData from 'app/pages/Ticktick/GenerateMockData';
import { SELECT_LIST, SELECT_TAB } from 'app/pages/Ticktick/components/Lists/actions';
import { ADD_TASK } from 'app/pages/Ticktick/components/InputNewTask/actions';
import { ADD_TASK_TO_LIST, DELETE_TASK_FROM_LIST, MODIFY_TASK } from 'app/pages/Ticktick/components/actions';
import { SELECT_TASK, TOGGLE_DONE } from 'app/pages/Ticktick/components/Task/actions';
import { SORT_LIST } from 'app/pages/Ticktick/components/TaskList/TaskListHeader/actions';
import { without } from 'lodash';

const chance = new Chance(Math.random);


const tasks = {} as TTasks;
const tags = {} as TTags;
const lists = {} as TLists;
const custom: TCustomLists = {
  1: {
    id: '1',
    name: 'Custom',
    type: ETabs.custom
  }
};

GenerateMockData(tasks, tags, lists);

export const initialState: GlobalState = {
  data: {
    tasks,
    tags,
    lists,
    custom,
    defaultLists: {
      inbox: {
        id: 'inbox',
        name: 'Inbox',
        type: 'defaultLists',
        tasks: []
      },
      nextSevenDays: {
        id: 'sevenDays',
        name: 'Next 7 Days',
        type: 'defaultLists',
        tasks: []
      }
    }
  },
  ui: {
    selectedList: {
      id: '1',
      name: 'Custom',
      type: ETabs.custom

    },
    selectedTab: ETabs.custom,
    selectedTask: null
  }
};

const tickTickReducer = (state = initialState, action): GlobalState =>
  produce(state, draft => {
    switch (action.type) {
      case SELECT_TAB:
        draft.ui.selectedTab = action.payload;
        break;

      case ADD_TASK: {
        const date = new Date();
        const time = date.getTime();
        const guid = chance.guid();
        // insert new task into database
        draft.data.tasks[guid] = {
          id: guid,
          title: action.payload.title,
          description: '',
          priority: action.payload.priority,
          completed: false,
          timeCreated: time,
          timeLastModified: time
        };
        // insert new task into currently selected list
        draft.data
          [action.payload.selectedList.type]
          [action.payload.selectedList.listID].tasks
          .push(guid);
        // select new task
        draft.ui.selectedTask = guid;
        break;
      }

      case MODIFY_TASK: {
        const date = new Date();
        draft.data.tasks[action.payload.taskID] = {
          ...draft.data.tasks[action.payload.taskID],
          ...action.payload.data,
          timeLastModified: date.getTime()
        };
        break;
      }

      case TOGGLE_DONE:
        draft.data.tasks[action.payload].completed =
          !draft.data.tasks[action.payload].completed;
        break;

      case SELECT_TASK:
        draft.ui.selectedTask = action.payload;
        break;

      case SELECT_LIST:
        draft.ui.selectedList = action.payload;
        break;

      case SORT_LIST:
        /**
         * # Use nested switch
         * # Sorting is kept for individual lists (sorting list's taskIDs)
         * # Drag-n-drop task sorting within the sort types, keep when sorting
         * # Perhaps, there's no need to worry about manual sorting order breaking
         * after applying new sort, because since sort criteria for these sorted
         * items would be the same, and therefore their order won't change.
         * - payload: listID to sort
         * - payload: sort type {
         *   - priority
         *   - list
         *   - tag
         *   - date created
         *   - by title // TODO replace "content" with "title"
         * }
         *
         **/
        switch (action.payload.sortType) {
          case 'priority':
            draft.data
              [action.payload.selectedList.type]
              [action.payload.selectedList.listID].tasks =
              draft.data
                [action.payload.selectedList.type]
                [action.payload.selectedList.listID].tasks
                .sort((a: TTaskID, b: TTaskID) => draft.data.tasks[b].priority - draft.data.tasks[a].priority);
            break;
          case 'timeAdded':
            draft.data
              [action.payload.selectedList.type]
              [action.payload.selectedList.listID].tasks =
              draft.data
                [action.payload.selectedList.type]
                [action.payload.selectedList.listID].tasks
                .sort((a: TTaskID, b: TTaskID) => draft.data.tasks[b].timeCreated - draft.data.tasks[a].timeCreated);
            break;
        }
        break;

      case DELETE_TASK_FROM_LIST:
        draft.data
          [action.payload.type]
          [action.payload.listID].tasks =

          without(draft.data
            [action.payload.type]
            [action.payload.listID].tasks, action.payload.taskID);
        break;
      case ADD_TASK_TO_LIST:
        draft.data
          [action.payload.type]
          [action.payload.listID].tasks
          .push(action.payload.taskID);
        break;
    }
  });

export default tickTickReducer;