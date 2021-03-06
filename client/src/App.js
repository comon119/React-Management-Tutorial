import './App.css';
import { Paper } from '@material-ui/core';
import Customer from './components/Customer';
import CustomerAdd from './components/CustomerAdd';
import { Table } from '@material-ui/core/'
import { TableHead } from '@material-ui/core';
import { TableBody } from '@material-ui/core';
import { TableRow } from '@material-ui/core';
import { TableCell } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';
import { withStyles } from '@material-ui/core';

import React from 'react';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 1080
  },
  process: {
    margin: theme.spacing.unit * 2
  
  }
});


class App extends React.Component {

  state = {
    customers: "",
    completed: 0
  }
  
componentDidMount() {
    this.timer = setInterval(this.progress, 20);
    this.callApi()
     .then(res => this.setState({customers: res}))
     .catch(err => console.log(err));
  }
  
callApi = async () => {
  const response = await fetch('/api/customers');
  const body = await response.json();
  return body;
}

  progress = () => {
    const { completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + 1});
  }
  render(){
    const { classes } = this.props;
   return (
     <div>
   <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>번호</TableCell>
            <TableCell>이름</TableCell>
            <TableCell>이미지</TableCell>
            <TableCell>생년월일</TableCell>
            <TableCell>성별</TableCell>
            <TableCell>직업</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
      {this.state.customers ? this.state.customers.map(c => { return (<Customer key={c.id} id={c.id} image={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job} />);
      }) : 
      <TableRow>
        <TableCell colSpan="6" align="center">
          <CircularProgress className={classes.process} variant="determinate" value={this.state.completed}/>

        </TableCell>
      </TableRow>
      }
        </TableBody>
      </Table>
      </Paper>
      <CustomerAdd/>
     </div>      
      
      

  
  );
}
}


export default withStyles(styles)(App);
