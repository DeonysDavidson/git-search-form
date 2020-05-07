
const getUser = () => document.getElementById('name').value;


const URL = (user) => `https://api.github.com/users/${user}`;


const ping = () => {
	let name = getUser();
	let address = URL(name);
	document.getElementById('reposTable').innerHTML="";
	document.getElementById('followerTable').innerHTML=""
	document.getElementById('followingTable').innerHTML=""
	
       fetch(address)
       .then(data =>data.json())
         .then(data => {
         	if(data.message === 'Not Found'){
         		alert('Invalid user');
         		return;
         	}
       	   document.getElementById('id').innerHTML = data.id;
       	   document.getElementById('user').innerHTML = data.login;
       	   document.getElementById('image').src = data.avatar_url;
       	   fetch(data.repos_url)
       	     .then(data => data.json())
             .then(data => {
       	         document.getElementById('resposlength').innerHTML = data.length;
                 for(i=0; i<data.length; i++){
                   var table = document.getElementById("reposTable").insertRow(i);
                   table.insertCell().innerHTML= data[i].full_name;
                 }
             })
           fetch(data.followers_url)
       	     .then(data => data.json())
             .then(data => {
             	console.log('Here2');
       	         document.getElementById('followers').innerHTML = data.length;
                 for(i=0; i<data.length; i++){
                   var table = document.getElementById("followerTable").insertRow(i);
                   table.insertCell().innerHTML= data[i].login;
                  
                 }
             })
           fetch(`https://api.github.com/users/${name}/following`)
       	     .then(data => data.json())
             .then(data => {
             	console.log('Here3');
       	         document.getElementById('following').innerHTML = data.length;
                 for(i=0; i<data.length; i++){
                   var table = document.getElementById("followingTable").insertRow(i);
                   table.insertCell().innerHTML= data[i].login;
                   
                 }
             })

       })
       .catch(error => alert(error)); 
       
}
    	


