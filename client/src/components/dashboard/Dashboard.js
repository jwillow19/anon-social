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
import { getMsg, sendMsg } from '../../actions/chat';

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
    backgroundColor: 'rgba(51, 51, 51)',
  },
  chatWindow: {
    width: '70%',
    height: '70vh',
    padding: '2rem',
    backgroundColor: 'rgb(235, 229, 229)',
  },
  chatBox: {
    width: '80%',
    justifyContent: 'flex-end',
  },
  chatButton: {
    width: '20%',
  },
  chipLabel: {
    backgroundColor: '#6B86F3',
    margin: '0.5rem',
  },
  channel: {
    color: 'rgb(226, 218, 218)',
    padding: '1rem',
  },
}));

const Dashboard = ({ allChats, getMsg, sendMsg }) => {
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

  const handleMsgSubmit = () => {
    sendMsg({ msg: textValue, channel: activeTopic });
    updateTextState('');
  };
  // onClick={() => removeItem(cartItem)}

  return (
    <div>
      <Paper className={classes.root}>
        <Typography variant='h4' component='h4'>
          Chat Dashboard
        </Typography>
        <Typography variant='h5' component='h5'>
          {'#' + activeTopic}
        </Typography>

        <div className={classes.flex}>
          <div className={classes.topicsWindow}>
            <List>
              {/* Goal: Map over a lilst of chat objects to a chip component */}
              {topics.map((topic) => (
                <ListItem
                  class={classes.channel}
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
                  class={classes.chipLabel}
                  label={chat.sentFrom}
                  // onClick={handleClick}
                  // onDelete={handleDelete}
                />
                <Typography variant='body1'>{chat.msg}</Typography>
                {/* DELETE BUTTON - features goes here if ever decide to implement 
                <div>
                  <span className='remove-button'>&#10005;</span>
                </div>
              */}
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
            // onClick send text object indicating the msg-content and channel
            onClick={() => handleMsgSubmit()}
          >
            Send
          </Button>
        </div>
      </Paper>
    </div>
  );
};

Dashboard.propTypes = {
  getMsg: PropTypes.func.isRequired,
  sendMsg: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  allChats: state.chat,
});

export default connect(mapStateToProps, { getMsg, sendMsg })(Dashboard);
