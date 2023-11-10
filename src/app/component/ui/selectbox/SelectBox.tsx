export default function SelectBox() {
  return (
    <div className="mb-6">
      <label
        htmlFor="Type"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Select an Orgnization Type
      </label>
      <select
        id="countries"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option defaultValue="private">Organization Type</option>
        <option value="private">Private</option>
        <option value="public">Public</option>
      </select>
    </div>
  )
}
