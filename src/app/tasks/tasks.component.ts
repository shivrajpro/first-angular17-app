import { Component, Input } from '@angular/core';
import { TaskComponent } from './task/task.component';
import { dummyTasks } from '../dummy-tasks';
import { NewTaskData, Task } from './task/task.model';
import { NewTaskComponent } from './new-task/new-task.component';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [TaskComponent, NewTaskComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent {
  @Input({ required: true }) userId!: string;
  @Input({ required: true }) username!: string;
  isAddingTask: boolean = false;

  tasks = dummyTasks;

  get selectedUserTasks() {
    return this.tasks.filter((task: any) => task.userId === this.userId);
  }

  onCompleteTask(id: string) {
    this.tasks = this.tasks.filter((task: Task) => task.id !== id);
  }

  onStartAddTask() {
    this.isAddingTask = true;
  }

  closeAddNewTaskDialog() {
    this.isAddingTask = false;
  }

  addNewTask(newTask: NewTaskData) {
    this.tasks.unshift({
      id: new Date().getTime().toString(),
      userId: this.userId,
      title: newTask.title,
      summary: newTask.summary,
      dueDate: newTask.date,
    });

    this.closeAddNewTaskDialog();
  }
}
