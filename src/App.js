import './App.css';
import React, {useState} from 'react';

const Todo = () => {

  const [inputData, setInputData] = useState('');
  const [todolist, settodolist] = useState([]);
  const [completedtodolist, setcompletedtodolist] = useState([]);
  const [showCompletedList, setshowCompletedList] = useState(false);
  const [inputFavorite, setInputFavorite] = useState(false);

  const addItem = () => {
    if (inputData) {
      const newEntry = {
        id: new Date().getTime(),
        title: inputData,
        favorite: false,
        complete: false,
        show: false
      }

        newEntry.show = true;
        if (inputFavorite) {
          newEntry.favorite = true;
          settodolist([
            newEntry, ...todolist
          ]);
          setInputFavorite(false);
        } else {
          settodolist([
            ...todolist,
            newEntry
          ]);
        }

      setInputData('')
    }
  }

  const completeItem = (item) => {
    item.complete = !item.complete;
    item.show = false;

      setcompletedtodolist([
        ...completedtodolist,
        item
      ]);
      const updatedtodolist = todolist.filter((element) => {
        return element.id !== item.id;
      });
      settodolist(updatedtodolist);
      item.show = true;
  }

  const uncompleteItem = (item) => {
    item.complete = !item.complete;
    item.show = false;

    setTimeout(() => {
      settodolist([
        item, ...todolist
      ]);

      const updatedcompletedtodolist = completedtodolist.filter((element) => {
        return element.id !== item.id;
      });

      setcompletedtodolist(updatedcompletedtodolist);

      item.show = true;

    }, 500)
  }

  const setFavoriteItem = (item) => {
    item.favorite = !item.favorite;
    item.show = false;

    setTimeout(() => {
      const updatedtodolist = todolist.filter((element) => {
        return element.id !== item.id;
      });

      settodolist(updatedtodolist);

      settodolist([
        item, ...updatedtodolist
      ]);

      item.show = true;

    }, 500)
  }

  const unSetFavoriteItem = (item) => {
    item.favorite = !item.favorite;

    setTimeout(() => {
      const updatedtodolist = todolist.filter((element) => {
        return element.id !== item.id;
      });

      settodolist(updatedtodolist);

      settodolist([
        item, ...updatedtodolist
      ]);

      item.show = true;

    }, 500)

  }
  return (<> < div className = "container" > <div className="add-item">
    <div className="add-icon" onClick={addItem}>
      <i className="fas fa-plus"></i>
    </div>
    <input className="input-text" type="text" placeholder="Add a to-do..." value={inputData} onChange={(e) => setInputData(e.target.value)} onKeyPress={(e) => {
        if (e.key === "Enter") {
          addItem()
        }
      }}/>
    <div className="feature-icon">

      {
        !inputFavorite
          ? (<i className="far fa-star" onClick={() => setInputFavorite(current => !current)}></i>)
          : (<i className="fas fa-star" onClick={() => setInputFavorite(current => !current)}></i>)
      }
    </div>
  </div>
  <div className="todo-list">

    {
      todolist.map((item) => {
        return (<div className={"item" + (
            item.show
            ? ' show'
            : '')} key={item.id}>
          <div className="item-checkbox">
            {
              !item.complete
                ? (<i className="fas fa-square" onClick={() => completeItem(item)}></i>)
                : (<i className="fas fa-check-square"></i>)
            }
          </div>
          <div className="item-title">{item.title}</div>
          <div className={"feature-icon" + (
              item.favorite
              ? ' gold-bg'
              : '')}>

            {
              !item.favorite
                ? (<i className="far fa-star" onClick={() => setFavoriteItem(item)}></i>)
                : (<i className="fas fa-star" onClick={() => unSetFavoriteItem(item)}></i>)
            }
          </div>
        </div>)
      })
    }
  </div>

    {
    completedtodolist.length > 0
      ? (<div className="show-completed">
        <div className="button" onClick={() => setshowCompletedList(current => !current)}>
          {
            !showCompletedList
              ? (<span>show
              </span>)
              : (<span>hide
              </span>)
          }
          completed to-do's
        </div>
      </div>)
      : ('')
  } {
    showCompletedList
      ? (<div className="todo-list complete-list">
        {
          completedtodolist.map((item) => {
            return (<div className={"item" + (
                item.show
                ? ' show'
                : '')} key={item.id}>
              <div className="item-checkbox">
                {
                  !item.complete
                    ? (<i className="fas fa-square"></i>)
                    : (<i className="fas fa-check-square" onClick={() => uncompleteItem(item)}></i>)
                }
              </div>
              <div className="item-title">{item.title}</div>
              <div className={"feature-icon" + (
                  item.favorite
                  ? ' gold-bg'
                  : '')}>
                {
                  !item.favorite
                    ? (<i className="far fa-star"></i>)
                    : (<i className="fas fa-star"></i>)
                }
              </div>
            </div>)
          })
        }
      </div>)
      : ('')
  } < /div>
        </ >)
}

export default Todo
