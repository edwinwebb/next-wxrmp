import Link from 'next/link'

const Page = () => {
  return (
    <>
      <h2>WXRMP Index</h2>
      <p>
        <Link href="/s/CPloTnIrIMWYV8BuuwGh">
          <a>Go to pages/s/CPloTnIrIMWYV8BuuwGh</a>
        </Link>
      </p>
    </>
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
