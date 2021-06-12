import React, {useState} from 'react';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

const ProductCard = ({data, updateState, handleChange, value}) => {
  //console.log(data)
  //console.log(value)
  // console.log(data.name)
  // console.log(data.photo)
  // console.log(typeof(data.name))
  // console.log(typeof(data.photo))
  // console.log(typeof(data.id))

  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

  const classes = useStyles();
  const [ cantidad, setCantidad ] = useState();

  // const handleChange = (e) => {
  //   // e.preventDefault();

  //   // console.log(e.target)
  //   // console.log(e)
  //   console.log({productId: e.target.name, quantity: e.target.value})
  //   setCantidad('hello');
  //   console.log(cantidad)
  // };

  return (
  <Card style={{width: '300px'}}>
      <CardActionArea>
        <img src={data.photo} style={{width: '300px'}}/>
        <CardContent style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <Typography gutterBottom variant="h5" component="h2">
            {data.name}
          </Typography>
          <Typography gutterBottom variant="h5" component="h2">
            $ {data.price}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions style={{display: 'flex', justifyContent: 'center'}}>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="demo-simple-select-outlined-label">Cantidad</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            // value={cantidad}
            defaultValue = {0}
            onChange={(e)=>{handleChange(e)}}
            label="cantidad"
            name={data._id}
            value={value ? value : 0}
          >
            <MenuItem value={0}>0</MenuItem>
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
          </Select>
        </FormControl>
      </CardActions>
    </Card>
  )
}

export default ProductCard;