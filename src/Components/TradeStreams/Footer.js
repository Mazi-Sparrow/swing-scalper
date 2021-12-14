import React from 'react'
import { Grid,Container,Box,Typography } from '@mui/material'
import Dilogbox from './Dilog'
export default function Footer() {
    return (
        <div className="Footer-section" >
            <Box bgcolor="#9c27b0"  py={2} >
                <Container>
                    <Grid container >
                      <Grid item lg={6} >
                      <Typography variant="body2" sx={{color:"white"}}  >
                      © TECH TELOS INC 2021
        </Typography>
        <Typography variant="body2" sx={{color:"white"}}  >
            support@swingscalp.com
        </Typography>
                      </Grid>
                      <Grid item lg={6} >
                      <Box textAlign="end"  className="privacy" >
                        <Dilogbox/>
        </Box>
                      </Grid>
            
                    </Grid>
            
    
        </Container>
            </Box>
        </div>
    )
}
