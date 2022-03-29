import { AnimatePresence, motion } from "framer-motion";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { FC } from "react";

import { MainEntries } from "../../components/entries/MainEntries";
import { Layout } from "../../components/layouts";

import { dbEntries } from "../../database";
import { Entry } from "../../interfaces";

interface Props {
  entry: Entry;
}

const sectionsVariants = {
  initial: { opacity: 0, scale: 0.5 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  exit: {
    opacity: 0,
    scale: 0.5,
    transition: { ease: "easeInOut", duration: 0.5 },
  },
};

const EntryPage: FC<Props> = ({ entry }) => {
  const router = useRouter();

  return (
    <Layout title="Task edit">
      <AnimatePresence exitBeforeEnter>
        <motion.div
          className="main-container"
          variants={sectionsVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <MainEntries entry={entry} key={router.asPath} />
        </motion.div>
      </AnimatePresence>
    </Layout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  // You can use the ctx.query object to pass parameters to the getServerSideProps
  const { id } = params as { id: string };

  const entry = await dbEntries.getEntryById(id);

  if (!entry) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      entry,
    },
  };
};

export default EntryPage;
