const Page = () => {
  return (
    <>
      <div>
        Contact - Hello World
      </div>
    </>
  )
}

export default Page

export async function getStaticProps() {
  return {
    props: {
      title: 'Contact',
    },
  }
}