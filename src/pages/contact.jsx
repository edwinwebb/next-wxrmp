import Menu from '@/components/dom/Menu/Menu'

const Page = () => {
  return (
    <>
      <Menu fullwidth />
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
