import { GetServerSideProps } from 'next'
import { FC } from 'react';

import { MainEntries } from "../../components/entries/MainEntries";
import { Layout } from "../../components/layouts";

import { dbEntries } from '../../database';
import { Entry } from '../../interfaces';

interface Props {
    entry: Entry
}


const EntryPage:FC<Props> = ({entry}) => {
  
    console.log(entry)
  
    return (
   <Layout title='Task edit' >
       <div className="main-container">
        <MainEntries entry={entry} />
      </div>
   </Layout>
  )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


export const getServerSideProps: GetServerSideProps = async ({params}) => {
    
    // You can use the ctx.query object to pass parameters to the getServerSideProps
    const {id} = params  as {id: string};

   const entry = await dbEntries.getEntryById(id);
    
    
    
    if(!entry){
        return {
            redirect:{
                destination: '/',
                permanent: false,
            }
        }
    }

    return {
        props: {
            entry
        }
    }
}

export default EntryPage;
