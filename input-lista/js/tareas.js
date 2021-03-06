$(function(){
   var $form = $('form'),
        taskInput = $form.find('input[type=text]'),
        taskDate = $form.find('input[type=date]'),
        showTasksButton = $form.find('.showTasks'),
        tasks = [],
        taskTemplate = '<div class="input-group">' + 
							'<a class="list-group-item"> %nuevatarea%: %fecha%</a>' + 
							'<span class="input-group-btn">' + 
					    		'<button class="btn btn-primary eliminartarea" type="button">X</button>' + 
							'</span>' + '</div>';

   $form.on('submit', enter);
   showTasksButton.on('click', showTasks);

    $('body').on('click', '.eliminartarea', function(){
        
    var tarea = $(this).parent().parent();
    tarea.remove();
    });

   function enter(){
       
       if(taskInput.val().length && taskDate.val().length){
          tasks.push({
             name:  taskInput.val(),
             date: taskDate.val()
          });
          console.log(tasks);
       }

		return false;
   }
   
   function showTasks(){
       var tasksHtml = '';
       for(var i=0; i< tasks.length; i++){
           tasksHtml += getTaskHtml(tasks[i]);
       }
       
       $form.find('ul').append(tasksHtml);
   }
   
  function getTaskHtml(task){
      return taskTemplate
        .replace(/%nuevatarea%/gi, task.name)
        .replace(/%fecha%/g, task.date);
  }
});
