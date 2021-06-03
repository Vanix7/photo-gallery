import classes from './LightBox.module.scss'
// import {  } from 'react-router-dom'
import React, {useEffect, useState} from 'react'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import TextField from '@material-ui/core/TextField';
import HighlightOffIcon from '@material-ui/icons/HighlightOff'


const LightBox = props => {
    const [el, setEl] = useState(props.location.state.img)
    const [comment, setComment] = useState('')
    const [open, setOpen] = React.useState(true);
    const clickHandler = () => {
        setOpen(!open);
    }
    useEffect(() => {
        document.body.style.overflow = "hidden"
        return () => {
            document.body.style.overflow = "auto"
        }
    })

    function stopPropagation(e){
        e.stopPropagation();
        // e.nativeEvent.stopImmediatePropagation();
    }
    function likeHandler() {
        const elChange = {...el}
        elChange.like = !elChange.like
        setEl(elChange)
    }
    function commentHandler(e) {
        if (e.key === 'Enter') {
            const elChange = {...el}
            elChange.comments.push(e.target.value)
            setEl(elChange)
            setComment('')
        }
    }
    function deleteCommentHandler(index) {
        const elChange = {...el}
        elChange.comments.splice(index,1)
        // console.log(elChange.comments[index])
        if (window.confirm("Точно удалить комментарий?")) {
            setEl(elChange)
        }
    }
    return (
        <div 
            className = {classes.Container}
            onClick={() => props.history.push({
                pathname: '/',
                state: { el: el }
              })}
        >
            <Card 
                onClick= {stopPropagation}
                style={{
                maxWidth: '70vh', 
                maxHeight: '100vh',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform:' translate(-50%, -50%)',
                
                }}>
            {/* <CardActionArea > */}
              <CardMedia
                component="img"
                alt="Contemplative Reptile"
                height="140"
                image={el ? '/food/' + el.src+'.jpg' : '/'}
                title="Contemplative Reptile"
                className="MuiGridListTile-imgFullHeight"
              />
            {/* </CardActionArea> */}
            <CardActions style = {{
                justifyContent: 'space-between',
                alignItems: 'flex-start'
                }}>
            <List
                component="nav"
                aria-labelledby="nested-list-subheader"
                style = {{
                    maxHeight: 150, 
                    overflow: 'auto',
                    minWidth: '80%',
                }}
                className={classes.root}
            >
                <ListItem button onClick={clickHandler}>
                    <ListItemIcon>
                    <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary="Комментарии" />
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse  in={open} timeout="auto" unmountOnExit>
                    {/* <List component="div" disablePadding> */}
                        {
                            
                        (el && el.comments.length !== 0) ?     
                            el.comments.map((comment, index)=>(
                                <ListItem className={classes.nested}>
                                    <ListItemText primary={comment} />
                                    <IconButton 
                                    style={{margin: '0 auto'}}
                                    onClick={() => deleteCommentHandler(index)}
                                    >
                                        <HighlightOffIcon style = {{fill: 'red'}}/>
                                    </IconButton>
                                </ListItem>
                            ))
                        : null
                        }
                </Collapse>
                <TextField 
                    color="white" 
                    fullWidth 
                    id="filled-basic" 
                    label="Написать..." 
                    variant="filled" 
                    value = {comment}
                    style = {{border: 'red'}}
                    onChange = {((e) => setComment(e.target.value))}
                    onKeyDown = {((e) => commentHandler(e))}
                />
                </List>
                <IconButton 
                    style={{margin: '0 auto'}}
                    onClick={likeHandler}
                >
                    {el ? (el.like ? <FavoriteIcon style={{fill: 'red'}}/> : <FavoriteBorderIcon/>) : null}
                </IconButton>

            </CardActions>
          </Card>
        </div>
    )
}

export default LightBox