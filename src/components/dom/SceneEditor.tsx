export default function SceneEditor() {
  return (
    <div className="w-100 bg-blue-100 h-[calc(50vh-2rem)] overflow-y-scroll">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 1, 2, 3, 4, 4, 5, 5, 5].map((v) => <p>{v}</p>)}
    </div>
  )
}
