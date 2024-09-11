document.addEventListener("DOMContentLoaded", ()=>{

    //한글자씩 타자치는 타이핑 효과
    const typing = document.getElementById("typing");
    const text = "홍길동 홈페이지에\n 오신 것을 환영합니다.";

    let i = 0;  //alert( text.length ); //26
    let t = "";
    
    const typinggg = ()=>{
        if( i < text.length ) {

            t += text[ i ];
            typing.innerText = t;

            i++;
            setTimeout( typinggg , 100 );
        }
    }

    setTimeout( typinggg , 300 ); // 홈페이지 로딩후 0.3초후에 함수 호출


    //skill 요소의 progress 진행바 애니.
    const photo = document.querySelector("#photo   progress");
    const html =  document.querySelector("#html    progress");
    const script = document.querySelector("#script progress");

    let p1 = 0;
    const aniPhoto = () => {
        if( p1 < 80 ) {
            p1++;
            photo.setAttribute("value" , p1);  // <progress value="1" max="100">생략..
            setTimeout( aniPhoto , 20);
        } 
    }

    let h1 = 0;
    const aniHtml = () => {
        if( h1 < 90 ) {
            h1++;
            html.setAttribute("value" , h1);   // <progress value="1" max="100">생략..
            setTimeout( aniHtml , 20);
        }
    }

    let s1 = 0;
    const aniScript = () => {
        if( s1 < 70 ) {
            s1++;
            script.setAttribute("value" , s1);   // <progress value="1" max="100">생략..
            setTimeout( aniScript , 20);
        }
    }

    const click_a = document.querySelector('#click a');
    const menu_about = document.querySelector('#menu a[href="#about"]');
    const skill_a = [ click_a , menu_about ];

    const nav = document.getElementsByTagName('nav')[0];

    const nav_act = () => nav.classList.add('act'); 

    const skillAni = ()=>{        
        nav_act();
        aniPhoto();
        setTimeout(  aniHtml,    500 );
        setTimeout(  aniScript,  1000 );
    }

    //portfolio 영역
    const skill = document.getElementById('skill') ;    
    const port1_top = Math.trunc(skill.getBoundingClientRect().top ) ;
    const port1 = document.getElementById('port1') ;
    const port2 = document.getElementById('port2') ;
    const port3 = document.getElementById('port3') ;
    const port2_top = Math.trunc(port1.getBoundingClientRect().top ) ;
    const port3_top = Math.trunc(port2.getBoundingClientRect().top ) ;

    const menu_port = document.querySelector('#menu a[href="#portfolio"]');

    window.addEventListener( "wheel" , e  => {
        e.preventDefault;     
       
        //휠을 200픽셀 이상 아래로 내릴때
        if( window.scrollY >= 400  )  skillAni(); 
        if( window.scrollY < 400  )   nav_act();

        if( window.scrollY >= port1_top )  port1.classList.add('act');
        if( window.scrollY >= port2_top )  port2.classList.add('act');
        if( window.scrollY >= port3_top )  port3.classList.add('act');


    }); 

    skill_a.forEach( i =>   i.addEventListener("click" , skillAni )  );

    menu_port.addEventListener("click" ,  ()=>  port1.classList.add('act')  ) ;
    
    /*********************************** */
    //event 영역에서 썸네일 클릭시 팝업 보임
    const event_a = document.querySelectorAll("#event a");
    const popup =  document.getElementById("popup");
    
    event_a.forEach( i => {
        i.addEventListener("click", ()=>{
            popup.style.display = 'block';

            const src_1 = i.querySelector("img").getAttribute("src");
            const alt   = i.querySelector("img").getAttribute("alt");

            const src_2 = src_1.replace(".jpg" , "_big.jpg");
            popup.querySelector("img").setAttribute("src" , src_2);
            popup.querySelector("h3").textContent = alt;
        });

        popup.querySelector("img").addEventListener("click" , ()=>{
            popup.style.display = "none";
        });

    });



});//end............