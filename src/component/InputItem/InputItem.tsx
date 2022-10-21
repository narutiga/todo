import { IconCirclePlus } from "@tabler/icons";

/** @package */
export const InputItem = (props: any) => {
  return (
    <div>
      <form action="" method="" onSubmit={props.handleSubmit}>
        <IconCirclePlus className="mr-1 text-gray-400 align-middle" />
        <input
          className="border-none focus:outline-none align-middle"
          type="text"
          placeholder="タスクを追加する"
          value={props.todo}
          onChange={(e) => props.update(e.target.value)}
        />
      </form>
    </div>
  );
};
