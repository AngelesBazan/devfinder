import { useReducer } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import DetailCard from './components/DetailCard';
import History from './components/History';
import EmptyCard from './components/EmptyCard';
import './App.css';


const initialState = {
  search: "",
  searchHistory: []
};

/* 2do Creo un nuevo cliente para usarlo en el provider */
const queryClient = new QueryClient();

const reducer = (state, action) => {
  switch (action.type) { 
    case "UPDATE_SEARCH":
      return { ...state, search: action.payload };
      case "ADD_USER_TO_HISTORY":
        return { ...state, searchHistory: [ ...state.searchHistory, state.search ] }
    default:
      return state;
  }
}

function App() {
  
  const [state, dispatch] = useReducer(reducer, initialState);
  
  return (
    <QueryClientProvider client={queryClient}>
      <div className="container">
        <header>
          <h1>Devfinder</h1>
          <form onSubmit={ e => {
            e.preventDefault();
            dispatch({type: "ADD_USER_TO_HISTORY"});
            dispatch({type: "UPDATE_SEARCH", payload: ""});

          }} >
            <label htmlFor='search'>
              <input
                type='text'
                id='search'
                name='search'
                placeholder='Search Github username'
                autoComplete='off'
                value={state.search}
                onChange={(e) => {
                  dispatch({type: "UPDATE_SEARCH", payload: e.target.value});
                }}
              />
              <button type='submit'>Search</button>
            </label>
          </form>
        </header>
        <div className='result'>
          {
            state.searchHistory.length === 0 ? (
              <EmptyCard text="Start finding a dev" />
            ) : <DetailCard user={state.searchHistory[state.searchHistory.length - 1]} />
          }
        </div>
        {
          state.searchHistory.length !== 0 ? (
            <History users={state.searchHistory} />
          ) : null
        }
      </div>
    </QueryClientProvider>
  );
}

export default App;
