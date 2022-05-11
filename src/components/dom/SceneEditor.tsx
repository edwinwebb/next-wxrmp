export default function SceneEditor() {
  return (
    <div className="h-96">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 1, 2, 3, 4, 9, 10, 1, 1, 2, 3, 4, 4, 5, 5, 5].map((v) => <p>{v}</p>)}
    </div>
  )
}
