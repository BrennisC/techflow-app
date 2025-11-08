import NavApp from "./components/NavApp";

export default function Root(props) {
  return (
    <>
      <NavApp></NavApp>
      <section>{props.name}</section>
    </>
  )
}
