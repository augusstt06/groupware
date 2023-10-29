type Props = {
  title: string;
};

export function InputLabel(props: Props) {
  return (
    <label
      htmlFor="input-group-1"
      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    >
      {props.title}
    </label>
  );
}

export function InputlabelAdd(props: Props) {
  return (
    <label className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
      {props.title}
    </label>
  );
}
