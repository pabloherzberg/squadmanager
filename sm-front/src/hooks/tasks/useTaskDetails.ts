import { useFetchTaskEvidence, useUpdateTask } from '@/hooks/tasks';
import { useAppSelector } from '@/store/useRedux';
import { Task } from '@/utils/types';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const useTaskDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const tasksSelector = useAppSelector((state) => state.task);
  const [editTask, setEditTask] = useState<Partial<Task>>();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { status: fetchEvidenceStatus } = useFetchTaskEvidence(Number(id));
  const { mutateAsync } = useUpdateTask();

  useEffect(() => {
    if (id && tasksSelector.tasks) {
      const findedTask = tasksSelector.tasks.find(
        (task) => task.taskid === Number(id)
      );
      setEditTask(findedTask);
    }
  }, [id, tasksSelector.tasks]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveTask = async () => {
    if (!id || !editTask) return;
    await mutateAsync({ id: Number(id), data: editTask });
    setIsEditing(false);
  };

  return {
    editTask,
    isEditing,
    setEditTask,
    handleEditToggle,
    handleSaveTask,
    isLoading: tasksSelector.status === 'loading',
  };
};

export default useTaskDetail;
