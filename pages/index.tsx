import type { NextPage } from 'next';
import { Card, CardContent, CardHeader, Grid } from '@mui/material';

import { Layout } from '../components/layouts';
import { EntryList, NewEntry } from '../components/ui';
import { Wrapper } from '../components/wrapper/Wrapper';
import { Bg } from '../components/layouts/Bg';

const HomePage: NextPage = () => {
  return (
    <Layout title='Home - OpenJira'>
      
    <Wrapper />

    </Layout>
  )
}

export default HomePage;
