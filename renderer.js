
$(document).ready(function() {
    
    var username = window.electron.getUsername();
    $('#username').text('Username: ' + username);
                console.log(username,'user')
                alert(username)
    // Make AJAX request to fetch data from the API
    alert('hello world')
    $.ajax({
        url: 'https://lms.ranegroup.com:8443/webservice/rest/server.php',
        method: 'GET',
        data: {
            wsfunction: 'local_custom_services_status',
            wstoken: '0ca45531b4a829c363276993d35ad840',
            userid: 366,
            moodlewsrestformat: 'json'
        },
        dataType: 'json',
        success: function(data) {
            // Update HTML elements with the fetched data
            $('#data').text(JSON.stringify(data.course));
        },
        error: function(xhr, status, error) {
            console.error('Error fetching data:', error);
        }
    });
});