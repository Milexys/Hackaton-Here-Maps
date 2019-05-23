import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './dashboard.css';
import Firebase from '../../firebaseConfig.js';
import { Container, Col, Row} from 'react-bootstrap';
// import oniprofile from '../img/profile.png';
// import stevenprofile from '../img/profile2.png';
import Header from '../header/Header.js';


class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.ref = Firebase.firestore().collection('boards');
    this.unsubscribe = null;
    this.state = {
      boards: []
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    const boards = [];
    querySnapshot.forEach((doc) => {
      const { title, description, author } = doc.data();
      boards.push({
        key: doc.id,
        doc, // DocumentSnapshot
        title,
        description,
        author,
      });
    });
    this.setState({
      boards
   });
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  render() {
    return (
 <div>

      <Header />

        <Container >  
        <Row>   

        <Col xs={12} md={12} lg={12} className="addWork mt-3" >
           <div className="content-add">
           <Link to="/create"><i class="fas fa-plus-circle icon-add"></i></Link>
           </div>
           </Col>
           
          <Col  xs={12} md={12} lg={12} className="tareas">
           <h4 className="text-center mt-2 mb-5">Tareas por hacer</h4>

           {this.state.boards.map(board =>

           <div>
           <ul class="list-group">
             <li class="list-group-item d-flex justify-content-between align-items-center">
             <input type="checkbox" aria-label="Checkbox for following text input"/> 
             <Link to={`/show/${board.key}`}>{board.title}</Link> 
             <span class="badge badge-primary badge-pill">{board.author}</span>
             </li>
             </ul>
          </div>
           )}
             
           
           </Col>


           
          


          </Row>
         </Container> 
      


 </div>
    );
  }
}

export default Dashboard;