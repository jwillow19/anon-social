import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '50px',
    padding: theme.spacing(3, 2),
    // display: 'flex',
    // flexWrap: 'wrap',
    // '& > *': {
    //   margin: theme.spacing(1),
    //   width: theme.spacing(16),
    //   height: theme.spacing(16),
    // },
    fontSize: '1rem',
  },
  flex: {
    display: 'flex',
    alignItems: 'center',
  },

  topicsWindow: {
    width: '30%',
    height: '70vh',
    borderRight: '1px solid grey',
  },
  chatWindow: {
    width: '70%',
    height: '70vh',
    padding: '2rem',
  },
  chatBox: {
    width: '80%',
    justifyContent: 'flex-end',
  },
  chatButton: {
    width: '20%',
  },
}));

const Dashboard = ({ allChats }) => {
  const classes = useStyles();
  // get all topics from store
  //  NOTE - topics is a list of str, need to use template literals
  const topics = Object.keys(allChats);

  // Local State to store: textInput, active topic
  const [textValue, updateTextState] = useState('');
  const [activeTopic, setTopic] = useState(topics[0]);

  // handlers
  const handleTopicClick = (e) => {
    // e.preventDefault();
    setTopic(e.target.innerText);
  };

  // const handleClick = () => {};

  // const handleDelete = () => {};

  return (
    <div>
      <Paper className={classes.root}>
        <Typography variant='h4' component='h4'>
          Chat Dashboard
        </Typography>
        <Typography variant='h5' component='h5'>
          {activeTopic}
        </Typography>

        <div className={classes.flex}>
          <div className={classes.topicsWindow}>
            <List>
              {/* Goal: Map over a lilst of chat objects to a chip component */}
              {topics.map((topic) => (
                <ListItem
                  key={topic}
                  button
                  onClick={(e) => handleTopicClick(e)}
                >
                  <ListItemText primary={topic} />
                </ListItem>
              ))}
            </List>
          </div>

          <div className={classes.chatWindow}>
            {/* Goal: Map over a lilst of chat objects to a chip component */}
            {allChats[activeTopic].map((chat, index) => (
              <div key={index} className={classes.flex}>
                <Chip
                  // icon={<FaceIcon />}
                  label={chat.from}
                  // onClick={handleClick}
                  // onDelete={handleDelete}
                />
                <Typography variant='body1'>{chat.msg}</Typography>
              </div>
            ))}
          </div>
        </div>

        {/* Second flex wrap to wrap chatbox and button */}
        <div className={classes.flex}>
          <TextField
            class={classes.chatBox}
            label='Message'
            defaultValue='say something...'
            fullWidth
            value={textValue}
            onChange={(e) => updateTextState(e.target.value)}
          />

          <Button
            variant='contained'
            color='primary'
            className={classes.chatButton}
          >
            Send
          </Button>
        </div>
      </Paper>
    </div>
  );
};

Dashboard.propTypes = {};

const mapStateToProps = (state) => ({
  allChats: state.chat,
});

export default connect(mapStateToProps)(Dashboard);
