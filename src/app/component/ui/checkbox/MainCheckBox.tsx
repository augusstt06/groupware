export default function MainCheckBox() {
  return (
    <div className="inline-flex items-center">
      <label className=" flex items-center md:p-3 p-1 rounded-full cursor-pointer" htmlFor="custom">
        <input type="checkbox" id="custom" />
      </label>
    </div>
  )
}
