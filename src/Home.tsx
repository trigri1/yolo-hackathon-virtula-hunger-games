import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

export default function Home() {
    return(
       <div className="container">
        <Link className="item">
            <img src="https://images.unsplash.com/photo-1569390173732-5c735072c80f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt=""/>
            <div className="caption">character info</div>
        </Link>
        <Link className="item"><img src="https://images.unsplash.com/photo-1582842195329-6a0baffd2a39?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt=""/></Link>
        <Link className="item"><img src="https://images.unsplash.com/photo-1600722230999-22c256d38cb7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt=""/></Link>
      </div>
    );
}