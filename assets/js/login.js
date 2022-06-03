$(function(){
    $('#link_reg').on('click',function(){
        $(".login-box").hide().siblings('.reg-box').show()
    })
    $('#link_login').on('click',function(){
        $(".reg-box").hide().siblings('.login-box').show()
    })
    let form=layui.form
    let layer=layui.layer
    form.verify({
        pwd:[
            /^[\S]{6,12}$/
            ,'密码必须6到12位,且不能出现空格'
          ] ,
          repwd:function(value,item) {
            let pwdOld=$('.reg-box [name=password]').val()
            if(pwdOld != value) {
                return '两次输入密码不一样'
            }
          }
    })
    //监听注册
    $('#form_reg').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url:'/api/reguser',
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0) {
                 return  layer.msg(res.message);
                }
                layer.msg('注册成功，请登录');  
                $('#link_login').click()
           }
        })
    })
    //监听登录
    $('#form_login').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url:'/api/login',
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0) {
                 return  layer.msg(res.message);
                }
                layer.msg('登录成功')
                localStorage.setItem('token',res.token)
                location.href='/indwx.html'
           }
        })
    })
})