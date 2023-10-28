type Props = {
  allItems: number;
  completedItems: number;
};

export default function Progressbar(props: Props) {
  const progressClassName =
    props.completedItems === 0
      ? "py-0.5 flex items-center justify-center rounded-full"
      : `w-${props.completedItems}/${props.allItems} py-0.5 flex items-center justify-center rounded-full bg-blue-500`;

  return (
    <div className="bg-gray-300 rounded-full w-full">
      <div className={`${progressClassName} `}>
        <p className="text-xs text-white font-bold leading-none">
          {(props.completedItems / props.allItems) * 100} %
        </p>
      </div>
    </div>
  );
}
