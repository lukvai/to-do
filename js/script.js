

var tasks = [];
//get tasks from localStorage
var taskListString = localStorage.getItem("todo_Input");
var tasksList = JSON.parse(taskListString);
if(tasksList != null){
	tasks = tasksList;
}
printTask(tasks);

var task_Input = document.getElementById('todo_Input');			
task_Input.addEventListener('keypress', function(e){
	var key = e.wich || e.keyCode;
	output = "";
	if(key === 13){
		// if enter is pressed call function addTask
		addTask();
	}
});

// Add task to array
function addTask(){
	//variables
		var taskDate = new Date();
		var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
		var task_Input = document.getElementById('todo_Input');
		var full_Date = monthNames[taskDate.getMonth()] + " " + taskDate.getDate() + " " +taskDate.getFullYear();

		var task = {
			date: full_Date,
			taskName: task_Input.value,
			taskFinished: "unfinished"
		}

		tasks.push(task);
		printTask(task);

		// save items to localStorage
		var tasks_string = JSON.stringify(tasks);
		localStorage.setItem("todo_Input", tasks_string);
	}

//--------Print tasks---------
function printTask(task){
			var taskPercentLeft_Span = document.getElementsByClassName("taskPercentLeft");
			var taskPercentDone_Span = document.getElementsByClassName("taskPercentDone");
			var tasksLeft_Span = document.getElementById('unfinishedTasksLeft');
			var tasksDone_Span = document.getElementById('finishedTasks');
			var allTasks_Span = document.getElementsByClassName("allTasks");
			var task_Input = document.getElementById('todo_Input');
			var output = "";
			var outputFinished  = ""
			var tasksLeft = 0;
			var tasksDone = 0;
			for(i = 0; i<tasks.length; i++){
				if(tasks[i].taskFinished =="unfinished"){
					// print unfinished tasks
					output += '<div class="taskBox">';
					output += '<div class="taskBoxLeft">';
					output += '<span>'+ tasks[i].date + '</span>';
					output += '<p class="taskName'+ i +'">' + tasks[i].taskName + '</p>';
					output += '</div>';
					output += '<div class="taskBoxRight">';
					output += "<i class='fas fa-check taskCheck' onclick='taskCompleted(" + i +")'></i>";
					output += '</div>';
					output += '</div>';
	
					// Tasks left count
					tasksLeft ++;
					tasksLeft_Span.innerHTML = tasksLeft;
					// Percents Left
					taskPercentLeft_Span[0].innerHTML = "(" + Math.round((tasksLeft/tasks.length)*100) + "%)";
				}else if(tasks[i].taskFinished =="finished"){
					// print finished tasks
					outputFinished += "<p>" + tasks[i].taskName + "</p>";
					// Tasks Done count
					tasksDone ++;
					tasksDone_Span.innerHTML = tasksDone;
					// Percents Done
					taskPercentDone_Span[0].innerHTML = "(" + Math.round((tasksDone/tasks.length)*100) + "%)";
				}
				// All tasks number
				for(y = 0; y<allTasks_Span.length; y++){
						allTasks_Span[y].innerHTML = tasks.length;
					}
				if(tasksLeft == 0){
					tasksLeft_Span.innerHTML = 0;
					taskPercentLeft_Span[0].innerHTML = "(" + 0 + "%)";
				}

				
			}
			document.getElementById('unfinishedTasks').innerHTML = output;
			document.getElementById('finishedTaskBox').innerHTML = outputFinished;
			task_Input.value = "";
}


// ---------Completed task--------
function taskCompleted(index){
	
	var completedTaskName = document.getElementsByClassName("taskName" + index);
	var completedTask = {
		taskName: completedTaskName.item(0).textContent,
		taskFinished: "finished"
	}
	tasks.push(completedTask);
	tasks.splice(index, 1);
	printTask(tasks);
	var t_string = JSON.stringify(tasks);
	localStorage.setItem("todo_Input", t_string);
}


// -------------Clear-------------

function clearSavedData(){
	localStorage.removeItem("todo_Input");
	tasks = [];
	printTask(tasks);
	document.getElementsByClassName("taskPercentLeft")[0].innerHTML = "(" +  0  + "%)";
	document.getElementsByClassName("taskPercentDone")[0].innerHTML = "(" +  0  + "%)";
	document.getElementById('unfinishedTasksLeft').innerHTML = 0;
	document.getElementById('finishedTasks').innerHTML = 0;
	document.getElementsByClassName("allTasks")[0].innerHTML = 0;
	document.getElementsByClassName("allTasks")[1].innerHTML = 0;
}
