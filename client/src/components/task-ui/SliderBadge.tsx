type SliderBadgePropType = {
  label: string;
  number?: string;
  listColor?: string;
  labelClass?: string;
  className?: string;
  showNumber?: boolean;
};

const SliderBadge = ({
  label,
  number,
  listColor,
  labelClass,
  className,
  showNumber,
}: SliderBadgePropType) => {
  return (
    <section
      className={
        `flex items-center justify-between gap-2 w-full py-1 lg:py-2` +
        ` ` +
        className
      }
    >
      <div className="flex items-center gap-1">
        <div className={` h-2 w-2 rounded-full ` + listColor} />
        <span
          className={
            `font-task-inter font-medium text-sm lg:text-[15px] ` +
            ` ` +
            labelClass
          }
        >
          {label}
        </span>
      </div>
      {showNumber && (
        <div className="bg-task-badge-gray rounded-full w-4 h-4 text-xs flex justify-center items-center">
          {number}
        </div>
      )}
    </section>
  );
};

export default SliderBadge;
