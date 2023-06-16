//prevent user from reloading and closing tab
window.addEventListener('beforeunload', function (e) {
  e.preventDefault();
  e.returnValue = '';
});
//prevent user from closing tab
window.addEventListener('unload', function (e) {
  e.preventDefault();
  e.returnValue = '';
});
window.addEventListener(('load'), () => {
  const target=document.getElementById("data");
  fetch("./assets/data/users.json")
    .then(response => response.json())
    .then(data => {
      data.forEach(mazdoor => {
        //set mazdoor name as mazdoor.name by replacing any spaces and - with _ + phone number last 3 digits + 3 random digits
        // mazdoor.username = mazdoor.name.replace(/ /g, "_").replace(/-/g, "_") + mazdoor.phone.slice(-3) + Math.floor(Math.random() * 1000);
        //set mazdoor number as 9233xxxxxxxx by prefixing 92 and removing 0 from phone number
        // mazdoor.phone = "92" + mazdoor.phone.slice(1);
        //setting CNIC ' ' if '-'
        // if(mazdoor.CNIC==="-") mazdoor.CNIC=" ";
        mazdoor.password="8991";
        // mazdoor.email="mazdoor"+mazdoor.phone.slice(-3) + Math.floor(Math.random() * 1000)+"@gmail.com";
        // mazdoor.role="LABOR";
        // if(mazdoor.role==='LABOR') mazdoor.startingWage=1000;
        //hitting the server to save the users
        fetch("http://localhost:5000/api/users/signup", {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ user: mazdoor })
        }).then(res => {
          if(res.status===201){
            console.log("SUCCESS: ",res);
            res.json().then(res=>{
              //add p in data
              const p=document.createElement("p");
              p.innerText=res;
              target.appendChild(p);
            });
          }else{
            console.log("ERROR: ",res);
          }
        }).catch(err => {
          console.log("Error: ",err);
        });
      });
    }).catch(err => {
    console.log("ERROR: ",err);
  });



});