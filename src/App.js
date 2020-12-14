import React, { useContext, useReducer } from "react";
import Context from './data/Context';
import reducer from './data/reducer';

import './App.css';
import banner from "./images/banner.png";

function App() {
  const initialState = useContext(Context);
  const [state, dispatch] = useReducer(reducer, initialState);
  let candidatePhoto, candidateResponses;
  const updateCandidate = (data) =>{
    console.log(data)
    dispatch({type:"ACTIVE_CANDIDATE", payload:data})
  }
  let active;
  const candidatesList = state.nominees.map((candidate, i) =>{
    if(state.activeNominee!== null){
      active = candidate.name === state.activeNominee.name;
    }
   return <li className={`nav-item ${active ? "active" : ""}`} key={i} onClick={()=> updateCandidate(candidate)}>
      <p className={`nav-link ${active ? "active" : ""}`}>{candidate.name}</p>
    </li>
  })
  const randomOrder = (min, max) => {
    const activeTemp = Math.floor(Math.random() * (max - min) + min);
    dispatch({type:"ACTIVE_CANDIDATE", payload:state.nominees[activeTemp]})
    console.log(state.nominees[activeTemp])
  };

  if(state.activeNominee === null){
    randomOrder(0, state.nominees.length)
    candidatePhoto = <p>Loading...</p>
    candidateResponses = <p>Loading...</p>
  }else{
    let yuAnswers = state.activeNominee.whyYou.map((res, i)=>(
      <p className="response-response" key={i}>{res}</p>
    ))

    candidatePhoto = <img src ={`./images/optimized/${state.activeNominee.photo}`} alt={state.activeNominee.name} className="img-fluid"/>
    candidateResponses = <div>
      <p className="response-question">{state.activeNominee.name}</p>

      <p className="response-question">Tell us about yourself. Biographical info, professional experience, interests, etc-- Galaxy and ACB related or not.</p>
      <p className="response-response">{state.activeNominee.aboutYourself}</p>

      <p className="response-question">If you have previously served on the board, what committees were you active in? What did your duties entail?</p>
      <p className="response-response">{state.activeNominee.previousExperience}</p>

      <p className="response-question">Tell us why you are a good choice to be an ACB board member.</p>
      {yuAnswers}
    </div>
  }
  return (
    <Context.Provider value={{ state, dispatch }}>
    <div className="App">
      <header>
        <img src={banner} alt="" className="img-fluid"/>
      </header>


      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
        <ul className="navbar-nav">
        <li className="nav-item"><p className="nav-link">Candidates:</p></li>
          {candidatesList}
        </ul>
        </div>
      </nav>

    <div className="container candidate-wrap">
      <div className="row">
        <div className="col-sm-12 col-md-4">
          {candidatePhoto}
        </div>
        <div className="col-sm-12 col-md-8">
          {candidateResponses}
        </div>
      </div>
    </div>

    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
        <ul className="navbar-nav">
        <li className="nav-item"><p className="nav-link">Candidates:</p></li>
          {candidatesList}
        </ul>
        </div>
      </nav>
    </div>
    <p className="footer">Angel City Brigade - 501 C 7</p>
    </Context.Provider>
  );
}

export default App;
