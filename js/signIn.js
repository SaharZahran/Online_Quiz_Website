let Email = document.getElementById('Email');
        let Password = document.getElementById('Password');
        let btn = document.getElementById('btn');
        let check = document.querySelectorAll('.check');

        btn.addEventListener('click', (e) => {
            let currentemail = Email.value;
            console.log(currentemail);
            let currentpassword = Password.value;
            console.log(currentpassword);
            
            if(currentemail === localStorage.getItem('email') && currentpassword === localStorage.getItem('password')){
                window.open("index.html");
            }else{
                check[1].innerText = 'Please Confirm Password';
            }
        });

        localStorage.setItem('email' , 'sara_hab@yahoo.com');
        localStorage.setItem('password', '12345');