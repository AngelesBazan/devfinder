import { useReducer } from 'react';
import DetailCard from './components/DetailCard';
import History from './components/History';
import './App.css';

/* 1ero Defino mis estados iniciales */
const initialState = {
  search: "", /* aquello que voy ingresando por el form */
  searchHistory: []
};

/* 2do Creo mi función reductora que simepre recibe un estado y una acción */
/* Contiene la lógica de la actualización de estados */
const reducer = (state, action) => {
  switch (action.type) { /* esta es la acción que se va a despachar cuando el evento se ejecute */
    case "UPDATE_SEARCH": /* tomo el estado, lo disperso, y agarro la parte de "search" para modificarlo */
      /* 5to Le indico que en el estado search voy a cambiar ese estado por la info que viene en payload (que está dentro de action). El valor de payload está definido en la línea 45 con el value del input */
      return { ...state, search: action.payload };
      /* 6to Agrego un nuevo caso: agregar usuario al historial (para cuando se haga el submit) */
      case "ADD_USER_TO_HISTORY":
        return { ...state, searchHistory: [ ...state.searchHistory, state.search ] }
        /* Traigo el estado como está, tomo a la propiedad searchHistory que es un array y a ese array voy a querer traer los valores que ya tiene (por si ya hay elementos en el historial de búsqueda) y le agrego el nuevo valor que busqué e ingresé a través del input, es decir el que guardé en el estado search */
    default:
      return state;
  }
}

function App() {
  /* 3ero Llamo al hook con la función que creé (paso 2) y el estado inicial (paso 1) */
  /* Desestrucutro el hook con "estado" y el método "dispatch" que me va a permitir hacer el envío de información con el tipo de acción */
  const [state, dispatch] = useReducer(reducer, initialState);
  
  return (
    <div className="container">
      <header>
        <h1>Devfinder</h1>
        <form onSubmit={ e => {
          e.preventDefault();
          /* 7mo Defino que cuando envíe el formulario, se haga un nuevo despecho de la acción que quiero */
          /* Para eso uso el método dispatch y le indico el tipo de acción que se va a ejecutar */
          /* Acá no uso payload porque la información que voy a agregar al array del historial ya la definí en el switch de la función reductora (porque uso el state de ahí) */
          dispatch({type: "ADD_USER_TO_HISTORY"});
          /* 8vo Uso otro dispatch para limpiar el input después de hacer submit */
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
              /* 4to: uso el método dispatch para generar un tipo de acción */
              /* Le indico el tipo de acción, tal como está en el switch */
              /* Y además le indico el payload, que es la información útil, en este caso lo que me interesa es el value que está ingresando por el input, y eso es lo que voy a estar enviando todo el tiempo siempre y cuando se ingrese un nuevo valor al input */
              onChange={(e) => {
                dispatch({type: "UPDATE_SEARCH", payload: e.target.value});
              }}
            />
            <button type='submit'>Search</button>
          </label>
        </form>
      </header>
      <div className='result'>
        <DetailCard />
      </div>
      <History />
    </div>
  );
}

export default App;
