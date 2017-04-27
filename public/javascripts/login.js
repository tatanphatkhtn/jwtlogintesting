/**
 * Created by root on 4/26/17.
 */
function login() {
    var username = $('#username').val();
    var password = $('#password').val();
    if($('#login-form')[0].checkValidity() == false  ){
        $('#auth-popup').html('<h4 >Empty inputs are not allowed</h4>');
        $('#auth-popup').fadeIn('slow');
    } else{
        $.ajax({
            url: '/login/authentication',
            method:'post',
            data:{ username:username,password:password },
            success:function (callbackData) {
                if(callbackData === 'unauth'){
                    $('#auth-popup').html('<h4 >Wrong username or password</h4>');
                    $('#auth-popup').fadeIn('slow');
                }else{
                    localStorage.setItem('accessToken',callbackData);
                    window.location = '/admin';
                }
            }
        });
    }

}