import { Card, CardHeader, Grid, Typography } from '@mui/material';
import type { NextPage } from 'next'
import { Layout } from '../components/layouts';
import { EntryList } from '../components/ui';
import { NewEntry } from '../components/ui/NewEntry';


const HomePage: NextPage = () => {
  return (
  <Layout>
    <Grid container spacing={ 2 }>

<Grid item xs={ 12 } sm={ 4 }>
  <Card sx={{ height: 'calc(100vh - 100px )' }}>
    <CardHeader title="Pending" />

    {/* Agregar una nueva entrada */}
    {/* Listado de las entradas */}
     <NewEntry />
    <EntryList status='pending'/> 
   

  </Card>
</Grid>

<Grid item xs={ 12 } sm={ 4 }>
  <Card sx={{ height: 'calc(100vh - 100px )' }}>
    <CardHeader title="In progress" />
     <EntryList status='in-progress' /> 
  </Card>
</Grid>

<Grid item xs={ 12 } sm={ 4 }>
  <Card sx={{ height: 'calc(100vh - 100px )' }}>
    <CardHeader title="Complete" />
     <EntryList status='finished' /> 
  </Card>
</Grid>


</Grid>
  </Layout>
  )
}

export default HomePage;
