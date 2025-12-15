$(document).ready(function() {
    // Load tasks from localStorage or start with example tasks
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [
        { id: 1, text: "Buy groceries", completed: false },
        { id: 2, text: "Walk the dog", completed: true },
        { id: 3, text: "Do homework", completed: false }
    ];
    
    // Display all tasks
    showTasks();
    
    // Add task button click
    $('#addTaskBtn').click(addTask);
    
    // Add task on Enter key
    $('#taskInput').keypress(function(e) {
        if (e.which === 13) addTask();
    });
    
    function addTask() {
        const text = $('#taskInput').val().trim();
        if (!text) return;
        
        tasks.push({
            id: Date.now(),
            text: text,
            completed: false
        });
        
        saveTasks();
        showTasks();
        $('#taskInput').val('');
        $('#taskInput').focus();
    }
    
    function showTasks() {
        // Clear both lists
        $('#todoList').empty();
        $('#completedList').empty();
        
        // Counters
        let remaining = 0;
        let completed = 0;
        
        // Add each task to appropriate list
        tasks.forEach(task => {
            const li = $(`
                <li class="task-item ${task.completed ? 'completed-task' : ''}" data-id="${task.id}">
                    <span class="task-text">${task.text}</span>
                    <div class="task-btns">
                        <button class="task-btn complete-btn">
                            <i class="fas fa-${task.completed ? 'undo' : 'check'}"></i>
                        </button>
                        <button class="task-btn delete-btn">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </li>
            `);
            
            if (task.completed) {
                $('#completedList').append(li);
                completed++;
            } else {
                $('#todoList').append(li);
                remaining++;
            }
        });
        
        // Show empty messages if needed
        if (remaining === 0) {
            $('#todoList').html('<li class="empty-message">No tasks to do! Add one above.</li>');
        }
        if (completed === 0) {
            $('#completedList').html('<li class="empty-message">No completed tasks yet.</li>');
        }
        
        // Update counters
        $('#remainingCount').text(remaining);
        $('#completedCount').text(completed);
    }
    
    // Handle complete and delete buttons
    $(document).on('click', '.complete-btn', function() {
        const id = $(this).closest('.task-item').data('id');
        const task = tasks.find(t => t.id == id);
        if (task) {
            task.completed = !task.completed;
            saveTasks();
            showTasks();
        }
    });
    
    $(document).on('click', '.delete-btn', function() {
        const id = $(this).closest('.task-item').data('id');
        tasks = tasks.filter(t => t.id != id);
        saveTasks();
        showTasks();
    });
    
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    
});