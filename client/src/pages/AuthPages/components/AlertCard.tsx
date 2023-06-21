import { IoAlertCircle } from "react-icons/io5";

type Prop = {
  message?: string;
};

const AlertCard = ({ message }: Prop) => {
  return (
    <div>
      {message && (
        <div className="mt-6 bg-yellow-700 bg-opacity-10 text-yellow-500 dark:bg-yellow-300 dark:bg-opacity-10 py-5 px-3 rounded-xl dark:text-yellow-300 flex gap-2 items-center">
          <IoAlertCircle size={24} />
          <span>{message}</span>
        </div>
      )}
    </div>
  );
};

export default AlertCard;
