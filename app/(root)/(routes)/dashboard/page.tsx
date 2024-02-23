"use client";

import { useUser } from "@clerk/clerk-react";
import {
  LayoutGrid,
  LayoutList,
  ListChecks,
  ListTodo,
  Notebook,
} from "lucide-react";
import TasksItem from "./_components/tasks-item";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { greetByTime } from "@/lib/utils";
import RecentNotebookItem from "./_components/recent-notebook-item";
import TaskList from "../collections/[collectionId]/_components/task-list";
import Loading from "@/components/loading";

const Dasboard = () => {
  const { user } = useUser();

  const totalCollections = useQuery(api.collections.getCollections);
  const completedTasksList = useQuery(api.collections.getCompletedTasksByUser);
  const pendingTasksList = useQuery(api.collections.getPendingTasksByUser);
  const allTasks = useQuery(api.collections.getAllTasksByUser);

  const recentNotebooks = useQuery(api.notebooks.getRecentNotebooks);

  const totalNotebooks = useQuery(api.notebooks.getNotebooks);

  if (recentNotebooks === undefined) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col gap-y-2">
        <p className="text-4xl font-bold">{greetByTime()}</p>
        <p className="text-3xl font-semibold text-muted-foreground">
          {user?.fullName}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-12">
        <div>
          <h2 className="text-lg font-semibold mb-3">Recent Notebooks</h2>
          <div>
            {recentNotebooks && recentNotebooks?.length !== 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {recentNotebooks?.map((notebook) => (
                  <RecentNotebookItem key={notebook._id} notebook={notebook} />
                ))}
              </div>
            ) : (
              <div>No notebooks</div>
            )}
          </div>
        </div>
        <div className="flex flex-col">
          <h2 className="text-lg font-semibold mb-3">Notebooks Summary</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            <TasksItem
              icon={Notebook}
              label="Total Notebooks"
              size={totalNotebooks?.length}
              color="bg-purple-500"
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 mt-12 gap-5">
        <div className="flex flex-col gap-5">
          <div>
            <h2 className="text-lg font-semibold mb-3">Pending Tasks</h2>
            {pendingTasksList && pendingTasksList?.length !== 0 ? (
              <TaskList label="Pending tasks" tasksList={pendingTasksList!} />
            ) : (
              <p className="text-muted-foreground">No tasks</p>
            )}
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-3">Completed Tasks</h2>
            {completedTasksList && completedTasksList?.length !== 0 ? (
              <TaskList
                tasksList={completedTasksList!}
                label="Completed Tasks"
              />
            ) : (
              <p className="text-muted-foreground">No tasks</p>
            )}
          </div>
        </div>
        <div className="flex flex-col">
          <h2 className="text-lg font-semibold mb-3">Collections Summary</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            <TasksItem
              icon={LayoutGrid}
              label="Total Collections"
              size={totalCollections?.length}
              color="bg-emerald-500"
            />
            <TasksItem
              icon={ListTodo}
              label="Total Tasks"
              size={allTasks?.length}
              color="bg-blue-500"
            />
            <TasksItem
              icon={ListChecks}
              label="Completed Tasks"
              size={completedTasksList?.length}
              color="bg-green-500"
            />
            <TasksItem
              icon={LayoutList}
              label="Pending Tasks"
              size={pendingTasksList?.length}
              color="bg-red-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dasboard;
