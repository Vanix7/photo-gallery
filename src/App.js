
import classes from './App.module.scss';
import {Fragment, useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import Container from '@material-ui/core/Container';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import {Link, Route} from 'react-router-dom'
import LightBox from './components/LightBox'
import { withRouter } from 'react-router-dom'

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const imgsRender = [...new Array(32)].map((_, index) => (
  {
    id: index,
    title: `Food${index+1}`,
    src: `food${index+1}`,
    like: Math.round(Math.random()),
    comments: [...new Array(getRandomIntInclusive(0, 10))].map((_, index) => {
      return `food${index}`
    })
  }
))

const useStyles = makeStyles((theme) => ({
  title: {
    backgroundColor: '#43a047',
    color: 'white',
    padding: '10px'
  }

}));

function App(props) {
  const MUclasses = useStyles();
  const [imgs, setImgs] = useState(imgsRender)

  useEffect(() => {
      if (props.location.state && props.location.state.el) {
        const img = props.location.state.el
        const imgsChange = [...imgs]
        const numb = imgs.findIndex((item) => (item.id === img.id))
        imgsChange[numb].like = img.like
        setImgs(imgsChange)
        props.location.state.el = undefined
      }
  })
  const getGridListCols = () => {
    if (isWidthUp('xl', props.width)) {
      return 4;
    }
    if (isWidthUp('lg', props.width)) {
      return 3;
    }
    if (isWidthUp('md', props.width)) {
      return 2;
    }
    return 1
  }
  function likeHandler(id) {
    const imgsChange = [...imgs]
    const numb = imgs.findIndex((item) => (item.id === id))
    imgsChange[numb].like = !imgs[numb].like
    setImgs(imgsChange)
  }
  return (
    <Fragment >
      <Route path="/:id" exact 
      component={LightBox}
      />
      <Container fixed>
        <GridList cellHeight={320} spacing={6} className={MUclasses.gridList} cols={getGridListCols()}>
          <GridListTile cols={getGridListCols()} style={{height:'auto'}}>
            <Typography variant="h4" className={MUclasses.title}>
              Фотогалерея    
            </Typography>
          </GridListTile>
          {imgs.map((img) => (
            <GridListTile key={img.id} cols={1}>
                <img 
                  src={'/food/' + img.src+".jpg"} 
                  alt={img.title}
                  onClick={()=>props.history.push({
                    pathname: '/' + img.id,
                    state: { img: img }
                  })}
                />
              <GridListTileBar
                actionIcon={
                  <IconButton 
                    style={{color: 'white'}}
                    onClick = {() => likeHandler(img.id)}
                  >
                    {img.like ? <FavoriteIcon style={{fill: 'red'}}/> : <FavoriteBorderIcon/>}
                  </IconButton>
                }
              />
            </GridListTile> 
          ))
        }
        </GridList>
      </Container>
    </Fragment>
  );
}

export default withRouter(withWidth()(App));
