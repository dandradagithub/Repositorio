$(function(){
   var $form = $('form'),
        taskInput = $form.find('input[type=text]'),
        taskDate = $form.find('input[type=date]'),
        showTasksButton = $form.find('.showTasks'),
        tasks = [],
        templateContainer = $('#templates'),
        taskTemplate;
        
    templateContainer.find('#todoTemplate').load('/todo/task-template.html', function(){
        taskTemplate = templateContainer.find('#todoTemplate').val();
    });

   $form.on('submit', onSubmit);
   showTasksButton.on('click', showTasks);
      
   function onSubmit(){
       
       if(taskInput.val().length && taskDate.val().length){
          tasks.push({
             name:  taskInput.val(),
             date: taskDate.val()
          });
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
        .replace(/%name%/g, task.name)
        .replace(/%date%/g, task.date);
  }
});