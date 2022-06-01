import Link from 'next/link'
import { collection, getDocs } from "firebase/firestore";
import { firestore } from '@/firebase/clientApp';
import { async } from '@firebase/util';
import { useEffect, useState } from 'react';


const Page = () => {
  const [allLinks, setAllLinks] = useState([])
  const getAllDocs = async () => {
    console.log('get all docs')
    const querySnapshot = await getDocs(collection(firestore, "scenes"));
    let links = []
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      links.push(doc.id)
    });
    setAllLinks(links)
  }
  console.log(allLinks)
  const listItems = allLinks.map((link) =>
    <li key={link}><Link href={"/s/" + link}>
      <a>{link}</a>
    </Link></li>
  );

  useEffect(() => {
    if (allLinks.length === 0) {
      getAllDocs()
    }
  }, [])

  return (
    <div>
      <h2>WXRMP Index</h2>
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
