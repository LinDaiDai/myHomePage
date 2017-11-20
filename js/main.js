$(function () {
        // 获取窗口的高度
        var windowH = $(window).height()
        $('.next').each(function (index, ele) {
            $(this).on('click', function () {
                let i = index + 1
                $('html,body').animate({
                   scrollTop: `${i * windowH}`
                }, 1000);
                return false;
            })
        } )
        
})
// 掌握的技能
$(function () {
    $('#slide4').on('mouseenter',function (e) {
        e.preventDefault();
        let me = $('.main-nav'),
            navWrap = me.closest('.nav-wrap'),
            navs = navWrap.find('nav a');

         //当菜单没有被激活时
        if(!navWrap.hasClass('active')){

            //圆的半径
            let width = navWrap.width(),
                radius = width/2;

            //圆形菜单的起始角度
            let startAngle = 0,
                endAngle = 360;

            //俩个子菜单之间的夹角 gap
            let total = navs.length,
                gap = (endAngle-startAngle)/total;

            /**
             * 计算并确定各个子菜单的最终位置
             */
            $.each(navs,function (index,item) {

                //当前子菜单与x轴正向的夹角 (角度->弧度)
                let myAngle = (startAngle+gap*index)*(Math.PI/180);

                //算出当前子菜单相对于左上角(0,0)的坐标(x,y)
                let myX = radius+radius*Math.cos(myAngle)-$(this).width()/2,  //x= r + r*cos(myAngle)
                    myY = radius+radius*Math.sin(myAngle)-$(this).height()/2;  //y = r + r*sin(myAngle)

                //设置当前子菜单的位置
                $(this).css({
                    left:myX+'px',
                    top:myY+'px'
                });
            })
        }
        navWrap.toggleClass('active');
    });
    $('#slide4').on('mouseleave', function (e) {
        e.preventDefault();
        let me = $('.main-nav'),
            navWrap = me.closest('.nav-wrap');
            navWrap.toggleClass('active');
    })
    /**
     * 初始化子菜单
     * @param container 子菜单要添加到的父级
     * @param count     子菜单的数量
     */
   
    function loadNav(container,count){
        let tubiaos = ['icon-html-copy', 'icon-CSS', 'icon-JS', 'icon-jquery', 'icon-bootstrap', 'icon-less', 'icon-angularjs', 'icon-vuejs']
        for(let i = 0;i<count;i++){
            let a = `<a class="nav-item iconfont ${tubiaos[i]}"></a>`
            container.append(a);
        }
    }
    loadNav($('.nav-wrap nav'),8);
})
// 书画
$(function () {

    // 创建国画
    var slide6 = [{title: '山溪图', cite: '气势雄浑', icon: 'icon-shufa'},{title: '春意盎然', cite: '钟灵毓秀', icon: 'icon-hua'},{title: '傲霜枝', cite: '泥金万点', icon: 'icon-kaishuwanghanzongcukaitijiankaizi'
    },{title: '山溪图', cite: '气势雄浑', icon: 'icon-lishuhuawenlishu-copy'}]
    function createLi () {
        for(var i = 0; i < 4; i++) {
            var li = `<li class="li">
            <i class="iconfont ${slide6[i].icon}"></i>
            <div class="tu">
                <img src="./images/mohua${i+1}-small.png" alt="">
            </div>
            <div class="mask">
                <div class="mask-header"></div>
                <div class="mask-body"></div>
            </div>
        </li>`
        $('.slide6-ul').append($(li));
        }
    }
    createLi()

    // 查看国画
    $('.slide6-ul>li').each(function (index, ele) {
        $(this).on('click', function (event) {
            event.stopPropagation(); //阻止事件冒泡  
            var div = `<div class="div-hid">
                <img src="./images/mohua${index + 1}.png" alt="">
                <i class="iconfont icon-roundclosefill"></i>
        </div>`
            $('#slide6').append($(div))
        })
    })
    // 点击取消查看
    $(document.body).on('click', function (event) {
        event.stopPropagation(); //阻止事件冒泡  
        $('.div-hid').fadeOut(600, 0,function () {
            $('.div-hid').remove()
        })
    })
})