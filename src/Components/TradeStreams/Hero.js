import React from 'react'
import { Grid,Container,Box,Typography,Button } from '@mui/material'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Logo from '../../assets/images/logo.png'

export default function Hero() {

    return (
        <div  className="hero-section" >
            <Container  >
                <Grid container justifyContent="center" >
                <Grid item lg={6} md={6} sm={8} xs={10} >
            <Card sx={{ maxWidth: 330 }} className="card-main" >
      <CardContent>
        <Typography gutterBottom variant="h5"   component="div">
        Header
        </Typography>
        <Typography variant="body2" >
        Subheader
        </Typography>
        <Typography variant="body2"sx={{marginTop:"30px"}} >
        Some quick example text to build on the card title and make up the bulk of the card content.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" >Button</Button>
        <Button size="small" color="primary" >Button</Button>
      </CardActions>
    </Card>
            </Grid>
            <Grid item lg={6} md={6} sm={8} xs={10} >
                <Box className="hero-reliable" >
            <Typography variant="body2"  className="RELIABLE" >
           1.   Build a <span className="plan" > PLAN </span> from  <span className="plan" >RELIABLE INFORMATION  </span>
        </Typography>
        <Typography variant="body2"   className="RELIABLE" >
           2.   Have the <span className="plan" > DISCIPLINE</span> from  <span className="plan" >PLAN </span>
        </Typography>
        <Typography variant="body2"   className="RELIABLE" >
           3.    <span className="plan" > EXECUTE</span>  without delay when you  <span className="plan" >PLAN </span>
        </Typography>
        <Typography variant="body2"   className="RELIABLE" >
           4.   Always put   <span className="plan" > RISK</span>  before   <span className="plan" >REWARD</span>
        </Typography>
        </Box>

        <img  src={Logo} width="100%" height="auto" />
            </Grid>
                </Grid>
          
            </Container>            
        </div>
    )
}
