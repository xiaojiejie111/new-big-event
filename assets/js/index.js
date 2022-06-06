$(function(){
    let layer=layui.layer
    getUserInfo()
    $('#btnlogOut').on('click',function(){
        layer.confirm('确认退出吗?', {icon: 3, title:'提示'}, function(index){
            //do something
            localStorage.removeItem('token')
            location.href='/login.html'
            layer.close(index);
          });
    })
})
function getUserInfo() {
    $.ajax({
        method:'get',
        url: '/my/userinfo',
        //请求头配置对象
        // headers:{
        //     Authorization:localStorage.getItem('token')||''
        // },

        success:function(res) {
            if(res.status!==0) {
                return layer.msg(res.message)
            }
            console.log(res);
            rederAvater(res)

        },
        // complete:function(res){
        //     console.log(res);
        //     //res.responejone
        //    if(res.responseJSON.status===1&&res.responseJSON.message=="身份认证失败！") {
        //      localStorage.removeItem('token')
        //      location.href='/login.html'
        //    }
        // }
    })
}
function rederAvater(res){
    let name=res.data.nickname||res.data.username
    $('#welcome').html('欢迎&nbsp;&nbsp;'+name)
    if(res.data.user_pic!==null) {
        $('#text-avater').hide()
        $('.layui-nav-img').attr('src',res.data.user_pic).show()
    }else {
        $('.layui-nav-img').hide()
        let first=name[0].toUpperCase()
        console.log(first)
        $('.text-avater').show().html(first)
    }

}