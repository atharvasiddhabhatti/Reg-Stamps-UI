import React, { useContext, useEffect, useState } from "react";
import {
  Alert,
  Button,
  Container,
  Jumbotron,
  Spinner,
  Table,
  Tooltip
} from "react-bootstrap";
import Form from 'react-bootstrap/Form'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Header from "../header/header";
import AuthContext from "../../store/context/AuthContext";
import PropertyContext from "../../store/context/PropertyContext";

const SearchProperty = (props) => {
  const userContext = useContext(AuthContext);
  const { userState } = userContext;
  const [user, setUser] = useState("");
  const propertyContext = useContext(PropertyContext);
  const { getPaperDetails, propertyState, patchProperty,getPropertyByUsername } = propertyContext;
  var jp = require('jsonpath');
  var paperdata = require("../../data.json")
    // var data = {
    //   paper:[
    //   {
    //     "id":0,
    //     "college":"Sipna College of Engineering and Technology,Amravati",
    //     "university":"SGBAU",
    //     "year":2,
    //     "semester":4,
    //     "session":"Winter",
    //     "subject":"Data Structure",
    //     "file":"https://drive.google.com/file/d/1WrrlWonWgc_1KIay3GuBs8Jn9Qm_rfg4/view"
    //   },
    //   {
    //     "id":1,
    //     "college":"HVPM, Amravati",
    //     "university":"SGBAU",
    //     "year":3,
    //     "semester":4,
    //     "session":"Winter",
    //     "subject":"Data Structure",
    //     "file":"https://drive.google.com/file/d/1WrrlWonWgc_1KIay3GuBs8Jn9Qm_rfg4/view"
    //   }
    // ]}
  

  var [property, setProperty] = useState(null);

  const [search, setSearch] = useState(null);

  useEffect(() => {
    if (userState && userState.isAuth && !userState.error)
      setUser(userState.user);
  }, [userState && userState.error, userState && userState.isAuth]);

  // useEffect(() => {
  //   if (propertyState && propertyState.searched) {
  //     setProperty(propertyState.searched && propertyState.searched);
  //   }
  // }, [propertyState && propertyState.searched]);

  let greetings = (
    <div>
      <h2>Welcome To Question Paper Finder [Beta]</h2>
      <p>Find Engineering College Sessional Papers and End Semester Papers easily</p>
    </div>
  );
  
  const [college, setcollege] = useState("");
  const [university, setuniversity] = useState("");
  const [year, setyear] = useState("");
  const [semester, setsemester] = useState("");
  const [Branch, setBranch] = useState("");
  const [type, settype] = useState("");
 // const [isDisabled, setisDisabled] = useState(true);
 //const [isCollegeDisabled, setisCollegeDisabled] = useState(true);
  var isDisabled = true
  var isCollegeDisabled = true

  // if (user)
  //   greetings = (
  //     <div>
  //       <h2>Hello, {userState && userState.username}!</h2>
  //       <p>Welcome back.</p>
  //     </div>
  //   );
  //console.log(property)
  var filterdata = null
  const onClickHandler = (event) => {
   // event.preventDefault();
   getPaperDetails(search);
   //getPropertyByUsername(college,university,year,semester)
   //property = jp.query(paper,'$..paper[?(@.semester==4)]')
  // var paperQuery = "$..paper[?(@.semester=="+semester+" && @.year=="+year+" && @.university=="+JSON.stringify(university)+" && @.college=="+JSON.stringify(college)+")]"
 console.log(paperdata)
 if(type=="End Sem"){
  filterdata = jp.query(paperdata,"$..papers[?(@.semester=="+semester+" && @.year=="+year+" && @.university=="+JSON.stringify(university)+" && @.Branch=="+JSON.stringify(Branch)+" && @.type=="+JSON.stringify(type)+")]")
 }
 else if(type=="Sessional"){
 filterdata = jp.query(paperdata,"$..papers[?(@.semester=="+semester+" && @.year=="+year+" && @.university=="+JSON.stringify(university)+" && @.Branch=="+JSON.stringify(Branch)+" && @.type=="+JSON.stringify(type)+" && @.college=="+JSON.stringify(college)+")]")
 }
setProperty(filterdata)
  };
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Select All Options from above
    </Tooltip>
  );
  
    let button = (
      <Button  onClick={() => onClickHandler()} variant="outline-primary" >
      Search
    </Button>
  );

  if(type==""||type=="0"){
    button = (
      <OverlayTrigger
      placement="right"
      delay={{ show: 250, hide: 400 }}
      overlay={renderTooltip}>
        <Button variant="outline-danger" >
        Search
      </Button>
      </OverlayTrigger>
    );
  }  

  if(type=="End Sem"){
    isDisabled = false
    isCollegeDisabled =true
    if(university==""||university=="0" || year==""||year=="0" ||semester==""||semester=="0" || Branch==""||Branch=="0" || type==""||type=="0"){
      button = (
        <OverlayTrigger
        placement="right"
        delay={{ show: 250, hide: 400 }}
        overlay={renderTooltip}>
          <Button variant="outline-danger" >
          Search
        </Button>
        </OverlayTrigger>
      );
    }
    
  }
  else if(type=="Sessional"){
    isDisabled= false
    isCollegeDisabled = false
  if(university==""||university=="0" || college==""||college=="0" ||year==""||year=="0" ||semester==""||semester=="0" || Branch==""||Branch=="0" || type==""||type=="0"){
    button = (
      <OverlayTrigger
      placement="right"
      delay={{ show: 250, hide: 400 }}
      overlay={renderTooltip}>
        <Button variant="outline-danger" >
        Search
      </Button>
      </OverlayTrigger>
    );
  }
}

  if (propertyState && propertyState.loading)
    button = (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );

  // const onSubmitHandler = (event) => {
  //   event.preventDefault();
  //   getPaperDetails(search);
  // };
  // const onBuyHandler = (event) => {
  //   event.preventDefault();
  //   let propertyDto = {
  //     address: property.address,
  //     firstName: property.firstName,
  //     lastName: property.lastName,
  //     surveyno: property.surveyno,
  //     regno: property.regno,
  //     propertyno: property.propertyno,
  //     state: property.state,
  //     email: property.email,
  //     city: property.city,
  //     area: property.area,
  //     zip: property.zip,
  //     username: property.username,
  //     status: `Ready To Buy - ${user.username}`,
  //     type: property.type,
  //     id: property.id,
  //     price: property.price
  //   };
  //   patchProperty(propertyDto);
  //   props.history.push("/sent-for-approval");
  // };

  
  let content = null;
  let notFound= null;
 if(propertyState && property)  {
 // property = jp.query(data,"$..paper[?(@.semester=="+semester+" && @.year=="+year+" && @.university=="+JSON.stringify(university)+" && @.college=="+JSON.stringify(college)+")]")
  console.log(property)
  console.log(Object.keys(property).length)
  if(Object.keys(property).length == 0)
  {
    notFound=(
    <Alert key={"danger"} variant={"danger"}>
        No Paper Found!
      </Alert>
  )}
 // console.log(Object.values(property))
  //console.log(property.length)
 content = (
  Object.values(property).map(({id,college,university,year,semester,subject,session,file,Branch,type})=>(
  <tr key={id}>
      <td>{id}</td>
      <td>{college}</td>
      <td>{university}</td>
      <td>{year}</td>
      <td>{semester}</td>
      <td>{Branch}</td>
      <td>{subject}</td>
      <td>{session}</td>
      <td>{type}</td>
  <td>
    <Alert.Link target="_blank" href={file}>Download</Alert.Link>
  </td>
  {/* <td>
    <Alert.Link href={property.panCardDoc}>download</Alert.Link>
  </td>
  <td>
    <Button varient="primary" onClick={onBuyHandler}>
      Buy
    </Button>
  </td> */}
</tr>
))
 )}
 
  return (
    
    <React.Fragment>
      <Header {...props} />
      <Jumbotron className="search-property-banner">
        {greetings} 
{/* <Form  onSubmit={onSubmitHandler}> */}
<Form>
<Form.Group>
<Form.Label>Type</Form.Label>
    <Form.Control  onChange={(e) => settype(e.target.value)} as="select">
      <option value={"0"}>Select Exam Type</option>
      <option value={"End Sem"} >End Semester Exam</option>
      <option value={"Sessional"} >Sessional</option>
    </Form.Control>
    <Form.Label>University</Form.Label>
    <Form.Control disabled={isDisabled}  onChange={(e) => setuniversity(e.target.value)} as="select">
      <option value={"0"}>Select University</option>
      <option value= {"SGBAU"} >SGBAU</option>
      <option value= {"Mumbai University"} >Mumbai University</option>
    </Form.Control>
    <Form.Label>College</Form.Label>
    <Form.Control disabled={isCollegeDisabled}  onChange={(e) => setcollege(e.target.value)} as="select">
      <option value={"0"}>Select College</option>
      <option value={"Sipna College of Engineering and Technology,Amravati"} >Sipna College Of Engineering And Technology, Amravati</option>
      <option value={"HVPM, Amravati"} >HVPM, Amravati</option>
      <option value={"Vidyalankar Institute Of Technology, Mumbai"} >Vidyalankar Institute Of Technology, Mumbai</option> 
    </Form.Control>
    <Form.Label>Year</Form.Label>
    <Form.Control disabled={isDisabled} onChange={(e) => setyear(e.target.value)} as="select">
      <option value={"0"}>Select Year</option>
      <option value={"2"} >2</option>
      <option value={"3"} >3</option>
      <option value={"4"} >4</option>
    </Form.Control>
    <Form.Label>Semester</Form.Label>
    <Form.Control disabled={isDisabled}  onChange={(e) => setsemester(e.target.value)} as="select">
      <option value={"0"}>Select Semester</option>
      <option value={"4"} >4</option>
      <option value={"5"} >5</option>
      <option value={"8"} >8</option>
    </Form.Control>
    <Form.Label>Branch</Form.Label>
    <Form.Control disabled={isDisabled} onChange={(e) => setBranch(e.target.value)} as="select">
      <option value={"0"}>Select Branch</option>
      <option value={"CSE"} >CSE</option>
      <option value={"IT"} >IT</option>
      <option value={"EXTC"} >EXTC</option>
      <option value={"All Branch"} >All Branch[Common For All Branches]</option>
    </Form.Control>
   
  </Form.Group>
          {button}
        </Form>
      </Jumbotron>
        {notFound}
      <div>
        <Table  responsive striped bordered hover variant="dark" >
          <thead>
            <tr>
              <th>#</th>
              <th>College</th>
              <th>University</th>
              <th>Year</th>
              <th>Semester</th>
              <th>Branch</th>
              <th>Subject</th>
              <th>Exam</th>
              <th>Type</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{content}</tbody>
        </Table>
      </div>
      <p>We are adding papers regularly. We need your help in expanding the database and helping other students to get papers. 
        If you have your college sessional exam papers do mail us at <a href="mailto:examhelperclub@gmail.com?subject=Exam%20Question%20Paper - EHC">examhelperclub@gmail.com</a> or <a href="https://forms.gle/DmYp5ZWtXZ7jYrUC8" target="_blank">Fill this Form.</a> </p>
    </React.Fragment>
  );
}
export default SearchProperty;


