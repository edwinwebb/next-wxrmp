import Link from 'next/link'
import { collection } from "firebase/firestore";
import { firestore } from '@/firebase/clientApp';
import { useCollection } from 'react-firebase-hooks/firestore';

const Page = () => {
  const [value, loading, error] = useCollection(collection(firestore, "scenes"));

  const listItems = value?.docs.map((doc) =>
    <li key={doc.id}><Link href={"/s/" + doc.id}>
      <a>{doc.id}</a>
    </Link></li>
  );

  // TODO - security rule should cause an error here
  return (
    <div>
      <h2>WXRMP Index</h2>
      <p>{error && <strong>Error: {JSON.stringify(error)}</strong>}</p>
      <p>{loading && <span>Collection: Loading...</span>}</p>
      <ul>{listItems}</ul>
    </div>
  )
}

export default Page

export async function getStaticProps() {
  return {
    props: {
      title: 'WXRMP - Homepage',
    },
  }
}
