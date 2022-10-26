import BlueLogo from "../images/logo_blue.png";
import React, { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import PolicyEngineContext from "../countries/PolicyEngine";

function PolicyEngineLogo() {
  return <img 
    src={BlueLogo} 
    alt="PolicyEngine logo" 
    style={{height: 75, paddingLeft: 15}} 
  />;
}

function HeaderNavigationItem(props) {
  const navigate = useNavigate();
  return <h5 style={{
    paddingLeft: 15, 
    paddingRight: 15, 
    verticalAlign: "middle", 
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    cursor: "pointer",
    ...props.style,
  }} onClick={() => navigate(props.href)}>{props.label}</h5>
}

function RightAlignBarrier() {
  return <div style={{marginRight: "auto"}} />
}

function Household() {
  const navigate = useNavigate();
  const PolicyEngine = useContext(PolicyEngineContext);
  return <div style={{
    display: "flex",
    alignItems: "center",
    marginRight: 10,
    cursor: "pointer",
  }} onClick={() => navigate(PolicyEngine.getCountryLink("/household/edit"))}>
    <div style={{
      backgroundColor: "#F2F2F2",
      borderTopLeftRadius: 30,
      borderBottomLeftRadius: 30,
      paddingLeft: 5,
      paddingRight: 5,
      borderRight: "2px solid #D2D2D2",
    }}><h5 style={{margin: 0, padding: 10}}>🏠</h5></div>
    <div style={{
      backgroundColor: "#F2F2F2",
      borderTopRightRadius: 30,
      borderBottomRightRadius: 30,
      paddingLeft: 5,
      paddingRight: 5,
    }}><h5 style={{margin: 0, padding: 10, whiteSpace: "nowrap"}}>
        {
          !PolicyEngine.initialised ?
            "Loading..." :
            PolicyEngine.household.label
        }
      </h5></div>
  </div>
}


function Policy(props) {
  const navigate = useNavigate();
  const PolicyEngine = useContext(PolicyEngineContext);
  return <div style={{
    display: "flex",
    alignItems: "center",
    marginRight: 10,
    cursor: "pointer",
  }} onClick={() => navigate(PolicyEngine.getCountryLink("/policy"))}>
    <div style={{
      backgroundColor: "#F2F2F2",
      borderTopLeftRadius: 30,
      borderBottomLeftRadius: 30,
      paddingLeft: 5,
      paddingRight: 5,
      borderRight: "2px solid #D2D2D2",
    }}><h5 style={{margin: 0, padding: 10}}>⚙️</h5></div>
    <div style={{
      backgroundColor: "#F2F2F2",
      borderTopRightRadius: 30,
      borderBottomRightRadius: 30,
      paddingLeft: 5,
      paddingRight: 5,
    }}><h5 style={{margin: 0, padding: 10, whiteSpace: "nowrap"}}>
        {
          !PolicyEngine.initialised ?
            "Loading..." :
            PolicyEngine.policy.label
        }
      </h5></div>
  </div>
}


export default function Header() {
  const PolicyEngine = useContext(PolicyEngineContext);
  return (
    <div style={{
        width: "100%",
        height: 75,
        display: "flex",
    }}>
        <PolicyEngineLogo />
        <HeaderNavigationItem label="Home" href={PolicyEngine.getCountryLink("/")} />
        <HeaderNavigationItem label="Household" href={PolicyEngine.getCountryLink("/household")} />
        <HeaderNavigationItem label="Economy" href={PolicyEngine.getCountryLink("/economy")} />
        <RightAlignBarrier />
        <Household />
        <Policy />
        <HeaderNavigationItem style={{marginRight: 20}} />
    </div>
  );
}